import { site } from "@/lib/site";

/** Google's loader runs in the head, once per document, on every production route. */
export function GoogleTagManagerScript() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    // Use the requested immediate head snippet instead of the library's after-hydration loader.
    // eslint-disable-next-line @next/next/next-script-for-ga
    <script
      id="dolce-gtm"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmContainerId}');`,
      }}
    />
  );
}

/** First authored body child, for browsers with JavaScript disabled. */
export function GoogleTagManagerNoscript() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${site.gtmContainerId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
