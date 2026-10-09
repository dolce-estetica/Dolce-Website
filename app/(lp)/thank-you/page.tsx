import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import LeadConversion from "@/components/analytics/LeadConversion";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { getLandingPage, landingBrandNames } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * LEAD THANK-YOU PAGE — /thank-you?p=<landing-page-slug>.
 *
 * Conversion destination for all seven ad landing pages: the lead form
 * redirects here instead of showing an inline message, so GTM records a
 * clean pageview on a dedicated URL (marketing sets the conversion trigger
 * on this path). The GTM container arrives via the root layout, exactly as
 * on the landing pages.
 *
 * The ?p= slug personalises the WhatsApp opt-in button with the right brand
 * and treatment (server-rendered — no client storage, no hydration timing).
 * Without it (or with an unknown slug) the button simply doesn't render.
 *
 * Generic copy on purpose: one page serves every campaign, so no procedure
 * names, promises or outcome claims (same compliance reasoning as the hair
 * LP). noindex — a conversion URL has no organic business ranking.
 */

export const metadata: Metadata = {
  title: "Request received",
  description:
    "Your consultation request has been received. Our team will call you back within 2 hours to confirm your appointment at the clinic you prefer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://dolceestetica.com/thank-you" },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const eventId = (await headers()).get("x-dolce-lead-event");
  const page = p ? getLandingPage(p) : undefined;

  const waLink = page
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
        `Hello ${landingBrandNames[page.brand]}, I just requested a ${page.name.toLowerCase()} consultation online.`,
      )}`
    : null;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {eventId && <LeadConversion eventId={eventId} />}
      <section className="flex flex-1 items-center justify-center bg-white px-4 py-20 text-center text-dolce-green sm:px-6">
        <div className="mx-auto max-w-2xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-dolce-green/5">
            <CheckCircle2 className="h-9 w-9 text-dolce-green" aria-hidden />
          </span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            Request received.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Thank you. Our team will call you back within 2 hours to confirm
            your consultation at the clinic you prefer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {waLink && (
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-dolce-green px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-dolce-green-light"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden />
                Continue on WhatsApp
              </a>
            )}
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-dolce-green px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-dolce-green-light"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden />
              Call {site.phone}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-dolce-green/20 px-8 py-4 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-green/5"
            >
              Back to homepage
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-md text-xs leading-relaxed text-gray-500">
            Your details are used only to arrange this consultation.
          </p>
        </div>
      </section>
    </main>
  );
}
