import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AboutUs from "@/components/landing/AboutUs";
import Features from "@/components/landing/Features";
import StreamlineOperations from "@/components/landing/StreamlineOperations";
import WorkflowTabs from "@/components/landing/WorkflowTabs";
import FeatureSteps from "@/components/landing/FeatureSteps";
import BentoFeatures from "@/components/landing/BentoFeatures";
import FloatingElements from "@/components/landing/FloatingElements";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Benefits from "@/components/landing/Benefits";
import Indicators from "@/components/landing/Indicators";
import HowItWorks from "@/components/landing/HowItWorks";
import DarkFeatures from "@/components/landing/DarkFeatures";
import CareWorkerApp from "@/components/landing/CareWorkerApp";
import FreeTrial from "@/components/landing/FreeTrial";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import useSmoothScroll from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Features />
        <StreamlineOperations />
        <WorkflowTabs />
        <FeatureSteps />
        <BentoFeatures />
        <FloatingElements />
        <DashboardPreview />
        <Benefits />
        <Indicators />
        <HowItWorks />
        <DarkFeatures />
        <CareWorkerApp />
        <FreeTrial />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
