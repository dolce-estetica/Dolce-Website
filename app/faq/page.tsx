import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaqBrowser from "./FaqBrowser";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Dolce Estetica",
  description:
    "Transparent answers about Botox, fillers, lasers, peels, microneedling, skin boosters and aftercare at Dolce Estetica.",
};

export default function FaqPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans">
      <Navbar variant="solid" />

      <section className="bg-white px-4 pt-10 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dolce-green transition-colors hover:text-dolce-bronze"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>

          <h1 className="mt-8 mb-4 text-center font-sans text-3xl font-bold text-dolce-ink sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
            Find transparent answers to all your questions about our aesthetic treatments.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10 pb-20 sm:px-6 sm:pb-32">
        <FaqBrowser />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 sm:pb-32">
        <div className="rounded-[2rem] bg-dolce-green px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mb-6 font-sans text-3xl leading-tight font-bold text-white sm:text-4xl md:text-5xl">
            Still have questions?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Our expert medical team is here to guide you. Book a consultation today and start your
            journey to radiant skin.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/booking"
              className="w-full rounded-full bg-white px-8 py-4 text-center text-base font-bold text-dolce-green transition-all hover:bg-dolce-sand sm:w-auto"
            >
              Book Free Consultation
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Message Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
