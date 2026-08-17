import type { NextConfig } from "next";

/** Folders under `public/` that hold versioned-by-hand artwork rather than code. */
const ASSET_DIRS = ["assets", "bgs", "gallery", "team", "treatments"];

const nextConfig: NextConfig = {
  images: {
    // AVIF first: it lands roughly 30% under WebP on these photographic assets, and every
    // browser that misses it falls through to WebP.
    formats: ["image/avif", "image/webp"],
    // The masters change rarely; keep optimised variants around instead of re-encoding.
    minimumCacheTTL: 60 * 60 * 24 * 30,
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
