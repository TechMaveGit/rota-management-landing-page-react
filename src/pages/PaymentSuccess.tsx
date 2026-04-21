import { CheckCircle, ArrowRight, Home, Receipt, Calendar, CreditCard } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const { state, search } = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<any>(state?.plan);
  const [paymentForm, setPaymentForm] = useState<any>(state?.paymentForm);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check URL parameters for Stripe payment intent and status
    const params = new URLSearchParams(search);
    const pi = params.get('payment_intent');
    const status = params.get('redirect_status');

    if (pi) setPaymentIntent(pi);

    // If status is failed, redirect to payment-fail
    if (status === 'failed') {
      navigate('/payment-fail', { state: { plan: plan || state?.plan, error: 'Payment failed during processing' } });
      return;
    }

    const qPlanId = params.get('plan_id');
    const qPlanName = params.get('plan_name');
    const qCurrency = params.get('currency');
    const qPrice = params.get('price');
    const qDuration = params.get('duration');

    // If query params are present, construct the plan object
    if (qPlanName && !plan) {
      const planData = {
        id: qPlanId,
        name: qPlanName,
        currency: qCurrency,
        price: qPrice,
        duration: qDuration
      };
      setPlan(planData);
      
      // Save to localStorage as well to ensure persistence on refresh
      localStorage.setItem('last_purchase', JSON.stringify({
        plan: planData,
        timestamp: new Date().toISOString()
      }));
    }

    // 2. Fallback: If no plan in state or URL, try localStorage
    if (!plan && !qPlanName) {
      const saved = localStorage.getItem('last_purchase');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPlan(parsed.plan);
        } catch (e) {
          console.error("Error parsing saved plan", e);
        }
      }
    }

    // 3. Clean up the URL to hide query parameters
    if (params.toString()) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [search, plan, navigate, state]);

  console.log(state, "planplanplan");


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
                {plan?.currency || '£'}{plan?.price || '299'}
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
