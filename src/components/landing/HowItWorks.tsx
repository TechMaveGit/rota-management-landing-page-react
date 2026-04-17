import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Settings, Smartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Set up your organization",
    description: "Add your departments, care settings, and team structure. Import existing staff data or start fresh in minutes.",
    icon: Calendar,
    illustration: "setup",
  },
  {
    number: "02",
    title: "Configure your scheduling rules",
    description: "Set shift patterns, availability rules, skill requirements, and compliance constraints. RotaFlow handles the complexity.",
    icon: Settings,
    illustration: "config",
  },
  {
    number: "03",
    title: "Generate & publish rotas",
    description: "Create optimized schedules with one click. Staff get instant notifications via the app. Track attendance in real-time.",
    icon: Smartphone,
    illustration: "publish",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
        ".step-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".steps-container",
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
      id="how-it-works"
      ref={sectionRef}
      className="py-24 bg-muted/30 relative overflow-hidden"
    >
      <div className="container relative">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-muted-foreground text-sm mb-3">
            I know what you're thinking...
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            How does it work?
          </h2>
        </div>

        <div className="steps-container grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card bg-background rounded-2xl border border-border/50 overflow-hidden"
            >
              {/* Illustration area */}
              <div className="h-56 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center p-6 relative overflow-hidden">
                {step.illustration === "setup" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute -left-4 top-4 w-32 h-40 bg-primary/20 rounded-xl transform -rotate-12 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-primary/60" />
                    </div>
                    <div className="absolute left-8 top-8 w-32 h-40 bg-secondary/30 rounded-xl transform -rotate-6 flex items-center justify-center">
                      <div className="text-secondary text-xs font-medium">Staff List</div>
                    </div>
                    <div className="absolute left-20 top-12 w-36 h-44 bg-background rounded-xl shadow-lg flex flex-col p-3 transform rotate-3">
                      <div className="text-xs font-semibold mb-2">Organization Setup</div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-muted rounded w-full"></div>
                        <div className="h-2 bg-muted rounded w-3/4"></div>
                        <div className="h-2 bg-primary/30 rounded w-1/2"></div>
                      </div>
                      <div className="mt-2 bg-primary text-primary-foreground text-[10px] py-1 px-2 rounded text-center">
                        Get Started →
                      </div>
                    </div>
                  </div>
                )}
                {step.illustration === "config" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-background rounded-xl shadow-lg p-4 w-full max-w-[200px]">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Shift Rules</div>
                              <div className="text-[10px] text-muted-foreground">Max 8 hours per shift</div>
                            </div>
                          </div>
                          <div className="w-8 h-4 bg-primary rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-background rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Break Time</div>
                              <div className="text-[10px] text-muted-foreground">30 min for 6+ hours</div>
                            </div>
                          </div>
                          <div className="w-8 h-4 bg-primary rounded-full relative">
                            <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-background rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-muted flex items-center justify-center">
                              <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Overtime</div>
                              <div className="text-[10px] text-muted-foreground">Alert after 40h/week</div>
                            </div>
                          </div>
                          <div className="w-8 h-4 bg-muted rounded-full relative">
                            <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-background rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {step.illustration === "publish" && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="bg-background rounded-xl shadow-lg p-4 w-full max-w-[200px]">
                      <div className="flex items-center gap-2 mb-3 border-b border-border pb-2">
                        <span className="italic text-xs">RotaFlow</span>
                        <span className="font-bold text-xs">Publish</span>
                        <span className="ml-auto text-muted-foreground">🔗</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-[10px]">👋</span>
                          </div>
                          <div className="text-xs">Hey there!</div>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          Your rota for next week is ready:
                        </p>
                        <p className="text-xs font-semibold">
                          Monday - Friday, 9am-5pm
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Tap to view full schedule...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content area */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-sm font-bold">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
