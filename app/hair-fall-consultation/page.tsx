import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";

/**
 * DEDICATED GOOGLE ADS LANDING PAGE — HAIR.
 *
 * Google's healthcare policy prohibits ads for PRP and similar regenerative
 * treatments, and Google scans the LANDING PAGE, not just the ad. This page
 * therefore contains NO mention of PRP, GFC, exosomes or any specific hair
 * procedure — it sells exactly one thing: a doctor consultation for hair fall.
 *
 * DO NOT add procedure names, product names, prices, outcome promises or
 * before/after imagery to this page. Do not link it to the PRP/GFC treatment
 * page. Baldness is a scheduled condition under the DMR Act 1954: this page
 * must stay assessment-framed — no cure or regrowth claims, ever.
 */

export const metadata: Metadata = {
  title: "Hair Fall — Doctor Consultation | Dolce Estetica",
  description:
    "Hair fall has many causes — thyroid, iron levels, post-delivery changes and hereditary patterns all look similar. A doctor-led consultation finds yours before anything is suggested. Clinics at Edapally (Kochi), Cherthala, Calicut and Mangalore.",
  alternates: { canonical: "https://dolceestetica.com/hair-fall-consultation" },
};

const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  "Hi Dolce Estetica, I would like to book a hair fall consultation with the doctor."
)}`;

export default function HairFallConsultationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <section className="bg-dolce-green py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="mb-3 text-xs font-bold tracking-[0.25em] text-dolce-sand uppercase">
            Doctor-led · All four clinics
          </p>
          <h1 className="font-serif text-3xl font-bold sm:text-5xl">
            Hair fall? Find the cause before you spend on the fix.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Thyroid changes, low iron, post-delivery shedding and hereditary patterns all look
            identical in the mirror — and each needs a completely different plan. A consultation
            with our doctor starts with finding yours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
            >
              Book a Consultation on WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
          What happens at the consultation
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {[
            ["The doctor examines your scalp and pattern", "And takes a full history — how long, how fast, what else has changed, what runs in the family."],
            ["Blood investigations where indicated", "Thyroid function, iron studies and other internal causes produce hair fall that looks identical to hereditary loss. Treating the scalp while an internal cause continues rarely works."],
            ["An honest answer", "Some hair fall settles on its own — post-delivery shedding usually does. If that is your situation, we will say so rather than sell you a course."],
            ["A plan, only after a diagnosis", "Whatever the doctor recommends is explained openly at the consultation, with the full cost itemised before anything begins."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-dolce-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-l-4 border-dolce-bronze bg-dolce-sand/20 p-6">
          <p className="text-base leading-relaxed text-gray-700">
            <strong>Why we lead with a consultation, not a treatment:</strong> hair responds over
            months, not weeks, and no responsible clinic promises regrowth before knowing the
            cause. The consultation is where that honesty starts.
          </p>
        </div>

        <h2 className="mt-12 font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
          Our clinics
        </h2>
        <p className="mt-3 text-gray-700">
          Edapally (Kochi) · Cherthala · Calicut · Mangalore — consultations by appointment.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-dolce-green px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-dolce-bronze"
          >
            Book on WhatsApp
          </a>
          <Link
            href="/booking"
            className="inline-flex items-center justify-center rounded-full border border-dolce-green/30 px-8 py-4 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-green/5"
          >
            Booking Form
          </Link>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-gray-400">
          This page is general information, not medical advice. Hair fall has multiple causes and
          outcomes differ between individuals; assessment and any recommendation happen only at an
          in-person consultation with a qualified doctor.
        </p>
      </section>

      <Footer />
    </main>
  );
}
