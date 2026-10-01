import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google Tag Manager via `next/script`, replacing the hardcoded gtag.js snippet.
 *
 * GA4 (and any other tags) are configured inside the GTM container, so loading
 * gtag.js directly here as well would double-count every pageview.
 *
 * `afterInteractive` loads the container once the page is interactive, so it never
 * competes with first paint or delays hydration — but still fires early enough to
 * record the pageview for real visitors. Kept consistent with the trade-off the
 * old GoogleAnalytics component documented (vs `lazyOnload`, which loses fast bounces).
 *
 * Only mounted in production builds, so local `next dev` traffic stays out of the
 * container. App Router client-side navigations are picked up by GTM's History API
 * listener, so no route-change tracking is needed here.
 */
export default function GoogleTagManager() {
  const id = site.gtmContainerId;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`}
      </Script>
    </>
  );
}
