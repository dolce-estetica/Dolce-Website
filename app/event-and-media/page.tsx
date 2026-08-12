import type { Metadata } from "next";
import Image from "next/image";
import { Play } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { events } from "@/lib/data/treatments";

export const metadata: Metadata = {
  title: "Event & Media | Dolce Estetica",
  description:
    "Capturing the beauty of our practice and the science of transformation — gallery and upcoming events.",
};

const gallery = [
  { src: "/gallery/brand-story.png", alt: "Brand Story" },
  { src: "/gallery/clinic-excellence.jpg", alt: "Clinic Excellence" },
  { src: "/gallery/aesthetic-art.jpg", alt: "Aesthetic Art" },
  { src: "/gallery/results-showcase.jpg", alt: "Results Showcase" },
];

export default function EventAndMediaPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section className="w-full bg-white py-12 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="mb-4 font-serif text-4xl font-bold text-dolce-green sm:text-5xl lg:text-7xl">
            Media &amp; Gallery
          </h1>
          <p className="mb-10 text-gray-500 lg:mb-12 lg:text-lg">
            Capturing the beauty of our practice and the science of transformation.
          </p>

          <div className="mb-10 flex justify-center lg:mb-16">
            <span className="flex items-center gap-3 rounded-full border border-gray-200 px-8 py-3 text-xs font-bold tracking-widest text-dolce-green uppercase sm:text-sm">
              Brand Highlights
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
            {gallery.map((item) => (
              <div
                key={item.src}
                className="group relative aspect-square overflow-hidden rounded-[1.5rem] bg-gray-100 shadow-md transition-all hover:-translate-y-2 hover:shadow-xl sm:rounded-[2rem]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="rounded-full bg-white/20 p-4 backdrop-blur-md">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 lg:mt-16">
            <span className="border-b border-dolce-bronze/30 pb-1 text-xs font-bold tracking-[0.2em] text-dolce-bronze uppercase transition-all hover:border-dolce-bronze sm:text-sm">
              View Full Archive
            </span>
          </div>
        </div>
      </section>

      <section className="w-full bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-dolce-green sm:text-4xl lg:mb-12 lg:text-6xl">
            Events
          </h2>

          <div className="mx-auto w-full space-y-12 lg:space-y-20">
            {events.map((event) => (
              <article
                key={event.id}
                className="group overflow-hidden rounded-[1.5rem] bg-white shadow-[0_15px_50px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:rounded-[2.5rem]"
              >
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={1600}
                    height={900}
                    className="block h-auto w-full transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="p-6 text-center sm:p-10 lg:p-16">
                  <h3 className="mb-5 font-serif text-2xl font-bold text-dolce-green sm:text-3xl lg:text-5xl">
                    {event.title}
                  </h3>
                  <p className="mx-auto max-w-4xl text-sm leading-relaxed text-gray-600 sm:text-base lg:text-xl">
                    {event.description}
                  </p>
                  <a
                    href="/contact"
                    className="mt-8 inline-block rounded-full bg-dolce-green px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase transition-all hover:-translate-y-1 hover:bg-dolce-bronze hover:shadow-xl sm:px-12 sm:py-5 sm:text-sm lg:mt-12"
                  >
                    Register Interest
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
