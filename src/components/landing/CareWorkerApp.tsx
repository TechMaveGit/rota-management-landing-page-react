import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

import taskScreen from "@/assets/app-screens/task-screen.png";
import onboardingScreen from "@/assets/app-screens/onboarding-screen.png";
import homeScreen from "@/assets/app-screens/home-screen.png";

gsap.registerPlugin(ScrollTrigger);

const appScreens = [
  { id: 1, image: onboardingScreen, title: "Welcome & Onboarding", description: "Beautiful onboarding experience for new care workers" },
  { id: 2, image: homeScreen, title: "Home Dashboard", description: "Quick overview of tasks, schedules, and notifications" },
  { id: 3, image: taskScreen, title: "Task Management", description: "Track clock-in times, tasks, and care notes" },
  { id: 4, image: homeScreen, title: "Schedule View", description: "View and manage your weekly schedule" },
  { id: 5, image: taskScreen, title: "Client Details", description: "Access important client information and care plans" },
];

const CareWorkerApp = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
        carouselRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: carouselRef.current,
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
      className="pt-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      <div className="container relative">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4 flex-wrap justify-center">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold">Say hello to</span>
            <span className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-xs text-primary font-medium uppercase tracking-wider">New</span>
            </span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">Care Worker App</span>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Empower your care workers with instant access to schedules, shift swaps, 
            time tracking, and team communication — all from their pocket.
          </p>
          <Button size="lg" className="rounded-full px-8 gap-2">
            Get Early Access <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Phone Carousel */}
        <div ref={carouselRef} className="relative max-w-5xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {appScreens.map((screen, index) => (
                <CarouselItem key={screen.id} className="pl-2 md:pl-4 basis-[70%] sm:basis-1/2 md:basis-1/3 lg:basis-[30%]">
                  <div 
                    className={`transition-all duration-300 ${
                      current === index 
                        ? "scale-100 opacity-100" 
                        : "scale-90 opacity-60"
                    }`}
                  >
                    {/* Phone Frame */}
                    <div className="relative bg-foreground rounded-[2.5rem] p-2 shadow-2xl mx-auto max-w-[240px]">
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-5 bg-foreground rounded-full z-10"></div>
                      <div className="rounded-[2rem] overflow-hidden bg-background">
                        <img 
                          src={screen.image} 
                          alt={screen.title} 
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-border"
                onClick={() => api?.scrollPrev()}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {appScreens.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      current === index
                        ? "w-8 h-2 bg-primary"
                        : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-border"
                onClick={() => api?.scrollNext()}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Carousel>

          {/* Current Screen Info */}
          {/* <div className="text-center mt-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {appScreens[current]?.title}
            </h3>
            <p className="text-muted-foreground">
              {appScreens[current]?.description}
            </p>
          </div> */}
        </div>

        {/* Gradient fade at bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" /> */}
      </div>
    </section>
  );
};

export default CareWorkerApp;
