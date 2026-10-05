import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-content",
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

      gsap.fromTo(
        ".capability-tag",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".capabilities-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    "Intelligent Shift Matching",
    "Real-Time Staff Communication",
    "Automated Compliance Tracking",
    "GPS-Verified Check-ins",
    "Seamless Timesheet & Payroll",
    "Digital Care Plans & Reports",
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="about-content max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            About Zavro
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built Exclusively for Modern Care Providers
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Zavro empowers healthcare and care organisations to streamline staff scheduling,
            eliminate administration overhead, and ensure seamless communication across your entire team.
          </p>
        </div>

        <div className="capabilities-container flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mb-10">
          {capabilities.map((cap, index) => (
            <span
              key={index}
              className="capability-tag px-4 py-2 rounded-full bg-background border border-border text-foreground text-sm font-medium shadow-sm hover:border-primary/50 transition-colors"
            >
              {cap}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            className="rounded-full px-6 py-5 text-sm font-medium gap-2 shadow-sm"
          >
            <a href="#features">
              Explore Our Platform
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
