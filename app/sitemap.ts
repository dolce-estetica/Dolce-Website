import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data/blog";
import { landingPages } from "@/lib/data/landing-pages";
import { locations } from "@/lib/data/locations";
import { treatmentPages } from "@/lib/data/treatment-pages";

const BASE = "https://dolceestetica.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/treatments",
    "/clinics",
    "/longevity",
    "/booking",
    "/blog",
    "/faq",
    "/contact",
    "/event-and-media",
    "/career",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const treatmentRoutes = treatmentPages.map((t) => ({
    url: `${BASE}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const clinicRoutes = locations.map((l) => ({
    url: `${BASE}/clinics/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // The 7 Google-Ads landing pages: indexed (robots meta says so) and now a
  // discovery channel beyond paid — nothing else links to them internally.
  const landingRoutes = landingPages.map((p) => ({
    url: `${BASE}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...clinicRoutes, ...blogRoutes, ...landingRoutes];
}
