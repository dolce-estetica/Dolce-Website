import { locations } from "@/lib/data/locations";
import { faqs } from "@/lib/data/faqs";
import { site } from "@/lib/site";

/**
 * JSON-LD for the home page. The previous (Vite) site shipped a MedicalClinic
 * block; this restores it and adds FAQPage, which is what earns the expanded
 * question results in Google.
 */
export default function StructuredData() {
  const clinic = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.name,
    url: "https://dolceestetica.com",
    description:
      "Doctor-led aesthetic medicine, wellness and longevity clinics in India. Non-surgical facial rejuvenation, laser treatments, body contouring, physician-supervised weight management and hair wellness.",
    medicalSpecialty: "Dermatology",
    telephone: site.phone,
    email: site.email,
    areaServed: [...new Set(locations.map((l) => l.state))],
    location: locations.map((l) => ({
      "@type": "MedicalClinic",
      name: `${site.name} — ${l.city}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: l.address,
        addressLocality: l.city,
        addressRegion: l.state,
        addressCountry: "IN",
      },
      telephone: l.phone,
    })),
    sameAs: [
      "https://www.facebook.com/dolceesteticaclinic/",
      "https://www.instagram.com/dolceesteticaclinic/",
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinic) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
