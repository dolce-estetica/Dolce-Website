# Next.js metadata wrapper and Search Console

`next@16.3.0.patch` replaces the streaming metadata wrapper's hidden `div`
with a React Fragment in both the CommonJS and ESM builds. The metadata
boundary, Suspense, streaming and error handling remain in place.

Next.js otherwise puts this wrapper before the root layout's first body
element. That moves the GTM noscript away from the opening body tag and
causes Google Search Console's “snippet is in the wrong location” error,
even while the head script loads GTM successfully.

Google permits whitespace and HTML comments before the noscript, but no
other elements. The Fragment retains React's boundary comments without
adding an element. The existing loader, container ID and fallback iframe
are unchanged.

- [Google's verification requirements](https://support.google.com/webmasters/answer/9008080?hl=en#google_tag_manager)
- [Upstream discussion of the hidden metadata wrapper](https://github.com/vercel/next.js/discussions/81163)

Bun applies the versioned patch through `patchedDependencies` on install,
including the frozen-lockfile deployment install. The production build
runs `scripts/check-gtm-placement.mjs` against every prerendered HTML page
to reject regressions in snippet order, duplicates, or missing titles.
The same script accepts a base URL for request-time verification.

When upgrading Next.js, check whether upstream has removed this wrapper.
Remove or recreate the patch for the new version and rerun build, raw HTML,
hydration, metadata, no-JavaScript and client navigation checks. Do not
silently drop the verification check or rely on client-side DOM movement.
