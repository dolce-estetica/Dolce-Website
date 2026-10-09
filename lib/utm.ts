/** Last tagged touch wins as a complete snapshot; untagged internal navigation
 * retains it for 30 minutes. Never mix a new campaign with an old click id. */
export type Utm = Partial<Record<"source" | "medium" | "campaign" | "term" | "content" | "gclid" | "fbclid" | "landingPage" | "referrer", string>>;
const FIELDS = ["source", "medium", "campaign", "term", "content"] as const;
const SESSION_KEY = "dolce-attribution-v2";
let memory: { values: Utm; at: number } | undefined;

export function captureUtm(search = typeof window === "undefined" ? "" : window.location.search): Utm {
  const fresh: Utm = {};
  for (const [raw, value] of new URLSearchParams(search)) {
    const key = raw.toLowerCase();
    if (!value.trim()) continue;
    if (key === "gclid" || key === "fbclid") fresh[key] = value.slice(0, 500);
    if (key.startsWith("utm_") && (FIELDS as readonly string[]).includes(key.slice(4)))
      fresh[key.slice(4) as typeof FIELDS[number]] = value.trim().slice(0, key === "utm_term" ? 500 : 120);
  }
  let stored = memory;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
    if (parsed && typeof parsed.at === "number" && parsed.values && typeof parsed.values === "object") stored = parsed;
  } catch { /* Storage is optional; keep this page's in-memory snapshot. */ }
  const tagged = Object.keys(fresh).length > 0;
  const values = tagged ? fresh : stored && Date.now() - stored.at < 1_800_000 ? stored.values : {};
  if (typeof window !== "undefined" && (tagged || !values.landingPage)) {
    values.landingPage = window.location.pathname;
    try { values.referrer = document.referrer ? new URL(document.referrer).origin : undefined; } catch { /* Ignore malformed referrers. */ }
  }
  memory = { values, at: tagged ? Date.now() : stored?.at || Date.now() };
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(memory)); } catch { /* Private browsing still submits. */ }
  return values;
}
