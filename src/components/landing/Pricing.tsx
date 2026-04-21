import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowUpRight, Diamond } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPlan } from "@/store";
import notify from "@/utils/notify";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleFetchPlans();
  }, []);

  const handleFetchPlans = async () => {
    await getPlan((status, res) => {
      if (res?.data?.status == true) {
        setPlans(res?.data?.data || []);
      }
    }, (err) => {
      notify(err?.response?.data?.message, "error");
    });
  };

  useEffect(() => {
    if (plans.length === 0) return;
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
  }, [plans]);


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
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start"
        >
          {plans?.map((plan, index) => {
            const isPopular = index === 1;
            return (
              <div
                key={index}
                className={`pricing-card relative p-6 rounded-2xl border transition-all ${isPopular
                  ? "bg-secondary text-secondary-foreground border-secondary shadow-blue scale-105 z-10"
                  : "bg-card border-border hover:border-primary/20 hover:shadow-card"
                  }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPopular
                  ? "bg-white/20"
                  : "bg-primary/10"
                  }`}>
                  <Diamond className={`h-7 w-7 ${isPopular
                    ? "text-white"
                    : "text-primary"
                    }`} />
                </div>

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 ${isPopular ? "text-white/70" : "text-muted-foreground"}`}>
                  {plan.highlight?.[0] || plan.type}
                </p>

                <ul className="space-y-3 mb-6">
                  {plan.permission?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${isPopular ? "text-white" : "text-primary"
                        }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    {plan.currency}{plan.price}
                  </span>
                  <span className={isPopular ? "text-white/70" : "text-muted-foreground"}>
                    /{plan.duration === 'Annually' ? 'year' : 'month'}
                  </span>
                </div>

                <Button
                  onClick={() => navigate("/registration")}
                  className={`w-full group ${isPopular
                    ? "bg-white text-secondary hover:bg-white/90"
                    : index === plans.length - 1 ? "variant-outline" : ""
                    }`}
                  variant={index === plans.length - 1 ? "outline" : "default"}
                >
                  {"Get Started"}
                  <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
