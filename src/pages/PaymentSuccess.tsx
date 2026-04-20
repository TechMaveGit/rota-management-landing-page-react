import { CheckCircle, ArrowRight, Receipt, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  let plan = state?.plan;
  let paymentForm = state?.paymentForm;
  console.log(plan, "planplan")
  console.log(paymentForm, "paymentFormpaymentForm")

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
            {plan ? <p className="text-gray-500 text-sm">
              Your subscription has been activated successfully. Thank you for your purchase.
            </p>
              : <p className="text-gray-500 text-sm">
                Your payment was successfully completed. Thank you for choosing us.
              </p>
            }
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-6 space-y-3">
            {plan ? <> <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Plan</span>
              <span className="text-sm font-medium text-gray-900">{plan?.name}</span>
            </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Validity</span>
                <span className="text-sm font-medium text-gray-900">{plan?.duration || plan?.period}</span>
              </div> </>
              : <>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Reciever</span>
                  <span className="text-sm font-medium text-gray-900">{paymentForm?.recieverName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">JobTitle</span>
                  <span className="text-sm font-medium text-gray-900">{paymentForm?.jobTitle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Currency</span>
                  <span className="text-sm font-medium text-gray-900">{paymentForm?.currency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Amount</span>
                  <span className="text-sm font-medium text-gray-900">{paymentForm?.amount}</span>
                </div>
              </>
            }
          </div>

          <div className="space-y-3">
            <a
              href="https://rotamanagement.techmavegroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 hover:shadow-md"
            >
              <Home className="w-4 h-4" />
              Go to Dashboard
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
