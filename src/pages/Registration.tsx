import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './registration.css';
import PhoneInput from "react-phone-input-2";
import { getPlan } from '@/store';
import notify from '@/utils/notify';

const steps = [
  { id: 1, title: 'Business Info', desc: 'Basic business details' },
  { id: 2, title: 'Plan', desc: 'Select the right plan' },
  { id: 3, title: 'Account', desc: 'Create your login' },
  { id: 4, title: 'Payment', desc: 'Enter payment details' },
  { id: 5, title: 'Success', desc: 'Finish and submit' },
];

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState('Standard Plan');
  const [businessName, setBusinessName] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [BusinessPhoneNo, setBusinessPhoneNo] = useState("")
  const [businessCity, setBusinessCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState({
    phone: "",
    localPhone: "",
    dialCode: "",
    countryName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [plans, setPlans] = useState<any[]>([]);


  useEffect(() => {
    handleFetchPlans()
  }, [])

  const handleFetchPlans = async () => {
    await getPlan((status, res) => {
      if (res?.data?.status == true) {
        console.log(res?.data, "-----");
        const apiPlans = res?.data?.data || [];
        setPlans(apiPlans);
        if (apiPlans.length > 0) {
          setSelectedPlan(apiPlans[0].name);
        }
      } else {
        console.log(res?.data?.message, "error")
      }
    }, (err) => {
      notify(err?.response?.data?.message, "error")
    })
  }




  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!businessName.trim()) newErrors.businessName = "Business Name is required";
    if (!businessEmail.trim()) {
      newErrors.businessEmail = "Business Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      newErrors.businessEmail = "Invalid email format";
    }
    if (!businessAddress.trim()) newErrors.businessAddress = "Business Address is required";
    if (!BusinessPhoneNo.trim()) newErrors.BusinessPhoneNo = "Business Phone No is required";
    if (!businessCity.trim()) newErrors.businessCity = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!zipCode.trim()) newErrors.zipCode = "Zip Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone || formData.phone.length < 5) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 0) {
      if (!validateStep1()) return;
    }
    if (currentStep === 2) {
      if (!validateStep3()) return;
    }
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
    const plan = plans.find(p => p.name === selectedPlan);
    if (!plan) return '£0';
    return `${plan.currency}${plan.price}`;
  };
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex h-screen overflow-hidden bg-white">
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
                className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all ${index === currentStep
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

      <div className="flex-1 flex flex-col overflow-hidden">
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

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {currentStep === 0 && (
              <div>
                <h4 className="text-2xl font-semibold mb-2">Let’s Learn About Your Business</h4>
                <p className="text-gray-600 mb-8">Enter your business details so we can set up your workspace correctly.</p>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                    <input type="text" value={businessName} onChange={(e) => {
                      setBusinessName(e.target.value);
                      if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: "" }));
                    }}
                      className={`w-full border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="Enter your business name" />
                    {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Email *</label>
                    <input type="text" value={businessEmail} onChange={(e) => {
                      setBusinessEmail(e.target.value);
                      if (errors.businessEmail) setErrors((prev) => ({ ...prev, businessEmail: "" }));
                    }}
                      className={`w-full border ${errors.businessEmail ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="Enter your business email" />
                    {errors.businessEmail && <p className="text-red-500 text-xs mt-1">{errors.businessEmail}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                    <input type="text" value={businessAddress} onChange={(e) => {
                      setBusinessAddress(e.target.value);
                      if (errors.businessAddress) setErrors((prev) => ({ ...prev, businessAddress: "" }));
                    }}
                      className={`w-full border ${errors.businessAddress ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="Enter your business address" />
                    {errors.businessAddress && <p className="text-red-500 text-xs mt-1">{errors.businessAddress}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Phone No *</label>
                    <input type="tel" value={BusinessPhoneNo} onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9+]/g, "");
                      setBusinessPhoneNo(value);
                      if (errors.BusinessPhoneNo) setErrors((prev) => ({ ...prev, BusinessPhoneNo: "" }));
                    }}
                      className={`w-full border ${errors.BusinessPhoneNo ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="+44 7123 456789" />
                    {errors.BusinessPhoneNo && <p className="text-red-500 text-xs mt-1">{errors.BusinessPhoneNo}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input value={businessCity} onChange={(e) => {
                      setBusinessCity(e.target.value);
                      if (errors.businessCity) setErrors((prev) => ({ ...prev, businessCity: "" }));
                    }}
                      type="text" id="businessCity" className={`w-full border ${errors.businessCity ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="please enter your city" />
                    {errors.businessCity && <p className="text-red-500 text-xs mt-1">{errors.businessCity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <input value={state} onChange={(e) => {
                      setState(e.target.value);
                      if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
                    }} type="text" id="businessState" className={`w-full border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="please enter your state" />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
                    <input value={zipCode} onChange={(e) => {
                      setZipCode(e.target.value);
                      if (errors.zipCode) setErrors((prev) => ({ ...prev, zipCode: "" }));
                    }} type="number" id="businessZipCode" className={`w-full border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="please enter your zip code" />
                    {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
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
                  {plans?.map((plan, index) => (
                    <div key={plan.id} className="select-card">
                      <input
                        type="radio"
                        id={`plan_${plan.id}`}
                        name="plan_name"
                        value={plan.name}
                        checked={selectedPlan === plan.name}
                        onChange={() => setSelectedPlan(plan.name)}
                      />
                      <label className="plan-card" htmlFor={`plan_${plan.id}`}>
                        {plan.type && (
                          <span className={`plan-badge badge-color-${index % 4}`}>
                            {plan.type}
                          </span>
                        )}
                        <span className="card-icon">💎</span>
                        <span className="title">{plan.name}</span>
                        <span className="plan-summary">{plan.highlight?.[0] || 'A great plan for your needs'}</span>
                        <ul className="plan-features">
                          {plan.permission?.slice(0, 5).map((feature: string, i: number) => (
                            <li key={i}>
                              <Icon icon="iconamoon:check-fill" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="plan-footer">
                          <div>
                            <span className="price">
                              {plan.currency}{plan.price}
                            </span>
                            <span className="CTA-subtext">/{plan.duration === 'Annually' ? 'year' : 'month'}</span>
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
                    <input type="text" value={firstName} onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }} className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="Enter your first name" />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input type="text" value={lastName} onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }} className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="Enter your last name" />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input type="email" value={email} onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }} id="accountEmail" className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-sm px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 transition-all`} placeholder="name@company.co.uk" />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <PhoneInput
                      country="gb"
                      enableSearch
                      value={formData.phone}
                      placeholder="Enter phone number"
                      containerClass="w-full"
                      inputClass={`
                              !w-full
                              !h-[48px]
                              !pl-14
                              !pr-4
                              !border
                              ${errors.phone ? '!border-red-500' : '!border-gray-300'}
                              !rounded-md
                              focus:!outline-none
                              focus:!ring-2
                              focus:!ring-primary
                            `}
                      buttonClass={`${errors.phone ? '!border-red-500' : '!border-gray-300'} !rounded-l-md`}
                      dropdownClass="!z-[9999]"
                      onChange={(value, data: any) => {
                        const dialCode = data?.dialCode || "";
                        const localPhone = value.replace(dialCode, "");

                        setFormData((prev) => ({
                          ...prev,
                          phone: value,
                          localPhone,
                          dialCode,
                          countryName: data?.countryCode || "",
                        }));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                      }}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
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
                    <div className="flex justify-between"><span>Billing</span><strong>{plans.find(p => p.name === selectedPlan)?.duration || 'Annually'}</strong></div>
                    <div className="flex justify-between border-t pt-3"><span>Total</span><strong className="text-xl">{getCurrentPrice()} / {plans.find(p => p.name === selectedPlan)?.duration === 'Annually' ? 'year' : 'month'}</strong></div>
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
                  onClick={() => window.location.href = '/'}
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