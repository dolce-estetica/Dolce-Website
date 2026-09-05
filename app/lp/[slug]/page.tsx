import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LandingHero from "@/components/landing/LandingHero";
import LandingImpact from "@/components/landing/LandingImpact";
import LandingWhy from "@/components/landing/LandingWhy";
import LandingServices from "@/components/landing/LandingServices";
import LandingDoctors from "@/components/landing/LandingDoctors";
import LandingResults from "@/components/landing/LandingResults";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingLeadForm from "@/components/landing/LandingLeadForm";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingCtaBand from "@/components/landing/LandingCtaBand";
import LandingStickyCta from "@/components/landing/LandingStickyCta";
import { getLandingPage, landingBrandNames, landingPages } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * GOOGLE ADS LANDING PAGES — /lp/<slug>.
 *
 * One data-driven template renders all seven pages from the client's
 * "Dolce Ads Landing Page Structure" sheet (6 Dolce + 1 MedLounges) with the
 * required structure: banner → impact numbers → why choose us → services →
 * doctors → before/after → testimonials → lead form → FAQ, sticky Book Now
 * CTA and CTAs between sections.
 *
 * Deliberately NOT listed in the sitemap — same policy as
 * /hair-fall-consultation: ad landing pages stay out of the SEO surface.
 */
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://dolceestetica.com/lp/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://dolceestetica.com/lp/${page.slug}`,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
    },
  };
}

export default async function LandingPageRoute({ params }: Props) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  const brandName = landingBrandNames[page.brand];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": page.brand === "medlounges" ? "SurgicalProcedure" : "MedicalProcedure",
    name: `${page.name} — ${brandName}`,
    description: page.metaDescription,
    provider: {
      "@type": "MedicalClinic",
      name: brandName,
      url: "https://dolceestetica.com",
      telephone: site.phone,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Navbar variant="solid" />

      {/* 1 — Banner with service-specific heading & subheading */}
      <LandingHero page={page} />

      {/* 2 — USPs / impact numbers */}
      <LandingImpact page={page} />

      {/* 3 — Why choose us */}
      <LandingWhy page={page} />

      {/* 4 — Services offered */}
      <LandingServices page={page} />

      {/* CTA between sections */}
      <LandingCtaBand
        title={`Considering ${page.name.toLowerCase()}?`}
        text="Book a consultation and leave with a diagnosis, a plan and the complete, itemised cost — no obligation to proceed."
      />

      {/* 5 — Our doctors */}
      <LandingDoctors page={page} />

      {/* 6 — Before / after */}
      <LandingResults page={page} />

      {/* 7 — Testimonials */}
      <LandingTestimonials page={page} />

      {/* CTA between sections */}
      <LandingCtaBand
        title="Your consultation is one step away."
        text={`Talk to the doctor, understand your options, and decide in your own time. ${brandName} — ${site.phone}.`}
      />

      {/* 8 — Lead form "Book Consultation" */}
      <LandingLeadForm page={page} />

      {/* 9 — FAQ */}
      <LandingFaq page={page} />

      <p className="mx-auto max-w-6xl px-4 pb-12 text-xs leading-relaxed text-gray-400 sm:px-6">
        This page is general information, not medical advice. Individual assessment, candidacy
        and outcomes vary; every recommendation happens only at an in-person consultation with
        a qualified doctor.
      </p>

      <Footer />

      {/* Sticky Book Now CTA — required by the landing page structure sheet */}
      <LandingStickyCta label={`Book your ${page.name.toLowerCase()} consultation`} />
    </main>
  );
}
