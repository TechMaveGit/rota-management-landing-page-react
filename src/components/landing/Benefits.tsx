import { useEffect, useRef } from "react";
import { Zap, Target, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Zap,
    title: "Streamlined Operations",
    description: "Our platform seamlessly connects care managers, staff, and clients for smooth daily operations.",
    color: "primary",
  },
  {
    icon: Target,
    title: "Effortless Compliance",
    description: "Stay compliant with built-in regulations tracking, automated alerts, and audit-ready documentation.",
    color: "secondary",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description: "Leverage data insights to optimize schedules, reduce costs, and improve care quality over time.",
    color: "primary",
  },
];

const Benefits = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefits-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".benefits-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative">
      <div className="container">
        <div className="benefits-title text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Benefits
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Benefits
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Harness the power of modern technology to transform your care organization
          </p>
        </div>

        <div className="benefits-grid grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`benefit-card group p-6 rounded-2xl border transition-all hover:shadow-card-hover ${
                index === 1 
                  ? "bg-secondary text-secondary-foreground border-secondary" 
                  : "bg-card border-border hover:border-primary/20"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                index === 1 
                  ? "bg-white/20" 
                  : benefit.color === "primary" ? "bg-primary/10" : "bg-secondary/10"
              }`}>
                <benefit.icon className={`h-7 w-7 ${
                  index === 1 
                    ? "text-white" 
                    : benefit.color === "primary" ? "text-primary" : "text-secondary"
                }`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className={`leading-relaxed ${index === 1 ? "text-white/80" : "text-muted-foreground"}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
