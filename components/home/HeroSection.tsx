"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import LocationsMenu from "@/components/layout/LocationsMenu";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/shared/BrandIcons";
import { site } from "@/lib/site";

const slides = ["video", "/bgs/bg-frame-1.png", "/bgs/bg-frame-2.png"] as const;

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/booking?q=${encodeURIComponent(query.trim())}` : "/booking");
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={slide}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide === "video" ? (
              <video
                src="/bgs/bg-video.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/bgs/bg-frame-1.png"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-top sm:object-center"
              />
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-40 sm:px-8 sm:pt-36 sm:pb-32 md:px-12">
          <form
            onSubmit={search}
            className="flex w-full max-w-2xl flex-col items-center gap-4 sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-white/20 sm:bg-white/10 sm:p-2 sm:shadow-2xl sm:backdrop-blur-xl"
          >
            <div className="relative flex w-full items-center rounded-full border border-white/20 bg-white/10 px-5 py-3.5 backdrop-blur-md sm:border-none sm:bg-transparent sm:px-6 sm:py-2 sm:backdrop-blur-none">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Share your concerns..."
                aria-label="Share your concerns"
                autoComplete="off"
                className="w-full bg-transparent text-base font-medium text-white placeholder-white/60 selection:bg-white/30 outline-none"
              />
              <button
                type="submit"
                aria-label="Search"
                className="group/search flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dolce-sand/40 bg-dolce-sand/20 transition-all duration-300 hover:bg-dolce-sand hover:text-dolce-green"
              >
                <Search className="h-5 w-5 text-white transition-colors group-hover/search:text-dolce-green" />
              </button>
            </div>
            <a href="/booking" className="w-full sm:w-auto">
              <span className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold whitespace-nowrap text-dolce-green shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#f0f0f0] hover:shadow-xl active:scale-95 sm:py-3">
                Book Now
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </form>

          <div className="mt-6 flex w-full max-w-2xl justify-center sm:w-auto">
            <LocationsMenu tone="hero" />
          </div>
        </div>

        <div className="absolute right-4 bottom-4 flex items-center gap-4 rounded-full border-2 border-white/10 bg-white/20 px-4 py-3 backdrop-blur-md sm:right-8 sm:bottom-8 sm:px-6 lg:px-10 lg:py-6">
          <a
            href={site.social.facebook}
            aria-label="Facebook"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <FacebookIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
          <a
            href={site.social.twitter}
            aria-label="X"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <XIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
          <a
            href={site.social.instagram}
            aria-label="Instagram"
            className="text-white transition-colors hover:text-dolce-sand active:scale-90"
          >
            <InstagramIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
