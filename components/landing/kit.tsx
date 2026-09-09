import { BadgeCheck, MapPin, Phone, Star } from "lucide-react";
import { LANDING_TESTIMONIALS, landingPages } from "@/lib/data/landing-pages";
import type { Review } from "@/lib/data/reviews";
import { PAGE_REVIEWS } from "@/lib/data/landing-reviews";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";
import GoogleReviewCard from "@/components/shared/GoogleReviewCard";

/**
 * Shared primitives for the seven UNIQUE landing-page designs in
 * components/landing/designs/. Each design renders the same nine required
 * sections from the client's Excel, but with its own layout system — these
 * are the pieces that must NOT diverge: the real doctor roster, the real
 * Google reviews, the lead-form aside, and the medical disclaimer.
 */

/**
 * The two doctors every landing page features — real people, real portraits.
 * Credentials are the verifiable ones only (degrees, council registrations,
 * documented trainings and memberships); nothing invented or inflated.
 */
export const LP_DOCTORS = [
  {
    name: "Dr Joseph Thomas",
    role: "Founder & Medical Director, Medlounges",
    image: "/team/Joseph.webp",
    degrees: ["MBBS", "FAM — Aesthetic Medicine", "Exec. MBA, Hospital Management"],
    credentials: [
      "Fellowship trained under Dr. Rajesh Vasu (Plastic & Reconstructive Surgery), Continental Hospitals",
      "Advanced Injectables, Institute of Medical Aesthetics, Dubai",
      "Member, American Academy of Anti-ageing Medicine",
    ],
  },
  {
    name: "Dr Amritha Suresan",
    role: "Head of Clinic Operations & Training",
    image: "/team/Amrutha.webp",
    degrees: ["BDS", "MBA Candidate"],
    credentials: [
      "AJ Institute of Dental Sciences",
      "Kerala Dental Council Reg. No. 30370",
      "Dental & aesthetic-medicine training operations",
    ],
  },
] as const;

/** Star row collapsed into one aria-labelled image. */
export function Stars({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

/**
 * The real Google reviews from lib/data/reviews.ts, rotated by page so the
 * seven landing pages do not read identically. Never invent reviews.
 */
export function rotatedReviews(slug: string): Review[] {
  const pageReviews = PAGE_REVIEWS[slug];
  if (pageReviews) return pageReviews;
  const offset = Math.max(0, landingPages.findIndex((p) => p.slug === slug));
  return [...LANDING_TESTIMONIALS.slice(offset), ...LANDING_TESTIMONIALS.slice(0, offset)];
}

/** Google-review link line shown under every testimonials section. */
export function ReviewsFootnote({ dark = false }: { dark?: boolean }) {
  return (
    <p className={`mt-8 text-center text-sm ${dark ? "text-white/50" : "text-gray-500"}`}>
      Reviews are patients&apos; own words about their experience; individual experiences and
      outcomes differ.{" "}
      <a
        href={site.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-semibold underline underline-offset-2 ${dark ? "text-dolce-sand hover:text-white" : "text-dolce-green hover:text-dolce-bronze"
          }`}
      >
        Read all reviews on Google
      </a>
    </p>
  );
}

/** A single Google-review card box, matching the root page ("What Our Clients Say") item design. */
export function ReviewCard({
  review,
}: {
  review: Review;
  dark?: boolean;
  editorial?: boolean;
}) {
  return <GoogleReviewCard review={review} className="w-full flex-1" />;
}

/**
 * The "fast alternatives + where we are" aside that sits beside the lead
 * form. One component, two tones — the seven designs place it differently.
 */
export function LeadAside({ dark = false }: { dark?: boolean }) {
  return (
    <div className="space-y-6">
      <div
        className={`rounded-3xl p-7 sm:p-8 ${dark ? "border border-white/15 bg-white/5" : "bg-dolce-green text-white"
          }`}
      >
        <h3 className="text-lg font-bold sm:text-xl">In a hurry?</h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-white/70" : "text-white/75"}`}>
          Reach us directly, our front desk answers during clinic hours.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={site.phoneHref}
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-colors ${dark
                ? "bg-white text-dolce-green hover:bg-dolce-sand"
                : "bg-white text-dolce-green hover:bg-dolce-sand"
              }`}
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-bold transition-colors ${dark
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-white/30 text-white hover:bg-white/10"
              }`}
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>

      <div
        className={`rounded-3xl p-7 sm:p-8 ${dark ? "border border-white/10 bg-white/5" : "border border-gray-100 bg-white shadow-sm"
          }`}
      >
        <h3
          className={`flex items-center gap-2 text-lg font-bold sm:text-xl ${dark ? "text-white" : "text-dolce-green"
            }`}
        >
          <MapPin className="h-5 w-5" />
          Our clinics
        </h3>
        <ul className="mt-4 space-y-3">
          {locations.map((loc) => (
            <li key={loc.slug} className="flex items-start justify-between gap-3 text-sm">
              <span>
                <span
                  className={`block font-semibold ${dark ? "text-white" : "text-dolce-ink"}`}
                >
                  {loc.city}
                </span>
                <span className={`text-xs ${dark ? "text-white/50" : "text-gray-500"}`}>
                  {loc.state}
                </span>
              </span>
              <a
                href={site.phoneHref}
                className={`shrink-0 text-xs font-semibold hover:underline ${dark ? "text-dolce-sand" : "text-dolce-bronze"
                  }`}
              >
                {loc.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** The medical disclaimer every LP ends with, before the footer. */
export const LP_DISCLAIMER =
  "This page is general information, not medical advice. Individual assessment, candidacy and outcomes vary; every recommendation happens only at an in-person consultation with a qualified doctor.";
