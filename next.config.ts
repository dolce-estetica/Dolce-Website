import type { NextConfig } from "next";

/** Folders under `public/` that hold versioned-by-hand artwork rather than code. */
const ASSET_DIRS = ["assets", "bgs", "gallery", "team", "treatments"];

/** The 7 Google-Ads landing pages live at top-level paths; /lp/<slug> 301s to them. */
const LP_SLUGS = [
  "dermatology-clinic",
  "hair-treatment",
  "laser-hair-removal",
  "skin-treatments",
  "hydrafacial",
  "glutathione-treatment",
  "vaser-liposuction",
];

const nextConfig: NextConfig = {



  async redirects() {
    return LP_SLUGS.map((slug) => ({
      source: `/lp/${slug}`,
      destination: `/${slug}`,
      permanent: true,
    }));
  },

  images: {
    // AVIF first: it lands roughly 30% under WebP on these photographic assets, and every
    // browser that misses it falls through to WebP.
    formats: ["image/avif", "image/webp"],
    // The masters change rarely; keep optimised variants around instead of re-encoding.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },


  async rewrites() {
    // Dolce Findesk (finance approval desk) runs on Railway and is served under /findesk
    return [
      { source: '/findesk', destination: 'https://dolce-findesk-production.up.railway.app/findesk' },
      { source: '/findesk/:path*', destination: 'https://dolce-findesk-production.up.railway.app/findesk/:path*' },
    ];
  },

  async headers() {
    return [
      {
        // Files in `public/` are served with no caching by default, so every repeat visit
        // re-downloaded the whole hero. These names are stable, so cache them for a month
        // and let the browser revalidate in the background after that.
        source: `/:dir(${ASSET_DIRS.join("|")})/:path*`,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
