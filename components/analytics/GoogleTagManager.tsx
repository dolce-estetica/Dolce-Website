import { site } from "@/lib/site";

/**
 * Keep Google's bootstrap at the very start of the server-rendered <head>.
 * React places generated metadata and resources before ordinary head children,
 * so write this trusted, static snippet as the head's initial HTML instead.
 * Next.js still adds and manages the page's metadata and resources after it.
 * The bootstrap loads the GTM container async.
 * Both snippets are production-only to keep `next dev` traffic out of tracking.
 * GA4 tags and navigation tracking must be configured in the GTM container.
 */
export function getGoogleTagManagerHeadHtml() {
  const id = site.gtmContainerId;
  if (!id || process.env.NODE_ENV !== "production") return undefined;

  return {
    __html: `<!-- Google Tag Manager -->
<script id="gtm-init">(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');</script>
<!-- End Google Tag Manager -->`,
  };
}

/** Render immediately after the root <body> opening tag. */
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
