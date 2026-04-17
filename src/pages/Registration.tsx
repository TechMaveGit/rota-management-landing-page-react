// src/pages/Registration.tsx
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './registration.css';

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('Standard Plan');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState('Home Care Agency');
  const [businessTypeDropdownOpen, setBusinessTypeDropdownOpen] = useState(false);

  const businessTypes = [
    { name: 'Home Care Agency', icon: 'mdi:home-heart' },
    { name: 'Nursing Agency', icon: 'mdi:hospital-box' },
    { name: 'Care Home', icon: 'mdi:home-group' },
    { name: 'Other', icon: 'mdi:dots-horizontal' },
  ];

  const countries = [
    { name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
    { name: 'Ireland', flag: '🇮🇪', code: 'IE' },
    { name: 'United States', flag: '🇺🇸', code: 'US' },
  ];

  const steps = [
    { id: 1, title: 'Business Info', desc: 'Basic business details' },
    { id: 2, title: 'Plan', desc: 'Select the right plan' },
    { id: 3, title: 'Account', desc: 'Create your login' },
    { id: 4, title: 'Payment', desc: 'Enter payment details' },
    { id: 5, title: 'Success', desc: 'Finish and submit' },
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      value: 'Basic',
      summary: 'For small care teams just getting started',
      features: ['Up to 30 staff', 'Basic scheduling', 'Mobile app access', 'Email support', '7-day data history'],
      priceMonthly: '£29.99',
      priceYearly: '£24.99',
       badge: "Free"
    },
    {
      id: 'pro',
      name: 'Standard Plan',
      value: 'Standard Plan',
      summary: 'For growing organizations that need more power',
      features: ['Up to 100 staff', 'Advanced scheduling', 'Time tracking & GPS', 'Payroll integration', 'Priority support'],
      priceMonthly: '£54.99',
      priceYearly: '£47.99',
       badge: "Pro"
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      value: 'Enterprise Plan',
      summary: 'For large-scale operations',
      features: ['Unlimited staff', 'All Standard features', 'Custom workflows', 'API access', 'Dedicated manager'],
      priceMonthly: '£74.99',
      priceYearly: '£64.99',
           badge: "Premium"
    },
  ];

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentPrice = () => {
    const plan = plans.find(p => p.value === selectedPlan);
    if (!plan) return '£54.99';
    return billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-[#fcfcfc] border-r border-gray-200 flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-red-600 text-white rounded-md flex items-center justify-center font-bold text-xl">RF</div>
            <div>
              <h1 className="text-xl font-bold text-black">RotaFlow</h1>
              <p className="text-xs text-gray-500 -mt-1">Care Management</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="caret-text">Create Your RotaFlow Account</h2>
            <p className="text-sm text-gray-600 mt-2">Complete these 5 simple steps to set up your business.</p>
          </div>

          <div className="space-y-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                disabled={index > currentStep}
                className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all ${
                  index === currentStep
                    ? 'bg-white'
                    : index < currentStep
                    ? ''
                    : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 flex-shrink-0
                  ${index === currentStep ? 'bg-green-600 text-white border-green-600' : 
                    index < currentStep ? 'bg-green-600 text-white border-green-600' : 'border-gray-300 text-gray-500'}`}>
                  {index + 1}
                </div>
                <div className="text-left">
                  <h6 className="font-semibold text-gray-900">{step.title}</h6>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Progress Bar */}
        <div className="border-b bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 w-full max-w-4xl mx-auto">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Step {currentStep + 1} of {steps.length}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Business Info */}
            {currentStep === 0 && (
              <div>
                <h4 className="text-2xl font-semibold mb-2">Tell Us About Your Business</h4>
                <p className="text-gray-600 mb-8">Enter your business details so we can set up your workspace correctly.</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="Enter your business name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="Enter your business email" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="Enter your business address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone No *</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="+44 7123 456789" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input type="email" id="businessEmail" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="please enter your city" />
                  </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input type="email" id="businessEmail" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="please enter your state" />
                  </div>
                      <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                    <input type="email" id="businessEmail" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="please enter your zip code" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Plan Selection */}
            {currentStep === 1 && (
              <div>
                <h4 className="text-2xl font-semibold mb-2">Choose Your Plan</h4>
                <p className="text-gray-600 mb-6">Select the plan that best fits your needs.</p>

                <div className="option-grid">
                  {plans?.map((plan) => (
                    <div key={plan.id} className="select-card">
                      <input
                        type="radio"
                        id={`plan_${plan.id}`}
                        name="plan_name"
                        value={plan.value}
                        checked={selectedPlan === plan.value}
                        onChange={() => setSelectedPlan(plan.value)}
                      />
                      <label className="plan-card" htmlFor={`plan_${plan.id} `}>
                         {plan.badge && (
    <span className={`plan-badge ${plan.badge.toLowerCase()}`}>
      {plan.badge}
    </span>
  )}
                        <span className="card-icon">💎</span>
                        <span className="title">{plan.name.split(' ')[0]}</span>
                        <span className="plan-summary">{plan.summary}</span>
                        <ul className="plan-features">
                          {plan.features.map((feature, i) => (
                            <li key={i}>
                              <Icon icon="iconamoon:check-fill" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="plan-footer">
                          <div>
                            <span className="price" data-monthly={plan.priceMonthly} data-yearly={plan.priceYearly}>
                              {billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}
                            </span>
                            <span className="CTA-subtext">/per month</span>
                          </div>
                          <span className="plan-action">Continue</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Account Creation */}
            {currentStep === 2 && (
              <div>
                <h4 className="text-2xl font-semibold mb-2">Create Your Account</h4>
                <p className="text-gray-600 mb-8">Create your login details.</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="Enter your first name" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input type="text" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="Enter your last name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" id="accountEmail" className="w-full border border-gray-300 rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all" placeholder="name@company.co.uk" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 3 && (
              <div>
                <h4 className="text-2xl font-semibold mb-2">Complete Your Subscription</h4>
                <p className="text-gray-600 mb-8">Review your order and proceed to payment.</p>

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                  <h6 className="font-semibold mb-4">Order Summary</h6>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>Plan</span><strong>{selectedPlan}</strong></div>
                    <div className="flex justify-between"><span>Billing</span><strong>{billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}</strong></div>
                    <div className="flex justify-between border-t pt-3"><span>Total</span><strong className="text-xl">{getCurrentPrice()} / month</strong></div>
                  </div>
                </div>

                {/* Stripe Payment Notification */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
                      <Icon icon="mdi:lock-check" className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Secure Payment with Stripe</h5>
                      <p className="text-sm text-gray-600">Your payment will be processed securely</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Your payment is processed through Stripe</span>, a leading secure payment platform. We don't store your card details on our servers.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Icon icon="mdi:shield-check" className="text-green-600 text-2xl mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Secure</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Icon icon="mdi:credit-card" className="text-blue-600 text-2xl mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Multiple Cards</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Icon icon="mdi:lightning-bolt" className="text-yellow-600 text-2xl mx-auto mb-2" />
                      <p className="text-xs font-medium text-gray-700">Instant</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {currentStep === 4 && (
              <div className="text-center py-10">
                <img src="src/assets/app-screens/successful.png" alt="Success" className="mx-auto mb-8 w-60" />

                <h5 className="text-4xl font-bold mb-3">🎉 You're All Set!</h5>
                <h6 className="text-2xl text-gray-700 mb-4">Your RotaFlow account is ready.</h6>
                <p className="text-gray-600 max-w-md mx-auto mb-10">Start managing your care team and scheduling with ease now.</p>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold text-lg px-12 py-4 rounded-2xl inline-flex items-center gap-3"
                >
                  Go to Dashboard →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="border-t bg-white p-6 flex justify-end gap-4 sticky bottom-0">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="px-8 py-3 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              className="px-10 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md flex items-center gap-2"
            >
              {currentStep === 3 ? 'Subscribe & Start →' : 'Continue →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;