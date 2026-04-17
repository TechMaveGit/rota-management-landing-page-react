import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How long does it take to set up RotaFlow?",
    answer: "Most teams are up and running within 24 hours. Our onboarding process includes importing your existing staff data, setting up shift templates, and configuring your locations. We provide dedicated support to ensure a smooth transition from your current system."
  },
  {
    question: "Can staff access their schedules on mobile?",
    answer: "Yes! RotaFlow includes a fully-featured mobile app for iOS and Android. Staff can view their schedules, clock in/out with GPS verification, request time off, swap shifts with colleagues, and receive instant notifications about schedule changes."
  },
  {
    question: "How does the automatic shift assignment work?",
    answer: "Our intelligent scheduling algorithm considers multiple factors: staff availability, qualifications, contracted hours, preferences, and location requirements. You set the rules, and RotaFlow suggests optimal assignments. You always have full control to make manual adjustments."
  },
  {
    question: "Does RotaFlow integrate with payroll systems?",
    answer: "Absolutely. RotaFlow integrates with popular payroll providers including Xero, QuickBooks, Sage, and ADP. We automatically calculate hours, overtime, and generate accurate timesheets that sync directly with your payroll system."
  },
  {
    question: "What happens if I need to make last-minute schedule changes?",
    answer: "RotaFlow makes last-minute changes easy. Update the schedule and all affected staff receive instant notifications. You can also broadcast open shifts to available staff and let them claim shifts directly from the app."
  },
  {
    question: "Is there a limit to how many staff or locations I can manage?",
    answer: "No limits on staff or locations. Our plans are designed to scale with your business. Whether you're managing 10 staff at one location or 1,000+ across multiple sites, RotaFlow handles it seamlessly."
  },
  {
    question: "How secure is my data with RotaFlow?",
    answer: "Security is our priority. We use bank-level 256-bit SSL encryption, GDPR-compliant data handling, and regular security audits. Your data is hosted on secure cloud servers with 99.9% uptime guarantee and automatic daily backups."
  },
  {
    question: "Can I try RotaFlow before committing?",
    answer: "Yes! We offer a 14-day free trial with full access to all features. No credit card required. Our team is available to give you a personalized demo and answer any questions during your trial period."
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
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
        ".faq-accordion",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".faq-accordion",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="faq-header text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about RotaFlow. Can't find the answer you're looking for? 
            Reach out to our support team.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-accordion max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a 
            href="#contact" 
            className="text-primary font-semibold hover:underline"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
