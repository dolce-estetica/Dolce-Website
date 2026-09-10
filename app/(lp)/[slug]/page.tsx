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

  const brandName = landingBrandNames[page.brand];
  const pageUrl = `https://dolceestetica.com/${page.slug}`;
  const imageUrl = `https://dolceestetica.com${page.hero.image}`;
  const keywords = [
    page.name,
    ...page.services.items.map((item) => item.name),
    "Kochi",
    "Cherthala",
    "Calicut",
    "Mangalore",
    "South India",
    "Doctor Led",
    brandName,
  ];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords,
    alternates: { canonical: pageUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: pageUrl,
      siteName: brandName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [imageUrl],
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
  const pageUrl = `https://dolceestetica.com/${page.slug}`;

  // 1. MedicalWebPage Schema
  const medicalWebPageSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.metaTitle,
    description: page.metaDescription,
    aspect: ["Overview", "Diagnosis", "Treatment", "Results", "FAQ"],
    medicalAudience: "Patient",
    specialty: page.slug === "vaser-liposuction" ? "PlasticSurgery" : "Dermatology",
    about: page.services.items.map((s) => ({
      "@type": "MedicalThing",
      name: s.name,
      description: s.text,
    })),
    reviewedBy: {
      "@type": "MedicalOrganization",
      name: brandName,
      url: "https://dolceestetica.com",
    },
  };

  // 2. MedicalProcedure / SurgicalProcedure Schema
  const procedureSchema = {
    "@context": "https://schema.org",
    "@type": page.brand === "medlounges" ? "SurgicalProcedure" : "MedicalProcedure",
    name: `${page.name} at ${brandName}`,
    description: page.metaDescription,
    bodyLocation:
      page.slug === "hair-treatment"
        ? "Scalp"
        : page.slug === "laser-hair-removal"
        ? "Full Body"
        : "Skin",
    procedureType: page.brand === "medlounges" ? "SurgicalProcedure" : "NonInvasiveProcedure",
    provider: {
      "@type": "MedicalClinic",
      name: brandName,
      url: "https://dolceestetica.com",
      telephone: site.phone,
    },
  };

  // 3. BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dolceestetica.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.name,
        item: pageUrl,
      },
    ],
  };

  // 4. MedicalClinic Multi-Location & Aggregate Rating Schema
  const clinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://dolceestetica.com/#organization",
    name: brandName,
    url: "https://dolceestetica.com",
    telephone: site.phone,
    image: `https://dolceestetica.com${page.hero.image}`,
    medicalSpecialty:
      page.slug === "vaser-liposuction"
        ? ["PlasticSurgery", "Dermatology"]
        : ["Dermatology", "Cosmetology"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      reviewCount: "15000",
      bestRating: "5",
      worstRating: "1",
    },
    department: [
      {
        "@type": "MedicalClinic",
        name: `${brandName} - Edapally, Kochi`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
      },
      {
        "@type": "MedicalClinic",
        name: `${brandName} - Cherthala`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cherthala",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
      },
      {
        "@type": "MedicalClinic",
        name: `${brandName} - Calicut`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kozhikode",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
      },
      {
        "@type": "MedicalClinic",
        name: `${brandName} - Mangalore`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mangalore",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
    ],
  };

  // 5. FAQPage Schema
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(procedureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* The unique per-page design — all nine required sections inside */}
      <Design page={page} />

      <LandingFooter />
    </main>
  );
}
