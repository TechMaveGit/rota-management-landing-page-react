import { XCircle, ArrowRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentFail = () => {
   const { state } = useLocation();
   let plan = state?.plan;
   let paymentForm = state?.paymentForm;
   
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse" />
              <div className="relative w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Payment Failed!
            </h1>
            <p className="text-gray-500 text-sm">
              Unfortunately, your payment could not be processed. Please try again or use a different payment method.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link 
              to="/registration"
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-md"
            >
              Retry Payment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/"
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-md"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
