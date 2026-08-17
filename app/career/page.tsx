import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobList from "./JobList";

export const metadata: Metadata = {
  title: "Careers | Dolce Estetica",
  description: "Join the Dolce Estetica team — open clinical, administrative and marketing roles.",
};

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section className="relative w-full overflow-hidden bg-white py-12 lg:py-24">
        <div className="absolute top-0 -left-32 hidden h-[400px] w-[400px] rounded-full border-[60px] border-[#d4ddd4] opacity-40 sm:block lg:-left-48 lg:h-[600px] lg:w-[600px] lg:border-[80px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="min-w-0 flex-1">
              <h1 className="mb-8 font-serif text-4xl font-bold text-dolce-ink italic sm:text-5xl lg:mb-12 lg:text-7xl">
                Let&apos;s Build the
                <br />
                Future Together
              </h1>

              <JobList />
            </div>

            <div className="relative hidden lg:block lg:w-[45%]">
              <div className="relative">
                <div className="absolute -right-8 -bottom-8 h-full w-full bg-dolce-green" />
                <div className="absolute -right-4 -bottom-4 h-full w-full bg-dolce-green/70" />
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-2xl">
                  <Image
                    src="/assets/career.webp"
                    alt="Careers at Dolce Estetica"
                    fill
                    sizes="45vw"
                    className="object-cover brightness-90 grayscale transition-all duration-1000 hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dolce-green/40 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
