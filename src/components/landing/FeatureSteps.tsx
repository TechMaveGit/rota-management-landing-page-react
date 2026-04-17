import { useEffect, useRef } from "react";
import { Calendar, Users, Clock, FileText, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: 1,
    title: "Create Your Rota Template",
    description: "Set up recurring shift patterns with customizable templates. Define shift times, required staff count, and qualifications needed.",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Assign Staff Automatically",
    description: "Let RotaFlow match available staff to shifts based on skills, preferences, and availability. Manual overrides always available.",
    icon: Users,
  },
  {
    step: 3,
    title: "Track Time & Attendance",
    description: "Staff clock in/out via mobile app with GPS verification. Real-time visibility into who's on shift and where.",
    icon: Clock,
  },
  {
    step: 4,
    title: "Generate Reports & Payroll",
    description: "Automatically calculate hours, overtime, and generate accurate timesheets ready for payroll processing.",
    icon: FileText,
  },
];

const FeatureSteps = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".steps-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".steps-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="steps-header text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Streamline Your Rota Management<br />
            <span className="text-muted-foreground">in 4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of intelligent scheduling. Here's how we make 
            rota management simple and accessible for everyone.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="step-card group relative">
              <div className="bg-card rounded-2xl border border-border p-6 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-medium text-muted-foreground">
                    Step {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for connection (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden bg-primary/10 w-10 h-10 rounded-xl flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSteps;
