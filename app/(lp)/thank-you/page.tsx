import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import LeadConversion from "@/components/analytics/LeadConversion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { InstagramIcon } from "@/components/shared/BrandIcons";
import { site } from "@/lib/site";

/**
 * LEAD THANK-YOU PAGE — /thank-you?p=<landing-page-slug>.
 *
 * Shared confirmation for campaign, contact and booking forms. The proxy
 * requires and consumes a signed CRM receipt; LeadConversion emits the single
 * generate_lead event. A pageview alone must not count as a conversion.
 * Visitors stay on this confirmation until they choose to explore Instagram
 * or the website. There is no automatic onward redirect.
 */

export const metadata: Metadata = {
  title: "Thank You | Dolce Estetica",
  description:
    "We have received your request! We will reach out within 2 hours to personalize your experience and confirm your appointment.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://dolceestetica.com/thank-you" },
};

export default async function ThankYouPage() {
  const eventId = (await headers()).get("x-dolce-lead-event");

  return (
    <div className="flex min-h-svh flex-col bg-[#F8F8F4] text-dolce-green">
      {eventId && <LeadConversion eventId={eventId} />}
      <header className="flex justify-center px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3 sm:pt-8 sm:pb-6">
        <Image
          src="/assets/logo.webp"
          alt={site.name}
          width={400}
          height={148}
          preload
          className="lp-brand-logo h-9 w-auto sm:h-12"
        />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-1 sm:px-8 sm:py-4">
        <section
          aria-labelledby="confirmation-heading"
          className="flex w-full max-w-[420px] flex-col items-center rounded-3xl border border-[#E4E7DD] bg-white px-4 py-6 text-center shadow-[0_12px_48px_-24px_rgba(28,56,22,0.16)] sm:max-w-[720px] sm:px-8 sm:py-12 md:px-12"
        >
          <span className="flex size-12 items-center justify-center rounded-full border border-[#DCE5D5] bg-[#F1F5ED] sm:size-16">
            <Check className="size-6 sm:size-8" strokeWidth={1.6} aria-hidden />
          </span>
          <h1
            id="confirmation-heading"
            className="mt-5 max-w-[560px] font-display text-[clamp(1.5rem,6.7vw,1.875rem)] leading-[1.25] font-medium tracking-[-0.035em] sm:mt-6 sm:text-[2.5rem]"
          >
            Thank You for Choosing Dolce Estetica!
          </h1>
          <p className="mt-4 text-[15px] leading-6 font-medium sm:mt-5 sm:text-base sm:leading-7">
            We have received your request!
          </p>
          <p className="mt-2 max-w-[460px] text-[15px] leading-6 text-[#626B5E] sm:text-base sm:leading-7">
            We will reach out <strong className="font-semibold text-dolce-green">within 2 hours</strong> to
            personalize your experience and confirm your appointment.
          </p>

          <div className="mt-6 w-full border-t border-[#E8EBE3] pt-5 sm:mt-9 sm:pt-8">
            <h2 className="text-[13px] leading-6 font-normal text-[#626B5E] sm:text-sm">
              Explore Dolce Estetica while you wait:
            </h2>
            <nav aria-label="Explore Dolce Estetica" className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-13 items-center justify-center gap-2.5 rounded-xl bg-dolce-green px-4 py-3.5 text-sm font-medium text-white transition-colors hover:bg-dolce-green-light"
              >
                <InstagramIcon className="size-[18px] shrink-0" />
                Follow us on Instagram
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link
                href="/"
                className="flex min-h-13 items-center justify-center gap-2.5 rounded-xl border border-[#DCE2D6] px-4 py-3.5 text-sm font-medium transition-colors hover:bg-[#F5F7F1]"
              >
                Visit Our Website
                <ArrowRight className="size-4 shrink-0" aria-hidden />
              </Link>
            </nav>
          </div>
        </section>
      </main>

      <footer className="px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-[11px] leading-5 tracking-[0.14em] text-[#72796C] uppercase sm:pt-6">
        {site.tagline}
      </footer>
    </div>
  );
}
