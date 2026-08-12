import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/layout/FloatingActions";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
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
      </body>
    </html>
  );
}
