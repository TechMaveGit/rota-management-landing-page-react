import { useEffect, useRef } from "react";
import { TrendingUp, MessageSquare, BarChart3, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".showcase-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".showcase-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background relative">
      <div className="container">
        <div className="showcase-title text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Features
            <span className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Clients Love Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Free up your time to focus on what matters most
          </p>
        </div>

        <div className="showcase-grid grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Card 1 - Smart Analytics */}
          <div className="showcase-card group p-6 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Smart Analytics Dashboard</h3>
                <p className="text-muted-foreground text-sm">
                  Track performance metrics and gain actionable insights from your data.
                </p>
              </div>
            </div>
            
            {/* Mini Chart Preview */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Care Performance</span>
                <span className="text-xs text-muted-foreground">Last 7 Days</span>
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary to-primary/60 rounded-t transition-all group-hover:from-primary group-hover:to-primary/80"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Team Communication */}
          <div className="showcase-card group p-6 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Team Communication</h3>
                <p className="text-muted-foreground text-sm">
                  Keep your entire care team connected with real-time messaging.
                </p>
              </div>
            </div>
            
            {/* Chat Preview */}
            <div className="bg-muted/50 rounded-xl p-4 space-y-3">
              {[
                { name: "Sarah M.", msg: "Shift confirmed for tomorrow", time: "10:30" },
                { name: "James T.", msg: "Client notes updated", time: "10:45" },
                { name: "Emma W.", msg: "Running 5 mins late", time: "11:02" },
              ].map((chat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center text-xs font-semibold">
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{chat.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.msg}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3 - Staff Distribution */}
          <div className="showcase-card group p-6 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Staff Distribution</h3>
                <p className="text-muted-foreground text-sm">
                  Visualize your team structure and optimize resource allocation.
                </p>
              </div>
            </div>
            
            {/* Distribution Preview */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="12" strokeDasharray="163" strokeDashoffset="57" />
                    <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--secondary))" strokeWidth="12" strokeDasharray="163" strokeDashoffset="130" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">200</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" />Care Workers</span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-secondary" />Office Staff</span>
                  <span className="font-medium">76</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Reports */}
          <div className="showcase-card group p-6 bg-card rounded-2xl border border-border hover:shadow-card-hover transition-all">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Automated Reports</h3>
                <p className="text-muted-foreground text-sm">
                  Generate compliance reports, timesheets, and invoices automatically.
                </p>
              </div>
            </div>
            
            {/* Report Preview */}
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="space-y-3">
                {[
                  { name: "Weekly Timesheet", status: "Ready", type: "primary" },
                  { name: "Compliance Report", status: "Generating", type: "secondary" },
                  { name: "Payroll Summary", status: "Ready", type: "primary" },
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-card rounded-lg">
                    <span className="text-sm font-medium">{report.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      report.status === "Ready" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
