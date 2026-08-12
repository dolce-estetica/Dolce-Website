import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TreatmentsSection from "@/components/home/TreatmentsSection";
import FaqPreview from "@/components/home/FaqPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <main>
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
