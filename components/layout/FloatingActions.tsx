"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { landingPages } from "@/lib/data/landing-pages";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";

/** Call + WhatsApp shortcuts pinned to the bottom-right on every page. */
export default function FloatingActions() {
  const pathname = usePathname();

  // Ad landing pages (now at top-level /<slug>) carry their own sticky Book
  // Now bar; the global floating shortcuts would crowd it there.
  if (pathname.startsWith("/lp") || landingPages.some((p) => `/${p.slug}` === pathname)) {
    return null;
  }

  return (
    // Sits above the hero's social pill rather than on top of it.
    <div className="fixed right-4 bottom-28 z-[150] flex flex-col gap-3 sm:right-6 sm:bottom-32 sm:gap-4">
      <a
        href={site.phoneHref}
        title="Call Us Now"
        aria-label="Call us now"
        className="group relative flex items-center justify-center rounded-full border border-gray-100 bg-white p-3.5 text-dolce-green shadow-2xl transition-all hover:bg-dolce-bronze hover:text-white sm:p-4"
      >
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-dolce-green/5 opacity-20" />
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="pointer-events-none absolute right-full mr-4 hidden rounded-lg bg-dolce-green px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 lg:block">
          Instant Call
        </span>
      </a>
      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center rounded-full bg-dolce-green p-3.5 text-white shadow-2xl transition-all hover:bg-dolce-bronze hover:text-dolce-green sm:p-4"
      >
        <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full bg-dolce-bronze/20" />
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="pointer-events-none absolute right-full mr-4 hidden rounded-lg bg-dolce-green px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase opacity-0 transition-opacity group-hover:opacity-100 lg:block">
          WhatsApp Chat
        </span>
      </a>
    </div>
  );
}
