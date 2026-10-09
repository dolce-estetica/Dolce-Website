import "./landing.css";
import type { Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";

/**
 * Android Chrome (108+) resizes the layout viewport when the keyboard opens
 * (resizes-content), so the fixed bottom bar and booking sheet sit above the
 * keyboard natively. iOS Safari ignores this flag and handles focused-field
 * scrolling itself; the booking sheet does not override keyboard movement.
 */
export const viewport: Viewport = {
  interactiveWidget: "resizes-content",
  themeColor: "#ffffff",
};

/**
 * Ad landing pages use a modern geometric sans (Plus Jakarta Sans) for
 * headings instead of the main site's Playfair serif — the client asked for
 * a simpler, more contemporary feel on the ad landing pages. Variable font: one file per
 * style covers the whole weight range.
 *
 * Lora is the optional editorial accent (italic pull-quotes, serif display
 * words) kept for editorial accents if a design asks for one. Not preloaded: nothing above the fold depends on it.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lp-theme ${jakarta.variable} ${lora.variable}`}>
      {children}
    </div>
  );
}
