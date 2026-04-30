import { useEffect, useRef } from "react";
import { BarChart3, MessageSquare, Users, Clock, MapPin, FileText } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BentoFeatures = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-header",
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
        ".bento-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="bento-header text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            Powerful Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Boost Speed and Control Your<br />
            Staff Operations with Zavro
          </h2>
          <p className="text-muted-foreground text-lg">
            Exploring the powerful features of our dashboard for enhanced speed, control, 
            and exceptional success in managing your workforce operations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid grid-cols-12 gap-4 max-w-6xl mx-auto">
          {/* Real-time Shift Tracking - Large card */}
          <div className="bento-card col-span-12 md:col-span-7 bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                {/* Mini chart UI */}
                <div className="flex-1">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Staff Coverage</span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">Shift Hours</span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">Weekly</span>
                  </div>
                  <div className="flex items-end gap-3 h-24">
                    {[65, 78, 45, 89, 72, 95, 68].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {["M", "T", "W", "T", "F", "S", "S"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center ml-4">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="text-xl font-bold mb-2">Real-time Shift Tracking</h3>
                <p className="text-muted-foreground text-sm">
                  From tracking individual attendance to analyzing overall trends, our intuitive platform 
                  provides you with the insights you need to make informed decisions in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Staff by Location */}
          <div className="bento-card col-span-12 md:col-span-5 bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-bold mb-4">Staff by Location</h3>
              <div className="space-y-3 flex-1">
                {[
                  { name: "Main Hospital", staff: 24, color: "bg-primary" },
                  { name: "Care Home A", staff: 18, color: "bg-secondary" },
                  { name: "Care Home B", staff: 12, color: "bg-green-500" },
                ].map((location, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className={`w-8 h-8 rounded-lg ${location.color} flex items-center justify-center`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{location.name}</p>
                      <p className="text-xs text-muted-foreground">{location.staff} staff on shift</p>
                    </div>
                    <span className="text-sm font-semibold">#{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comprehensive Data Insight */}
          <div className="bento-card col-span-12 md:col-span-4 bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-bold mb-2">Comprehensive<br />Data Insight</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Identify patterns, forecast staffing needs, and tailor your rota strategies to meet the evolving demands.
              </p>
              <div className="mt-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Live updates</span>
              </div>
            </div>
          </div>

          {/* Team Communication */}
          <div className="bento-card col-span-12 md:col-span-4 bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Team Communication</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Built-in messaging for shift swaps, announcements, and team coordination.
              </p>
              <div className="mt-auto flex -space-x-2">
                {["JD", "SM", "AK", "TB"].map((initials, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-card flex items-center justify-center text-xs font-medium">
                    {initials}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                  +8
                </div>
              </div>
            </div>
          </div>

          {/* Hours Summary */}
          <div className="bento-card col-span-12 md:col-span-4 bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">This Month</span>
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold">2,847</span>
                <span className="text-muted-foreground text-sm ml-1">hours</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-green-600 font-medium">↑ 12%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Total Shifts Completed</p>
                <p className="text-lg font-bold">486</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
