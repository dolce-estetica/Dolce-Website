import Script from "next/script";
import { site } from "@/lib/site";

/**
 * GA4 via `next/script` rather than raw <script> tags.
 *
 * `afterInteractive` runs the tag once the page is interactive, so it never competes with
 * the first paint or delays hydration — but it still fires early enough to record the
 * pageview for real visitors. (`lazyOnload` would shave a little more off the Lighthouse
 * score but waits for window load, which loses fast bounces from the report.)
 *
 * Only mounted in production builds, so local `next dev` traffic stays out of the property.
 * `next start` sets NODE_ENV=production, so a local production run does include it — which
 * is what you want when measuring the real cost of the tag.
 *
 * GA4 enhanced measurement picks up App Router client-side navigations from History API
 * changes, so no extra route-change listener is needed here.
 */
export default function GoogleAnalytics() {
  const id = site.gaMeasurementId;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
