import { Plus_Jakarta_Sans } from "next/font/google";

/**
 * Ad landing pages use a modern geometric sans (Plus Jakarta Sans) for
 * headings instead of the main site's Playfair serif — the client asked for
 * a simpler, more contemporary feel on /lp. Variable font: one file per
 * style covers the whole weight range.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return <div className={jakarta.variable}>{children}</div>;
}
