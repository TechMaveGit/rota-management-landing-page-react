import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DashboardPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".preview-content",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".preview-mockup",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="preview-content">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Built for You
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We've Built for You
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Harnessing the power of modern technology to revolutionize care management 
              and enhance the experience for staff and clients alike.
            </p>
            <Button variant="outline" className="font-semibold group">
              Explore More
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>

          {/* Right Mockup */}
          <div className="preview-mockup relative">
            <div className="bg-card rounded-2xl shadow-card-hover border border-border p-1 relative">
              {/* Feature Label */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium shadow-button">
                Planning Feature
              </div>
              
              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Track your operations and leverage data-driven insights
                </p>
                
                <div className="flex gap-3">
                  {/* Mini Sidebar */}
                  <div className="w-40 bg-card rounded-xl p-3 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                        <span className="text-[10px] text-primary-foreground font-bold">RF</span>
                      </div>
                      <span className="text-xs font-semibold">Zavro</span>
                    </div>
                    <div className="space-y-1.5">
                      {["Dashboard", "Schedule", "Staff", "Clients", "Reports"].map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                          <div className={`w-3 h-3 rounded ${i === 0 ? "bg-white/20" : "bg-muted"}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dashboard Cards */}
                  <div className="flex-1 space-y-3">
                    <div className="bg-card rounded-xl p-3 border border-border flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="font-bold">1,342 Hours</p>
                      </div>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium">Shift Coverage</span>
                        <span className="text-xs text-primary font-semibold">94%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-[94%] bg-gradient-to-r from-primary to-secondary rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
