import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations } from "@/lib/data/locations";
import { treatmentPages } from "@/lib/data/treatment-pages";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) return {};
  // Where a clinic trades under a second name, both names go in the title and
  // description. Patients search the name on the door; Google needs the two
  // names associated with one address or it treats them as separate businesses.
  const title = l.operatingAs
    ? `Dolce Estetica ${l.city} (${l.operatingAs}) | Aesthetic & Wellness Clinic`
    : `Dolce Estetica ${l.city} | Aesthetic & Wellness Clinic`;
  const description = l.operatingAs
    ? `Dolce Estetica ${l.city}, operating as ${l.operatingAs} — doctor-led skin, hair, body and wellness care. ${l.address}. Book a consultation: ${l.phone}.`
    : `Dolce Estetica ${l.city}: doctor-led skin, hair, body and wellness care. ${l.address}. Book a consultation: ${l.phone}.`;

  return {
    title,
    description,
    alternates: { canonical: `/clinics/${l.slug}` },
  };
}

export default async function ClinicPage({ params }: Props) {
  const { slug } = await params;
  const l = locations.find((x) => x.slug === slug);
  if (!l) notFound();

  const wa = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi Dolce Estetica, I'd like to book a consultation at your ${l.city} clinic.`
  )}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `${site.name} — ${l.city}`,
    ...(l.operatingAs ? { alternateName: l.operatingAs } : {}),
    url: `https://dolceestetica.com/clinics/${l.slug}`,
    telephone: l.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: l.address,
      addressLocality: l.city,
      addressRegion: l.state,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
    hasMap: l.mapsLink,
    medicalSpecialty: "Dermatology",
    ...(l.rating
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: l.rating.value, reviewCount: l.rating.count } }
      : {}),
    parentOrganization: {
      "@type": "Organization",
      name: "Dolce Estetica",
      url: "https://dolceestetica.com",
    },
    sameAs: [
      "https://www.facebook.com/dolceesteticaclinic/",
      "https://www.instagram.com/dolceesteticaclinic/",
      ...(l.operatingAs ? ["https://medlounges.com"] : []),
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <p className="text-sm font-semibold tracking-widest text-dolce-bronze uppercase">
        <Link href="/clinics" className="hover:underline">Clinics</Link> / {l.city}
      </p>
      <h1 className="mt-2 font-serif text-4xl text-dolce-ink sm:text-5xl">
        Dolce Estetica {l.city}
      </h1>
      {l.operatingAs && (
        <p className="mt-2 text-base font-semibold text-dolce-bronze">
          Operating as {l.operatingAs}
        </p>
      )}
      <p className="mt-4 max-w-2xl text-lg text-gray-600">
        Doctor-led aesthetic medicine, wellness and longevity care in {l.city} — consultations first,
        honest advice, and the standards Dolce Estetica is known for.
        {l.note ? ` ${l.note}.` : ""}
      </p>

      {l.operatingNote && (
        <aside className="mt-6 max-w-2xl rounded-2xl border-l-4 border-dolce-bronze bg-dolce-sand/20 p-5">
          <p className="text-base leading-relaxed text-gray-700">{l.operatingNote}</p>
        </aside>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 p-6">
          <h2 className="font-serif text-xl text-dolce-ink">Visit us</h2>
          {l.operatingAs && (
            <p className="mt-3 font-semibold text-dolce-ink">{l.operatingAs}</p>
          )}
          <p className="mt-3 text-gray-700">{l.address}</p>
          {l.landmark && <p className="mt-1 text-sm text-gray-500">{l.landmark}</p>}
          <p className="mt-4">
            <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="font-semibold text-dolce-green hover:underline">
              {l.phone}
            </a>
            {l.altPhones?.map((p) => (
              <span key={p}>
                {" · "}
                <a href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold text-dolce-green hover:underline">{p}</a>
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm text-gray-500">Consultations by appointment — call or WhatsApp us.</p>
          {l.rating && (
            <p className="mt-3 text-sm font-semibold text-dolce-bronze">★ {l.rating.value} on Google · {l.rating.count} reviews</p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer"
              className="rounded-full bg-dolce-green px-5 py-2.5 font-semibold text-white hover:bg-dolce-bronze">
              WhatsApp this clinic
            </a>
            <a href={l.mapsLink} target="_blank" rel="noopener noreferrer"
              className="rounded-full border border-dolce-green/40 px-5 py-2.5 font-semibold text-dolce-green hover:bg-dolce-green/5">
              Get Directions
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-100">
          <iframe
            src={l.mapUrl}
            title={`Map — Dolce Estetica ${l.city}`}
            className="h-full min-h-[280px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">Treatments at {l.city}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {treatmentPages.map((t) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`}
              className="rounded-xl border border-gray-100 p-4 text-sm font-medium text-dolce-ink hover:border-dolce-green hover:text-dolce-green">
              {t.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-dolce-ink">Common questions — {l.city}</h2>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border border-gray-100 p-4">
            <summary className="cursor-pointer font-semibold text-dolce-ink">Do I need an appointment?</summary>
            <p className="mt-2 text-gray-600">We recommend booking ahead — call {l.phone} or WhatsApp us and the team will confirm your slot, usually the same day.</p>
          </details>
          <details className="rounded-xl border border-gray-100 p-4">
            <summary className="cursor-pointer font-semibold text-dolce-ink">Is the first consultation with a doctor?</summary>
            <p className="mt-2 text-gray-600">Yes. Every treatment journey at Dolce Estetica starts with a qualified doctor's assessment — that is a brand rule, in every city.</p>
          </details>
          <details className="rounded-xl border border-gray-100 p-4">
            <summary className="cursor-pointer font-semibold text-dolce-ink">Which payment options are available?</summary>
            <p className="mt-2 text-gray-600">Cards, UPI and EMI options for packages. Ask the front desk about current EMI partners.</p>
          </details>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-dolce-green p-8 text-center text-white">
        <h2 className="font-serif text-2xl">Ready when you are</h2>
        <p className="mt-2 text-white/80">Book a consultation at {l.city} — it starts with a conversation, not a commitment.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-white px-6 py-3 font-semibold text-dolce-green hover:bg-dolce-bronze hover:text-white">
            Book on WhatsApp
          </a>
          <Link href="/booking" className="rounded-full border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">
            Booking Form
          </Link>
        </div>
      </section>
    </main>
  );
}
