import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { longevityPillars, longevitySteps } from "@/lib/data/longevity";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Longevity & Wellness | Dolce Estetica",
  description:
    "Doctor-led longevity and wellness care at Dolce Estetica — consultation first, physician-supervised programmes, and a written plan before you commit to anything.",
  alternates: { canonical: "/longevity" },
};

export default function LongevityPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      {/* Hero — same deep green / bronze eyebrow / Playfair language as About */}
      <section className="relative w-full overflow-hidden bg-dolce-green py-16 text-white sm:py-20 lg:py-28">
        <div className="pointer-events-none absolute -top-24 -right-24 hidden h-[400px] w-[400px] rounded-full border-[50px] border-dolce-sand opacity-10 sm:block" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.4em] text-dolce-sand uppercase sm:tracking-[0.5em]">
            Aesthetic Medicine · Wellness · Longevity
          </span>
          <h1 className="mb-6 font-serif text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Care measured in decades, not appointments
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed font-light text-white/80 sm:text-xl">
            Longevity at Dolce Estetica is not a single treatment. It is a doctor-led relationship
            built on assessment, an honest plan, and reviews over time — so the way you age is
            something you shape rather than something that happens to you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/booking"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-dolce-green transition-all hover:bg-dolce-sand sm:w-auto"
            >
              Book a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={site.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" />
              Speak to the clinic
            </a>
          </div>
        </div>
      </section>

      {/* What it means */}
      <section className="w-full bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <span className="mb-4 block text-[10px] font-bold tracking-[0.4em] text-dolce-bronze uppercase">
            The Long View
          </span>
          <h2 className="mb-8 font-serif text-3xl leading-tight font-bold text-dolce-green sm:text-4xl lg:text-5xl">
            Consultation first. Always.
          </h2>
          <div className="space-y-6 text-lg leading-relaxed font-light text-dolce-green/90">
            <p>
              Most people arrive with a specific concern — skin, hair, weight, energy. What they
              usually want underneath it is to feel like themselves for longer. That is a different
              question, and it deserves a different conversation.
            </p>
            <p>
              So we start by listening. A doctor reviews your history and concerns, tells you what is
              worth doing and in what order, and puts it in writing with the cost attached. You are
              free to take that plan away and think about it. Nothing is booked in the room.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="w-full bg-white pb-14 sm:pb-20">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-24">
          <h2 className="mb-10 font-serif text-3xl leading-tight font-bold text-dolce-green sm:text-4xl lg:mb-14 lg:text-6xl">
            Where we focus
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            {longevityPillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group flex flex-col rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl sm:p-8"
              >
                <h3 className="font-serif text-xl font-bold text-dolce-green transition-colors group-hover:text-dolce-bronze sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {pillar.summary}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed text-gray-600">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-dolce-bronze" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 h-px w-8 bg-dolce-bronze/30 transition-all duration-500 group-hover:w-full group-hover:bg-dolce-bronze" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-24">
          <h2 className="mb-10 font-serif text-3xl leading-tight font-bold text-dolce-green sm:text-4xl lg:mb-14 lg:text-6xl">
            How it works
          </h2>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {longevitySteps.map((step) => (
              <div key={step.step}>
                <span className="font-serif text-5xl font-bold text-dolce-bronze/25 sm:text-6xl">
                  {step.step}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-dolce-green sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-[2rem] bg-dolce-green px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="mb-5 font-serif text-3xl leading-tight font-bold text-white sm:text-4xl">
            Start with a conversation
          </h2>
          <p className="mx-auto mb-9 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            No commitment, no pressure. Meet a doctor, ask your questions, and leave with a plan you
            can read.
          </p>
          <Link
            href="/booking"
            className="inline-block rounded-full bg-white px-8 py-4 text-base font-bold text-dolce-green transition-all hover:bg-dolce-sand"
          >
            Book a consultation
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
