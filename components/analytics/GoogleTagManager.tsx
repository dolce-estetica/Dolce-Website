import { site } from "@/lib/site";

/**
 * @next/third-parties supplies the JavaScript loader, but no noscript fallback.
 * Keep this as the first authored body child for browsers without JavaScript.
 * Next.js may still insert its metadata wrapper before it in the rendered HTML.
 */
export function GoogleTagManagerNoscript() {
  const id = site.gtmContainerId;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
