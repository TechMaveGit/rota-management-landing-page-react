import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "500+", label: "Care Organizations" },
  { value: "50K+", label: "Staff Managed" },
  { value: "2M+", label: "Shifts Scheduled" },
  { value: "99.9%", label: "Uptime" },
];

const Indicators = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".indicator-left",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".indicator-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-card border-y border-border">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Content */}
          <div className="indicator-left lg:col-span-2">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Indicators
              <span className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              We're Proud of Our Impact
            </h2>
            
            {/* Rating Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-muted rounded-full">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-card flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm">4.9/5</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">Based on 250+ reviews</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid lg:col-span-3 grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="indicator-stat text-center lg:text-left">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Indicators;
