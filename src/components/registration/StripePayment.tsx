import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StripePayment = ({ plan }: { plan: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Save plan info to localStorage because the redirect will clear React state
    localStorage.setItem('last_purchase', JSON.stringify({
      plan: plan,
      timestamp: new Date().toISOString()
    }));

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?plan_id=${plan.id}&plan_name=${encodeURIComponent(plan.name)}&currency=${encodeURIComponent(plan.currency)}&price=${plan.price}&duration=${encodeURIComponent(plan.duration || plan.period || 'Annually')}`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
      navigate('/payment-fail', { state: { plan, error: error.message } });
    }
  };

  console.log(plan)

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
