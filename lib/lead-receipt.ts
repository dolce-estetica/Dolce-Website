import { createHmac, timingSafeEqual } from "node:crypto";

export const RECEIPT_COOKIE = "dolce_lead_receipt";
export function signLeadReceipt(id: string, secret: string, now = Date.now()) {
  const value = `${id}.${now + 300_000}`;
  return `${value}.${createHmac("sha256", secret).update(value).digest("hex")}`;
}
export function verifyLeadReceipt(receipt: string | undefined, secret: string | undefined, now = Date.now()) {
  if (!receipt || !secret) return null;
  const [id, expires, signature, extra] = receipt.split(".");
  if (extra || !/^[a-f0-9-]{36}$/.test(id) || !/^\d+$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature ?? "")) return null;
  if (Number(expires) < now || Number(expires) > now + 300_000) return null;
  const expected = createHmac("sha256", secret).update(`${id}.${expires}`).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex")) ? id : null;
}
