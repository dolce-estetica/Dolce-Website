import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import LandingFooter from "@/components/landing/LandingFooter";
import LandingTemplate from "@/components/landing/designs/LandingTemplate";
import { getLandingPage, landingBrandNames, landingPages, type LandingPage } from "@/lib/data/landing-pages";
import { site } from "@/lib/site";

/**
 * GOOGLE ADS LANDING PAGES — /<slug> (top-level).
 *
 * One row of the client's "Dolce Ads Landing Page Structure" sheet = one route. ALL SEVEN pages share one template: an exact structural copy of the
 * client's reference site (bodycraftclinics.com) in our own colours, content
 * and photos — tinted hero with serif headline, city links, arch photo and
 * rotating badge → stat band → service cards → deals reel → "Why You'll
 * Adore" icons → Step 01/02/03 → results → reviews → doctors → FAQ → booking
 * band → sticky bar. Per-page themes keep each page's accent identity:
 *
 *   dermatology-clinic  sage    dermatology hub, moss on soft green
 *   hair-treatment      amber   root-cause hair care, warm bronze
 *   laser-hair-removal  mint    LIGHT theme (the old dark studio is retired)
 * All nine Excel sections + anchors (#book #why #services #doctors #results
 * #testimonials #faq) are present on every page. Deliberately NOT listed in
 * the sitemap — same policy as /hair-fall-consultation.
 */
const DESIGNS: Record<string, ComponentType<{ page: LandingPage }>> = Object.fromEntries(
  landingPages.map((p) => [p.slug, LandingTemplate]),
);

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

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
    alternates: { canonical: `https://dolceestetica.com/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://dolceestetica.com/${page.slug}`,
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

  const Design = DESIGNS[page.slug];
  if (!Design) notFound();

  const brandName = landingBrandNames[page.brand];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": page.brand === "medlounges" ? "SurgicalProcedure" : "MedicalProcedure",
    name: `${page.name}, ${brandName}`,
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
    <main className="flex min-h-screen flex-col bg-white pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* The unique per-page design — all nine required sections inside */}
      <Design page={page} />

      <LandingFooter />
    </main>
  );
}
