# Search Console GTM placement fix

Google rejected the installed `GTM-WSLPLPK8` container because the production homepage began with a Next.js metadata wrapper before the noscript:

```html
<body class="…"><div hidden=""><!--$--><!--/$--></div><noscript>…</noscript>
```

The GTM loader was already in the head, and the published container returned HTTP 200. The placement requirement is stricter than the requirement for JavaScript tracking to load. [Google permits only whitespace/comments before the body noscript](https://support.google.com/webmasters/answer/9008080?hl=en#google_tag_manager).

The versioned Bun patch changes only Next 16.3.0's streaming metadata wrapper from a hidden div to a Fragment, in both ESM and CommonJS distributions. The root layout, GTM ID, head loader, iframe, metadata boundary and Suspense behavior remain intact. The resulting body begins:

```html
<body class="…"><!--$--><!--/$--><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WSLPLPK8" …></iframe></noscript>
```

`bun install --frozen-lockfile` applies the recorded dependency patch. Builds now fail if the actual prerendered HTML violates GTM placement, duplicates the iframe/loader, or loses its title. The framework's emergency global-error document, which does not use the site's root layout, is excluded.

## Pre-deployment checks

- Production build: 48 routes generated; placement checks passed on all 39 prerendered site HTML documents.
- Frozen-lockfile install, changed-file ESLint, TypeScript and whitespace checks passed.
- 18 request checks passed: six routes, each with browser, Google verification and Googlebot user agents. Includes the dynamic booking route.
- 15 browser checks passed: six routes at phone and desktop widths; real GTM script returned 200 and initialized once on each page; root noscript first; head title, description and canonical present; no horizontal overflow or browser exceptions. Two client-navigation checks preserved a single GTM initialization and updated page metadata. One JavaScript-disabled check confirmed the fallback iframe and visible page content.
- Homepage static cache header remains `s-maxage=31536000`; booking retains its existing dynamic/no-store behavior.
- QA browser checks blocked analytics/ad collection requests and lead submissions.

Search Console ownership must still be confirmed by clicking Verify from a Google account with Publish or Admin access to this container. This report proves the website implementation; it does not claim that the account-side verification has been completed.
