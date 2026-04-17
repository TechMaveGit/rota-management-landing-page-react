import { useEffect, useRef } from "react";
import {
  Calendar,
  Users,
  Clock,
  FileText,
  Car,
  GraduationCap,
  BarChart3,
  Bell,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Calendar,
    title: "Rota Scheduling",
    description: "Create and manage complex staff rotas with our intuitive drag-and-drop scheduler.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Track client details, care plans, and visit schedules all in one place.",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "Attendance Tracking",
    description: "Real-time clock-in/out with GPS verification and automated timesheet generation.",
    color: "primary",
  },
  {
    icon: FileText,
    title: "Payroll & Invoices",
    description: "Automate payroll calculations and generate accurate invoices effortlessly.",
    color: "secondary",
  },
  {
    icon: Car,
    title: "Mileage Tracking",
    description: "Track staff travel distances and calculate mileage reimbursements automatically.",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "Training Management",
    description: "Monitor certifications, schedule training sessions, and ensure compliance.",
    color: "secondary",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Gain insights with comprehensive dashboards and exportable reports.",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified about shift conflicts, expiring certifications, and more.",
    color: "secondary",
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="features"
      ref={sectionRef}
      className="py-24 bg-muted/30 relative"
    >
      <div className="container">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Manage Care
          </h2>
          <p className="text-muted-foreground text-lg">
            From scheduling to payroll, RotaFlow has all the tools to run your care organization efficiently.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group p-6 bg-card rounded-xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card-hover"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                }`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
