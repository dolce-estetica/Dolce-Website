/**
 * Ad-campaign attribution for the Google-Ads landing pages.
 *
 * Marketing tags ad destination URLs with UTM parameters
 * (utm_source / utm_medium / utm_campaign / utm_term / utm_content —
 * Google Ads also auto-appends gclid, Meta fbclid) so every lead can be
 * traced back to its campaign. GA4 reads them off the URL on its own;
 * this helper exists so the lead itself carries them into the CMO Brain
 * webhook.
 *
 * Keys are matched case-insensitively: campaign sheets sometimes ship
 * "UTM_source"-style capitalisations that analytics tools would ignore.
 *
 * First touch wins within a browsing session: fresh URL tags overwrite,
 * and the union is mirrored into sessionStorage so the values survive
 * anchor scrolls and client-side navigation, where the form page's URL
 * no longer carries them.
 */

export type Utm = Partial<{
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  gclid: string;
  fbclid: string;
}>;

const UTM_FIELDS = ["source", "medium", "campaign", "term", "content"] as const;
const SESSION_KEY = "lp-utm";

export function captureUtm(search: string = typeof window === "undefined" ? "" : window.location.search): Utm {
  const fromUrl: Utm = {};
  for (const [rawKey, value] of new URLSearchParams(search)) {
    if (!value) continue;
    const key = rawKey.toLowerCase();
    if (key === "gclid" || key === "fbclid") {
      fromUrl[key] = value;
      continue;
    }
    if (!key.startsWith("utm_")) continue;
    const field = key.slice(4);
    if ((UTM_FIELDS as readonly string[]).includes(field)) {
      fromUrl[field as (typeof UTM_FIELDS)[number]] = value;
    }
  }

  let stored: Utm = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "{}") as Utm;
  } catch {
    stored = {};
  }

  const merged: Utm = { ...stored, ...fromUrl };
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
  } catch {
    // private mode / storage full — the URL tags still apply for this submit
  }
  return merged;
}
