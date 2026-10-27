import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';

const StripePayment = ({ plan, registrationData }: { plan: any, registrationData?: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setErrorMessage(null);
    setLoading(true);

    // Explicitly submit the Payment Element first. This makes Stripe display its
    // field-level validation messages without treating missing card details as a
    // failed payment or leaving the checkout page.
    const { error: validationError } = await elements.submit();
    if (validationError) {
      setErrorMessage(validationError.message || "Please complete your card details.");
      setLoading(false);
      return;
    }

    // Build return URL with plan details as query params so PaymentSuccess
    // can display them even after Stripe's full-page redirect clears React state
    const returnParams = new URLSearchParams();
    if (plan?.id) returnParams.set('plan_id', plan.id);
    if (plan?.name) returnParams.set('plan_name', plan.name);
    if (plan?.currency) returnParams.set('currency', plan.currency);
    if (plan?.price !== undefined && plan?.price !== null) returnParams.set('price', String(plan.price));
    if (plan?.duration) returnParams.set('duration', plan.duration);

    const returnUrl = `${window.location.origin}/payment-success?${returnParams.toString()}`;

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      // Immediate errors (validation, declined card, etc.) belong on the payment
      // form so the customer can correct them and retry.
      if (error) {
        setErrorMessage(error.message || "Your payment could not be processed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your payment could not be processed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Confirm & Pay"
        )}
      </button>

      {errorMessage && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default StripePayment;
