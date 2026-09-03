import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/layout/FloatingActions";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

/**
 * Both families are variable fonts. Pinning explicit weights made next/font download a
 * separate static file per weight — 4 for Inter and 8 for Playfair (weights x styles),
 * all preloaded on every page. Omitting `weight` ships one variable file per style
 * instead, which covers the whole range in less bytes than two of the statics.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  // Nothing above the fold is set in Playfair — the hero and every section heading use
  // Inter. Preloading both styles put ~86KB of serif ahead of the first paint on mobile
  // for text that only appears further down the page.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dolceestetica.com"),
  title: "Dolce Estetica | Aesthetics & Wellness Clinic",
  description:
    "Experience the pinnacle of aesthetic care at Dolce Estetica. We specialize in non-surgical facial rejuvenation, body contouring, and holistic wellness treatments.",
  keywords: ["Aesthetics", "Wellness", "Botox", "Fillers", "Skin Care", "Dolce Estetica"],
  authors: [{ name: "Dolce Estetica" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Dolce Estetica | Aesthetics & Wellness Clinic",
    description:
      "Premium aesthetic treatments and wellness services designed to reveal your natural beauty.",
    url: "https://dolceestetica.com",
    siteName: "Dolce Estetica",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolce Estetica | Aesthetics & Wellness Clinic",
    description: "Premium aesthetic treatments and wellness services.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1C3816",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <FloatingActions />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
