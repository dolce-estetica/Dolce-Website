import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { treatmentPages, getTreatment } from "@/lib/data/treatment-pages";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return treatmentPages.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  return {
    title: `${t.name} | Dolce Estetica — Doctor-Led, Transparent Pricing`,
    description: t.directAnswer.slice(0, 155),
    alternates: { canonical: `/treatments/${t.slug}` },
  };
}

export default async function TreatmentPage({ params }: Props) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi Dolce Estetica, I'd like a consultation for ${t.name}.`
  )}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t.name,
    description: t.directAnswer,
    howPerformed: t.steps.map((s) => s.text).join(" "),
    provider: { "@type": "MedicalClinic", name: site.name, url: "https://dolceestetica.com" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <p className="text-sm font-semibold tracking-widest text-dolce-bronze uppercase">
        <Link href="/treatments" className="hover:underline">Treatments</Link> / {t.name}
      </p>
      <h1 className="mt-2 font-serif text-4xl text-dolce-ink sm:text-5xl">{t.heroTitle}</h1>
      <p className="mt-4 max-w-2xl text-lg text-gray-600">{t.heroSub}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={wa} target="_blank" rel="noopener noreferrer"
          className="rounded-full bg-dolce-green px-6 py-3 font-semibold text-white shadow-lg hover:bg-dolce-bronze">
          Book a Consultation on WhatsApp
        </a>
        <a href={site.phoneHref}
          className="rounded-full border border-dolce-green/40 px-6 py-3 font-semibold text-dolce-green hover:bg-dolce-green/5">
          Call {site.phone}
        </a>
      </div>

      {/* TRUST STRIP */}
      <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-dolce-green/5 p-6 text-center sm:grid-cols-4">
        <div><p className="font-serif text-2xl text-dolce-green">Doctor-led</p><p className="text-xs text-gray-600 uppercase tracking-wide">every treatment</p></div>
        <div><p className="font-serif text-2xl text-dolce-green">4 clinics</p><p className="text-xs text-gray-600 uppercase tracking-wide">South India</p></div>
        <div><p className="font-serif text-2xl text-dolce-green">4.6★</p><p className="text-xs text-gray-600 uppercase tracking-wide">Google rating</p></div>
        <div><p className="font-serif text-2xl text-dolce-green">Transparent</p><p className="text-xs text-gray-600 uppercase tracking-wide">pricing & advice</p></div>
      </div>

      {/* DIRECT ANSWER (AEO) */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">What is {t.name.toLowerCase()}?</h2>
        <p className="mt-3 text-gray-700">{t.directAnswer}</p>
      </section>

      {/* CANDIDACY */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-xl text-dolce-ink">This is for you if…</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            {t.forWhom.map((x) => <li key={x} className="flex gap-2"><span className="text-dolce-green">✓</span>{x}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-xl text-dolce-ink">We assess first</h2>
          <ul className="mt-3 space-y-2 text-gray-700">
            {t.notFor.map((x) => <li key={x} className="flex gap-2"><span className="text-dolce-bronze">•</span>{x}</li>)}
          </ul>
          <p className="mt-3 text-sm text-gray-500">Your consultation screens all of this — honestly.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">How it works</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {t.steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-gray-50 p-5">
              <p className="font-serif text-3xl text-dolce-bronze">{i + 1}</p>
              <h3 className="mt-1 font-semibold text-dolce-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS FRAMING */}
      <section className="mt-12 rounded-2xl border-l-4 border-dolce-green bg-dolce-green/5 p-6">
        <h2 className="font-serif text-xl text-dolce-ink">What results to expect — honestly</h2>
        <p className="mt-2 text-gray-700">{t.results}</p>
      </section>

      {/* PRICING */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">Transparent pricing</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.pricing.map((p) => (
            <div key={p.label} className="rounded-2xl border border-gray-100 p-5 text-center">
              <p className="text-sm text-gray-600">{p.label}</p>
              <p className="mt-1 font-serif text-2xl text-dolce-green">{p.price}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-500">{t.pricingNote}</p>
      </section>

      {/* FAQS */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">Your questions, answered</h2>
        <div className="mt-4 space-y-3">
          {t.faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-gray-100 p-4">
              <summary className="cursor-pointer font-semibold text-dolce-ink marker:content-none">
                {f.q}
              </summary>
              <p className="mt-2 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CLINICS + FINAL CTA */}
      <section className="mt-12 rounded-2xl bg-dolce-green p-8 text-center text-white">
        <h2 className="font-serif text-2xl">Available at all Dolce Estetica clinics</h2>
        <p className="mt-2 text-white/80">
          {locations.map((l) => l.city).join(" · ")}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-white px-6 py-3 font-semibold text-dolce-green hover:bg-dolce-bronze hover:text-white">
            Book Your Consultation
          </a>
          <Link href="/booking" className="rounded-full border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">
            Booking Form
          </Link>
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="font-serif text-xl text-dolce-ink">Related treatments</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {t.related.map((slug2) => {
            const r = getTreatment(slug2);
            if (!r) return null;
            return (
              <Link key={slug2} href={`/treatments/${slug2}`}
                className="rounded-full border border-dolce-green/30 px-4 py-2 text-sm font-medium text-dolce-green hover:bg-dolce-green hover:text-white">
                {r.name}
              </Link>
            );
          })}
        </div>
      </section>

      <p className="mt-12 text-xs text-gray-400">
        This page is for information only and is not medical advice. Individual results vary.
        All treatments follow consultation with a qualified practitioner.
      </p>
    </main>
  );
}
