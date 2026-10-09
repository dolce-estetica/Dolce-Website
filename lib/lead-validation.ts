/** Shared by the main form, mobile form and server intake boundary. */
export function normalizeLeadPhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.replace(/\D/g, "");
  const local = digits.length === 12 && digits.startsWith("91")
    ? digits.slice(2) : digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits;
  return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
}

export function validateLead(body: Record<string, unknown>): string | null {
  if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.length > 120)
    return "Please enter your full name (2–120 characters).";
  if (!normalizeLeadPhone(body.phone)) return "Enter a valid 10-digit Indian mobile number.";
  if (body.email && (typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())))
    return "Please enter a valid email address.";
  if (typeof body.source === "string" && body.source.startsWith("lp-")) {
    if (typeof body.concern !== "string" || !body.concern.trim()) return "Please choose your primary concern.";
    if (typeof body.clinic !== "string" || !body.clinic.trim()) return "Please choose a clinic.";
  }
  return null;
}
