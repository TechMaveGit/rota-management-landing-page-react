import { CheckCircle, ArrowRight, Receipt, Calendar, CreditCard, Loader2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkTransactionStatus } from "@/store";

const PaymentSuccess = () => {
  const { state, search } = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<any>(state?.plan);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(Boolean(state?.isFree));

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams(search);
    const pi = params.get('payment_intent');
    const redirectStatus = params.get('redirect_status');

    if (pi) setPaymentIntent(pi);

    const qPlanId = params.get('plan_id');
    const qPlanName = params.get('plan_name');
    const qCurrency = params.get('currency');
    const qPrice = params.get('price');
    const qDuration = params.get('duration');

    let resolvedPlan = state?.plan;
    if (qPlanName) {
      resolvedPlan = {
        id: qPlanId,
        name: qPlanName,
        currency: qCurrency,
        price: qPrice,
        duration: qDuration
      };
      setPlan(resolvedPlan);
    }

    if (!state?.plan && !qPlanName) {
      const saved = localStorage.getItem('last_purchase');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          resolvedPlan = parsed.plan;
          setPlan(resolvedPlan);
        } catch (e) {
          console.error("Error parsing saved plan", e);
        }
      }
    }

    const saveVerifiedPurchase = () => {
      if (resolvedPlan) {
        localStorage.setItem('last_purchase', JSON.stringify({
          plan: resolvedPlan,
          timestamp: new Date().toISOString()
        }));
      }
      if (params.toString()) {
        window.history.replaceState(window.history.state, document.title, window.location.pathname);
      }
    };

    // Free plans reach this page only after the activation API succeeds.
    if (state?.isFree) {
      saveVerifiedPurchase();
      return () => { isMounted = false; };
    }

    const failVerification = (message: string) => {
      if (!isMounted) return;
      navigate('/payment-fail', {
        replace: true,
        state: { plan: resolvedPlan, error: message }
      });
    };

    // Never infer success from the route name or cached plan details.
    if (redirectStatus !== 'succeeded') {
      failVerification('Payment was not completed. Please check your card details and try again.');
      return () => { isMounted = false; };
    }

    const savedTxId = localStorage.getItem('last_transaction_id');
    const savedClientId = localStorage.getItem('onboarding_client_id');

    if (!savedTxId && !savedClientId && !pi) {
      failVerification('Unable to verify this payment. Please try again.');
      return () => { isMounted = false; };
    }

    checkTransactionStatus({
      // The intent returned by Stripe identifies this exact attempt. Stored IDs
      // are fallbacks only and may refer to an earlier attempt.
      transaction_id: pi ? undefined : (savedTxId || undefined),
      client_id: pi ? undefined : (savedClientId || undefined),
      payment_intent: pi || undefined
    }, (response) => {
      const result = response.data as { is_subscribed?: boolean };
      if (result?.is_subscribed === true) {
        if (isMounted) {
          saveVerifiedPurchase();
          setIsVerified(true);
        }
      } else {
        failVerification('Your payment could not be verified and the plan was not activated.');
      }
    }, () => {
      failVerification('Unable to verify this payment. Please try again.');
    });

    return () => { isMounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-green-600 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900">Verifying payment</h1>
          <p className="text-sm text-gray-500 mt-2">Please wait while we confirm your transaction.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-500 text-sm">
              Your subscription has been activated successfully. Thank you for your purchase.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mb-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500">
                <Receipt className="w-4 h-4" />
                <span className="text-sm">Plan</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{plan?.name || 'Standard Plan'}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Billing Period</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{plan?.duration || plan?.period || 'Annually'}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200/60">
              <div className="flex items-center gap-2 text-gray-500">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Amount Paid</span>
              </div>
              <span className="text-sm font-bold text-green-600">
                {plan?.currency ?? '£'}{plan?.price ?? '—'}
              </span>
            </div>

            {paymentIntent && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Transaction ID</span>
                <span className="text-[10px] font-mono text-gray-400">{paymentIntent.slice(0, 15)}...</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <a
              href="https://rotamanagement.techmavegroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-md"
            >
              Continue to login
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/"
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
