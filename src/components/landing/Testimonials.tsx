import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import person1 from "@/assets/testimonials/person-1.jpg";
import person2 from "@/assets/testimonials/person-2.jpg";
import person3 from "@/assets/testimonials/person-3.jpg";
import person4 from "@/assets/testimonials/person-4.jpg";
import person5 from "@/assets/testimonials/person-5.jpg";
import person6 from "@/assets/testimonials/person-6.jpg";
import person7 from "@/assets/testimonials/person-7.jpg";
import person8 from "@/assets/testimonials/person-8.jpg";

gsap.registerPlugin(ScrollTrigger);

const testimonialPhotos = [
  // Left column
  { id: 1, image: person1, className: "w-20 h-28 md:w-24 md:h-32 -rotate-3", gridArea: "1 / 1 / 2 / 2" },
  { id: 2, image: person2, className: "w-16 h-20 md:w-20 md:h-24 rotate-2", gridArea: "2 / 1 / 3 / 2" },
  
  // Second column
  { id: 3, image: person3, className: "w-24 h-32 md:w-28 md:h-40 rotate-1", gridArea: "1 / 2 / 3 / 3" },
  
  // Third column
  { id: 4, image: person4, className: "w-20 h-28 md:w-24 md:h-32 -rotate-2", gridArea: "1 / 3 / 2 / 4" },
  { id: 5, image: person5, className: "w-18 h-24 md:w-22 md:h-28 rotate-3", gridArea: "2 / 3 / 3 / 4" },
  
  // Center column (taller)
  { id: 6, image: person6, className: "w-28 h-36 md:w-32 md:h-44 -rotate-1", gridArea: "1 / 4 / 3 / 5" },
  
  // Fifth column
  { id: 7, image: person7, className: "w-24 h-32 md:w-28 md:h-40 rotate-2", gridArea: "1 / 5 / 3 / 6" },
  
  // Sixth column
  { id: 8, image: person8, className: "w-20 h-28 md:w-24 md:h-32 -rotate-3", gridArea: "1 / 6 / 2 / 7" },
  { id: 9, image: person1, className: "w-16 h-20 md:w-20 md:h-24 rotate-1", gridArea: "2 / 6 / 3 / 7" },
  
  // Right column
  { id: 10, image: person3, className: "w-24 h-32 md:w-28 md:h-40 -rotate-2", gridArea: "1 / 7 / 3 / 8" },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-photo",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          scrollTrigger: {
            trigger: photosRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-background overflow-hidden">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div ref={photosRef} className="mx-auto w-full max-w-2xl">
          <div
            className="grid justify-items-center gap-3 md:gap-4"
            style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gridTemplateRows: "repeat(2, auto)" }}
          >
            {testimonialPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`testimonial-photo overflow-hidden rounded-2xl border border-border bg-card shadow-card ${photo.className}`}
                style={{ gridArea: photo.gridArea }}
              >
                <img src={photo.image} alt="Customer" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div ref={contentRef} className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Testimonials</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Trusted by teams running complex care schedules
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Agencies and care providers use RotaFlow to simplify shift planning, reduce manual work, and keep
            every team member on the same page.
          </p>
          <Button className="mt-8 shadow-button">
            Read Success Stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
