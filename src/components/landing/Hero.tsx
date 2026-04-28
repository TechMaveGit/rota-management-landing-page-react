import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-tag", { opacity: 0, y: 20, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.2")
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-features", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(mockupRef.current, { opacity: 0, x: 60, scale: 0.98, duration: 0.8 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    "No credit card required",
    "14-day free trial",
    "Cancel anytime",
  ];

  return (
    <section
      ref={heroRef}
      className=" pt-40 pb-16 relative overflow-hidden bg-background"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="max-w-xl">
            <div className="hero-tag inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Trusted by 500+ care providers
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-6">
              Simplify Your{" "}
              <span className="text-gradient">Staff Scheduling</span>{" "}
              & Care Management
            </h1>

            <p className="hero-subtitle text-lg text-muted-foreground mb-8 leading-relaxed">
              Zavro helps care organizations manage rotas, track attendance,
              handle payroll, and ensure compliance — all in one powerful platform.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 mb-8">
              <Button size="lg" className="shadow-button font-semibold px-6" onClick={() => navigate("/registration")}>
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-semibold px-6 group"
              >
                <Play className="mr-2 h-4 w-4 fill-primary text-primary group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="hero-features flex flex-wrap gap-x-6 gap-y-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup - Dashboard Preview */}
          <div ref={mockupRef} className="relative lg:pl-8">
            <div className="bg-card rounded-2xl shadow-card-hover border border-border overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <div className="w-3 h-3 rounded-full bg-secondary/60" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-muted rounded-md h-6 max-w-xs flex items-center px-3">
                    <span className="text-xs text-muted-foreground">app.zavro.com/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-4 md:p-6">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-foreground">Dashboard</h3>
                    <p className="text-xs text-muted-foreground">Dec 11, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="px-3 py-1.5 bg-muted rounded-md text-xs font-medium">All Departments</div>
                    <div className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-xs font-medium">Export</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Total Staff</p>
                    <p className="text-2xl font-bold text-foreground">200</p>
                    <p className="text-xs text-primary">+12% this month</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Shifts Today</p>
                    <p className="text-2xl font-bold text-foreground">48</p>
                    <p className="text-xs text-secondary">All covered</p>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground mb-1">Attendance</p>
                    <p className="text-2xl font-bold text-foreground">94%</p>
                    <p className="text-xs text-primary">Above target</p>
                  </div>
                </div>

                {/* Chart preview */}
                <div className="bg-muted/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium">Staff Distribution</p>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Care Workers</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" /> Office Staff</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {[65, 45, 80, 55, 70, 90, 60].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-1">
                        <div
                          className={`rounded-t-sm ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notification card */}
            <div className="absolute -left-4 bottom-20 bg-card rounded-xl shadow-card-hover border border-border p-3 animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Shift Approved</p>
                  <p className="text-[10px] text-muted-foreground">Sarah's swap request</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
