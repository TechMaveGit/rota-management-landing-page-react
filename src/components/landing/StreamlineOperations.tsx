import { useEffect, useRef } from "react";
import { Calendar, BarChart3, Users, Clock, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const StreamlineOperations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".streamline-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".streamline-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".streamline-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container">
        <div className="streamline-title text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Streamline Your <span className="text-primary">Scheduling</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Unlock the full potential of your care business with tools to automate rotas, 
            deliver insights, and centralize staff data. Simplify processes and focus on care delivery.
          </p>
        </div>

        <div className="streamline-grid grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 - Automated Scheduling */}
          <div className="streamline-card group bg-card rounded-2xl border border-border p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              {/* Mini Rota Preview */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New shift assigned</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-card rounded-lg">
                  <span className="text-sm font-medium">Morning Shift</span>
                  <span className="text-xs text-muted-foreground">06:00 - 14:00</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>8 hours • Care Home A</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>12 Confirmed</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>3 Pending</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Automated Scheduling</h3>
            <p className="text-muted-foreground text-sm">
              Simplify rota creation with automation. Handle shift assignments, 
              staff availability, and notifications effortlessly.
            </p>
          </div>

          {/* Card 2 - Custom Reporting */}
          <div className="streamline-card group bg-card rounded-2xl border border-border p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              {/* Mini Chart */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Weekly Hours</span>
                <span className="text-xs text-muted-foreground">This Week</span>
              </div>
              <div className="relative h-24">
                <svg className="w-full h-full" viewBox="0 0 200 80">
                  <path
                    d="M 0,60 Q 30,45 50,50 T 100,35 T 150,45 T 200,25"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                  />
                  <path
                    d="M 0,60 Q 30,45 50,50 T 100,35 T 150,45 T 200,25 V 80 H 0 Z"
                    fill="url(#gradient)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">1,240</p>
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-secondary">£18.5k</p>
                  <p className="text-xs text-muted-foreground">Payroll Cost</p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Custom Reporting</h3>
            <p className="text-muted-foreground text-sm">
              Generate tailored reports to focus on the metrics that matter. 
              Visualize performance insights for data-driven decisions.
            </p>
          </div>

          {/* Card 3 - Multi-Location Management */}
          <div className="streamline-card group bg-card rounded-2xl border border-border p-6 hover:shadow-card-hover transition-all duration-300">
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-3">Manage all locations</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    CH
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Care Home North</p>
                    <p className="text-xs text-muted-foreground">24 staff active</p>
                  </div>
                  <span className="text-xs text-primary">Details →</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-secondary-foreground">
                    DC
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Day Centre</p>
                    <p className="text-xs text-muted-foreground">18 staff active</p>
                  </div>
                  <span className="text-xs text-secondary">Details →</span>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Location Insights</h3>
            <p className="text-muted-foreground text-sm">
              Track and analyze staff coverage across all locations from one 
              unified dashboard, ensuring no shift goes unfilled.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="group">
            Request a Demo
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StreamlineOperations;
