import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import LeadConversion from "@/components/analytics/LeadConversion";
import { ArrowLeft, ArrowUpRight, Check, Clock3, Phone, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/BrandIcons";
import { getLandingPage, landingBrandNames } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * LEAD THANK-YOU PAGE — /thank-you?p=<landing-page-slug>.
 *
 * Shared confirmation for campaign, contact and booking forms. The proxy
 * requires and consumes a signed CRM receipt; LeadConversion emits the single
 * generate_lead event. A pageview alone must not count as a conversion.
 * The optional campaign slug personalises the WhatsApp message. Other forms
 * use a generic message without putting contact details in the URL.
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

  const waMessage = page
    ? `Hello ${landingBrandNames[page.brand]}, I just requested a ${page.name.toLowerCase()} consultation online.`
    : `Hello ${site.name}, I just submitted an enquiry on your website.`;
  const waLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="flex min-h-svh flex-col bg-[#F6F7F3] text-dolce-green">
      {eventId && <LeadConversion eventId={eventId} />}
      <header className="border-b border-dolce-green/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="shrink-0 rounded-sm">
            <Image
              src="/assets/logo.webp"
              alt="Dolce Estetica"
              width={400}
              height={148}
              preload
              className="lp-brand-logo h-10 w-auto sm:h-11"
            />
          </div>
          <p className="hidden text-sm text-dolce-green/65 sm:block">{site.tagline}</p>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:py-6">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-dolce-green/10 bg-white shadow-[0_16px_64px_-32px_rgba(28,56,22,0.3)] lg:grid-cols-[1.15fr_1fr]">
          <section aria-labelledby="confirmation-heading" className="flex flex-col items-start p-6 sm:p-10 lg:py-8">
            <span className="flex size-16 items-center justify-center rounded-full border border-dolce-green/10 bg-[#EDF3E9]">
              <Check className="size-8" strokeWidth={1.8} aria-hidden />
            </span>
            <p className="mt-6 text-xs font-bold tracking-[0.18em] text-dolce-moss uppercase">Request received</p>
            <h1 id="confirmation-heading" className="mt-3 max-w-md font-display text-[2rem] leading-[1.15] font-semibold tracking-tight sm:text-[2.75rem]">
              Thank you for reaching out.
            </h1>
            <p className="mt-5 max-w-sm text-base leading-7 text-gray-600">
              We’ve received your request. Our team will help you take the next
              step and arrange your consultation.
            </p>

            <div className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-[#E3E8DF] bg-[#F6F7F3] p-4">
              <Clock3 className="size-6 shrink-0 text-dolce-moss" aria-hidden />
              <div>
                <p className="text-sm text-gray-600">Expect a call from our team</p>
                <p className="mt-1 font-display text-lg font-semibold">Within 2 hours</p>
              </div>
            </div>

            <p className="mt-6 flex max-w-sm items-start gap-2.5 text-xs leading-5 text-gray-500">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-dolce-moss" aria-hidden />
              Your details are used only to arrange this consultation.
            </p>
          </section>

          <aside aria-labelledby="next-steps-heading" className="flex flex-col bg-dolce-green p-6 text-white sm:p-10 lg:py-8">
            <h2 id="next-steps-heading" className="font-display text-xl font-semibold sm:text-2xl">What happens next?</h2>
            <ol className="mt-7 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-[#E6D3AD]" aria-hidden>01</span>
                <div>
                  <h3 className="text-sm leading-6 font-semibold">We’ll give you a call</h3>
                  <p className="mt-1 text-sm leading-6 text-white/75">Our team will contact you on the number you shared.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-[#E6D3AD]" aria-hidden>02</span>
                <div>
                  <h3 className="text-sm leading-6 font-semibold">Confirm your consultation</h3>
                  <p className="mt-1 text-sm leading-6 text-white/75">We’ll help arrange your appointment at the clinic you prefer.</p>
                </div>
              </li>
            </ol>

            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-sm text-white/75">Prefer to speak with us now?</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#E6D3AD] px-4 py-3.5 text-center text-sm font-semibold text-dolce-green transition-colors hover:bg-[#F0E2C9] focus-visible:!outline-[#E6D3AD]"
              >
                <WhatsAppIcon className="size-5 shrink-0" />
                Continue on WhatsApp
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              </a>
              <a
                href={site.phoneHref}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/30 px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:!outline-[#E6D3AD]"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                Call {site.phone}
              </a>
            </div>
          </aside>
        </div>
        <Link href="/" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-dolce-green/75 transition-colors hover:text-dolce-green sm:mt-6">
          <ArrowLeft className="size-4" aria-hidden />
          Back to homepage
        </Link>
      </main>

      <footer className="px-5 pt-2 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center text-xs leading-5 text-gray-500">
        {site.name} · {site.tagline}
      </footer>
    </div>
  );
}
