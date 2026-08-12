import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TreatmentsSection from "@/components/home/TreatmentsSection";
import FaqPreview from "@/components/home/FaqPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StructuredData from "@/components/shared/StructuredData";

export default function Home() {
  return (
    <main>
      <StructuredData />
      {/*
        The brand promise is baked into the hero video, so the page had no
        readable heading at all. This gives crawlers and screen readers a real
        H1 without putting a second headline on top of the artwork.
      */}
      <h1 className="sr-only">
        Dolce Estetica — doctor-led aesthetic medicine, wellness and longevity clinics in India
      </h1>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-50">
          <TopBar />
          <Navbar variant="transparent" />
        </div>
        <HeroSection />
      </div>
      <TreatmentsSection />
      <FaqPreview />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
