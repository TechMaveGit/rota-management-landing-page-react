import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Clock, 
  Users, 
  Shield, 
  BarChart3, 
  Bell, 
  Layers 
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Clock,
    title: "Real-time scheduling",
    description: "Live updates across all devices. Changes sync instantly to staff mobile apps.",
  },
  {
    icon: BarChart3,
    title: "Smart analytics",
    description: "Track hours, costs, and attendance patterns with actionable insights.",
  },
  {
    icon: Shield,
    title: "Compliance built-in",
    description: "Automated working time regulations and mandatory break enforcement.",
  },
  {
    icon: Users,
    title: "Team management",
    description: "Manage skills, availability, and preferences for optimal shift matching.",
  },
  {
    icon: Bell,
    title: "Instant notifications",
    description: "Automated alerts for shift changes, reminders, and urgent coverage needs.",
  },
  {
    icon: Layers,
    title: "Multi-location support",
    description: "Manage rotas across multiple sites and departments from one dashboard.",
  },
];

const DarkFeatures = () => {
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
        ".dark-feature-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".dark-features-grid",
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
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "hsl(0, 0%, 15%)" }}
    >
      <div className="container relative">
        <div ref={titleRef} className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Complete rota management
          </h2>
          <p className="text-white/60 text-lg">
            RotaFlow is purpose-built to handle the complexity of care sector scheduling.
          </p>
        </div>

        <div className="dark-features-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="dark-feature-item flex gap-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-white/70" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DarkFeatures;
