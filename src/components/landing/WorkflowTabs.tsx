import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, BarChart3, Users, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: "schedule",
    title: "Manage Shifts",
    description: "Monitor shift scheduling, staff assignments, and dispatching with real-time updates.",
    icon: Calendar,
  },
  {
    id: "attendance",
    title: "Track Attendance",
    description: "Dive into detailed clock-in/out data by staff, location, or timeframe to ensure accuracy.",
    icon: Clock,
  },
  {
    id: "team",
    title: "Manage Team",
    description: "Assign roles, track performance, and collaborate seamlessly across all teams.",
    icon: Users,
  },
];

const shiftData = [
  { id: "#RF001", name: "Sarah Mitchell", status: "Confirmed", time: "06:00 - 14:00", location: "Care Home A" },
  { id: "#RF002", name: "James Wilson", status: "Pending", time: "14:00 - 22:00", location: "Day Centre" },
  { id: "#RF003", name: "Emma Thompson", status: "Confirmed", time: "22:00 - 06:00", location: "Care Home B" },
  { id: "#RF004", name: "Michael Brown", status: "Swap Request", time: "06:00 - 14:00", location: "Home Care" },
];

const WorkflowTabs = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".workflow-title",
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
        ".workflow-content",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".workflow-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".workflow-table",
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".workflow-table",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
    }
  }, [activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      case "Swap Request":
        return "bg-secondary/20 text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container">
        <div className="workflow-title text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Simplify Your <span className="text-primary">Workflow</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Highlight the streamlined actions users can take within the dashboard, 
            breaking it into manageable and engaging steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Side - Tabs */}
          <div className="workflow-content space-y-2">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 border ${
                  activeTab === tab.id
                    ? "bg-card border-primary/20 shadow-sm"
                    : "bg-transparent border-transparent hover:bg-card/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <tab.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${activeTab === tab.id ? "text-foreground" : "text-muted-foreground"}`}>
                      {tab.title}
                    </h3>
                    <p className={`text-sm ${activeTab === tab.id ? "text-muted-foreground" : "text-muted-foreground/70"}`}>
                      {tab.description}
                    </p>
                    {activeTab === tab.id && (
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-2 group cursor-pointer">
                        Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </div>
                </div>
                {activeTab === tab.id && (
                  <div className="mt-3 h-0.5 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-primary rounded-full" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right Side - Table */}
          <div ref={tableRef} className="workflow-table bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold">Today's Shifts</h3>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider pb-3 border-b border-border">
              <span>Shift ID</span>
              <span>Staff Name</span>
              <span>Status</span>
              <span>Time</span>
              <span>Location</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {shiftData.map((shift, index) => (
                <div
                  key={shift.id}
                  className="grid grid-cols-5 gap-4 py-4 text-sm items-center hover:bg-muted/30 -mx-2 px-2 rounded transition-colors"
                >
                  <span className="font-medium text-muted-foreground">{shift.id}</span>
                  <span className="font-medium">{shift.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(shift.status)}`}>
                    {shift.status}
                  </span>
                  <span className="text-muted-foreground">{shift.time}</span>
                  <span className="text-muted-foreground truncate">{shift.location}</span>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">48</p>
                    <p className="text-xs text-muted-foreground">Total Shifts</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-lg font-bold text-green-600">42</p>
                  <p className="text-xs text-muted-foreground">Filled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowTabs;
