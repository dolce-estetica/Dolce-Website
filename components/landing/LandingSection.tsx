import type { ReactNode } from "react";

/** Section heading used across every landing page — eyebrow, serif title, optional sub. */
export default function LandingHeading({
  eyebrow,
  title,
  sub,
  tone = "light",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold tracking-[0.25em] uppercase ${
            isDark ? "text-dolce-sand" : "text-dolce-bronze"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-dolce-green"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-white/80" : "text-gray-600"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/** Thin wrapper that gives every landing section the same rhythm. */
export function LandingSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-4 px-4 py-16 sm:px-6 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
