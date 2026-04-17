import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowUpRight, Diamond } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    description: "For small care teams just getting started with digital management.",
    monthlyPrice: 39.99,
    yearlyPrice: 29.99,
    features: [
      "Up to 30 staff members",
      "Basic scheduling",
      "Mobile app access",
      "Email support",
      "7-day data history",
    ],
    iconColor: "primary",
  },
  {
    name: "Standard",
    description: "For growing organizations that need more power and flexibility.",
    monthlyPrice: 69.99,
    yearlyPrice: 54.99,
    popular: true,
    features: [
      "Up to 100 staff members",
      "Advanced scheduling",
      "Time tracking & GPS",
      "Payroll integration",
      "Priority support",
      "30-day data history",
    ],
    iconColor: "secondary",
  },
  {
    name: "Enterprise",
    description: "For large-scale operations requiring unlimited capabilities.",
    monthlyPrice: 89.99,
    yearlyPrice: 74.99,
    features: [
      "Unlimited staff members",
      "All Standard features",
      "Custom workflows",
      "API access",
      "Dedicated account manager",
      "Unlimited data history",
    ],
    iconColor: "primary",
  },
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <div className="container relative">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Subscription
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Package
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Pick your plan and start transforming your care management today
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-card border border-border rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-button"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-button"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative p-6 rounded-2xl border transition-all ${
                plan.popular
                  ? "bg-secondary text-secondary-foreground border-secondary shadow-blue scale-105 z-10"
                  : "bg-card border-border hover:border-primary/20 hover:shadow-card"
              }`}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                plan.popular 
                  ? "bg-white/20" 
                  : plan.iconColor === "primary" ? "bg-primary/10" : "bg-secondary/10"
              }`}>
                <Diamond className={`h-7 w-7 ${
                  plan.popular 
                    ? "text-white" 
                    : plan.iconColor === "primary" ? "text-primary" : "text-secondary"
                }`} />
              </div>

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                      plan.popular ? "text-white" : "text-primary"
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  £{isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className={plan.popular ? "text-white/70" : "text-muted-foreground"}>
                  /per month
                </span>
              </div>

              <Button
                className={`w-full group ${
                  plan.popular
                    ? "bg-white text-secondary hover:bg-white/90"
                    : plan.name === "Enterprise" ? "variant-outline" : ""
                }`}
                variant={plan.name === "Enterprise" ? "outline" : "default"}
              >
                {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
