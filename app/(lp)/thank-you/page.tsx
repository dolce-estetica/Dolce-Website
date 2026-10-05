import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

/**
 * LEAD THANK-YOU PAGE — /thank-you.
 *
 * Conversion destination for all seven ad landing pages: the lead form
 * redirects here instead of showing an inline message, so GTM records a
 * clean pageview on a dedicated URL (marketing sets the conversion trigger
 * on this path). The GTM container arrives via the root layout, exactly as
 * on the landing pages.
 *
 * Generic copy on purpose: one page serves every campaign, so no procedure
 * names, promises or brand claims (same compliance reasoning as the hair
 * LP). noindex — a conversion URL has no organic business ranking.
 */

export const metadata: Metadata = {
  title: "Request received",
  description:
    "Your consultation request has been received. Our team will call you back within 2 hours to confirm your appointment at the clinic you prefer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://dolceestetica.com/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="flex flex-1 items-center justify-center bg-dolce-green px-4 py-20 text-center text-white sm:px-6">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <CheckCircle2 className="h-9 w-9 text-dolce-sand" aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Request received.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Thank you. Our team will call you back within 2 hours to confirm
            your consultation at the clinic you prefer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Call {site.phone}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Back to homepage
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-white/60">
            Your details are used only to arrange this consultation.
          </p>
        </div>
      </section>
    </main>
  );
}
