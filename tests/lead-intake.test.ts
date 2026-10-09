import { afterEach, describe, expect, test } from "bun:test";
import { NextRequest } from "next/server";
import { POST } from "../app/api/lead-intake/route";
import { proxy } from "../proxy";
import { RECEIPT_COOKIE, signLeadReceipt, verifyLeadReceipt } from "../lib/lead-receipt";
import { normalizeLeadPhone, validateLead } from "../lib/lead-validation";
import { captureUtm } from "../lib/utm";
const originalFetch = globalThis.fetch;
const originalKey = process.env.CRM_LEAD_INTAKE_API_KEY;
afterEach(() => { globalThis.fetch = originalFetch; if (originalKey) process.env.CRM_LEAD_INTAKE_API_KEY = originalKey; else delete process.env.CRM_LEAD_INTAKE_API_KEY; });
const input = { source: "lp-hair-treatment", slug: "hair-treatment", name: "Local QA", phone: "9000000001", clinic: "Calicut", concern: "Hair", submissionId: "00000000-0000-4000-8000-000000000001" };
function request(value: unknown, origin = "http://localhost:3000") { return new NextRequest("http://localhost:3000/api/lead-intake", { method: "POST", headers: { "content-type": "application/json", origin }, body: JSON.stringify(value) }); }
describe("website lead acceptance boundary", () => {
  test("both forms reject invalid details and accept normalized Indian numbers", () => {
    expect(normalizeLeadPhone("+91 90000 00001")).toBe("+919000000001");
    expect(normalizeLeadPhone("9191234567")).toBe("+919191234567");
    for (const patch of [{ name: " " }, { phone: "123" }, { email: "a@b" }, { clinic: "" }, { concern: "" }]) expect(validateLead({ ...input, ...patch })).not.toBeNull();
    expect(validateLead(input)).toBeNull();
  });
  test("malformed objects, invalid data and cross-site requests never receive a receipt", async () => {
    for (const value of [null, [], { ...input, phone: "123" }]) { const response = await POST(request(value)); expect(response.status).toBe(400); expect(response.headers.get("set-cookie")).toBeNull(); }
    expect((await POST(request(input, "https://other.example"))).status).toBe(403);
  });
  test("missing configuration, rejected and incomplete upstream responses cannot produce success", async () => {
    delete process.env.CRM_LEAD_INTAKE_API_KEY;
    expect((await POST(request(input))).status).toBe(503);
    process.env.CRM_LEAD_INTAKE_API_KEY = "local-test-key";
    for (const [status, body] of [[503, {}], [200, {}], [200, { success: true }]] as const) {
      globalThis.fetch = (async () => Response.json(body, { status })) as unknown as typeof fetch;
      const response = await POST(request(input)); expect(response.status).toBe(502); expect(response.headers.get("set-cookie")).toBeNull();
    }
  });
  test("accepted CRM response forwards all attribution and grants one success navigation", async () => {
    process.env.CRM_LEAD_INTAKE_API_KEY = "local-test-key";
    let forwarded: Record<string, unknown> = {};
    globalThis.fetch = (async (_url: unknown, init: RequestInit) => { forwarded = JSON.parse(String(init.body)); return Response.json({ success: true, lead: { id: "crm-test-lead" } }); }) as unknown as typeof fetch;
    const response = await POST(request({ ...input, utm_source: "google", utm_medium: "cpc", utm_campaign: "qa", utm_term: "test term", utm_content: "test content", gclid: "qa-click", fbclid: "qa-meta" }));
    expect(response.status).toBe(200); expect(forwarded.utmTerm).toBe("test term"); expect(forwarded.gclid).toBe("qa-click"); expect(forwarded.fbclid).toBe("qa-meta"); expect(forwarded.externalReference).toBe(`website:${input.submissionId}`);
    const cookie = response.cookies.get(RECEIPT_COOKIE)!.value;
    expect(verifyLeadReceipt(cookie, "local-test-key")).toBe(input.submissionId);
    const page = proxy(new NextRequest("http://localhost:3000/thank-you", { headers: { cookie: `${RECEIPT_COOKIE}=${cookie}` } }));
    expect(page.headers.get("x-middleware-request-x-dolce-lead-event")).toBe(input.submissionId);
    expect(page.cookies.get(RECEIPT_COOKIE)?.value).toBe("");
  });
  test("legacy client cookie, altered signature and expired receipts do not grant Thank You", () => {
    process.env.CRM_LEAD_INTAKE_API_KEY = "local-test-key";
    const cookie = signLeadReceipt(input.submissionId, "local-test-key", 1000);
    expect(verifyLeadReceipt(cookie, "local-test-key", 301001)).toBeNull();
    expect(verifyLeadReceipt(cookie, "wrong-key", 1001)).toBeNull();
    expect(proxy(new NextRequest("http://localhost:3000/thank-you", { headers: { cookie: "lp_lead_ok=1; lp_lead_srv=1" } })).status).toBe(307);
  });
  test("attribution survives navigation and replaces an old campaign without mixing click ids", () => {
    captureUtm("?UTM_Source=google&utm_medium=cpc&utm_campaign=first&utm_term=hair&gclid=old");
    expect(captureUtm("").term).toBe("hair");
    const fresh = captureUtm("?utm_source=facebook&utm_campaign=second&fbclid=new");
    expect(fresh.gclid).toBeUndefined(); expect(fresh.term).toBeUndefined(); expect(fresh.fbclid).toBe("new");
  });
  test("an expired session starts a fresh untagged visit and preserves its referrer", () => {
    const now = Date.now;
    const windowDescriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
    const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, "document");
    const location = { pathname: "/old-entry", search: "" };
    const document = { referrer: "" };
    try {
      Object.defineProperty(globalThis, "window", { configurable: true, value: { location } });
      Object.defineProperty(globalThis, "document", { configurable: true, value: document });
      Date.now = () => 1000;
      captureUtm("?utm_source=google&gclid=expired-click");
      Date.now = () => 2_000_000;
      location.pathname = "/new-entry";
      document.referrer = "https://chatgpt.com/";
      const fresh = captureUtm("");
      expect(fresh.gclid).toBeUndefined();
      expect(fresh.landingPage).toBe("/new-entry");
      location.pathname = "/contact";
      document.referrer = "https://dolceestetica.com/new-entry";
      const continued = captureUtm("");
      expect(continued.landingPage).toBe("/new-entry");
      expect(continued.referrer).toBe("https://chatgpt.com");
    } finally {
      Date.now = now;
      if (windowDescriptor) Object.defineProperty(globalThis, "window", windowDescriptor);
      else Reflect.deleteProperty(globalThis, "window");
      if (documentDescriptor) Object.defineProperty(globalThis, "document", documentDescriptor);
      else Reflect.deleteProperty(globalThis, "document");
    }
  });
});
