import { useEffect, useRef } from "react";
import { Star, Users, Clock, TrendingUp, Calendar, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const FloatingElements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".floating-title",
        { opacity: 0, y: 30 },
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

      // Floating animations for cards
      gsap.fromTo(
        ".float-card-1",
        { opacity: 0, x: -100, y: 50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".float-card-2",
        { opacity: 0, x: 100, y: -50 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".float-card-3",
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".float-card-4",
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".float-card-5",
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".central-element",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".floating-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Continuous floating animation
      gsap.to(".float-card-1", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".float-card-2", {
        y: 10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(".float-card-3", {
        y: -8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-muted/50 to-background overflow-hidden">
      <div className="container">
        <div className="floating-title text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Intelligent Rota Management
            <br />
            <span className="text-primary">Growth Right Away</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            From staff scheduling to payroll — manage hundreds of care workers 
            and shifts seamlessly with Zavro's smart automation.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="rounded-full">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Book a Demo
            </Button>
          </div>
        </div>

        <div className="floating-container relative h-[500px] max-w-5xl mx-auto mt-12">
          {/* Central Dashboard Preview */}
          <div className="central-element absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-card rounded-3xl border border-border shadow-xl overflow-hidden">
            <div className="bg-primary p-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-white" />
                </div>
                <span className="text-white text-sm font-medium">Today's Schedule</span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {["Morning Shift", "Afternoon Shift", "Night Shift"].map((shift, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-xs font-medium">{shift}</p>
                    <p className="text-[10px] text-muted-foreground">{["06:00-14:00", "14:00-22:00", "22:00-06:00"][i]}</p>
                  </div>
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-card" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Card 1 - Rating */}
          <div className="float-card-1 absolute left-[5%] top-[30%] bg-card rounded-2xl border border-border shadow-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">4.9 Rating</p>
          </div>

          {/* Floating Card 2 - Staff Count */}
          <div className="float-card-2 absolute right-[5%] top-[20%] bg-green-50 rounded-2xl border border-green-200 shadow-lg p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">156</p>
                <p className="text-xs text-green-600">Active Staff</p>
              </div>
            </div>
          </div>

          {/* Floating Card 3 - Hours */}
          <div className="float-card-3 absolute left-[10%] bottom-[15%] bg-card rounded-2xl border border-border shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-xl font-bold">2,340</p>
                <p className="text-xs text-muted-foreground">Hours This Week</p>
              </div>
            </div>
          </div>

          {/* Floating Card 4 - Engagement */}
          <div className="float-card-4 absolute left-[15%] top-[10%] bg-card rounded-2xl border border-border shadow-lg p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">94%</span>
            </div>
            <p className="text-xs text-muted-foreground">Fill Rate</p>
          </div>

          {/* Floating Card 5 - Compliance */}
          <div className="float-card-5 absolute right-[10%] bottom-[25%] bg-card rounded-2xl border border-border shadow-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Compliance</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">98% Training Up-to-date</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingElements;
