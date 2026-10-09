"use client";

import { useRef, useState } from "react";
import { validateLead } from "./lead-validation";

export function useLeadSubmission() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const lock = useRef(false);
  const attempt = useRef<{ fingerprint: string; id: string } | null>(null);

  async function submitLead(payload: Record<string, unknown>) {
    if (lock.current) return false;
    const validation = validateLead(payload);
    if (validation) { setError(validation); return false; }
    lock.current = true;
    setPending(true);
    setError("");
    // Retain the id after timeouts: a retry must not create another interaction.
    const fingerprint = JSON.stringify({ ...payload, at: undefined });
    if (attempt.current?.fingerprint !== fingerprint)
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    try {
      const response = await fetch("/api/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: attempt.current!.id }),
        signal: AbortSignal.timeout(25_000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true || !result.leadId)
        throw new Error(result.message || "We couldn't save your request. Please try again or call us.");
      // The server issues a signed success receipt. Full navigation ensures GTM
      // loads on the conversion destination; no personal data goes into the URL.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- consume the server receipt on a full document navigation for GTM
      window.location.assign(`/thank-you?p=${encodeURIComponent(String(payload.slug || "page"))}`);
      return true;
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError"
        ? cause.message : "The request took too long. Please retry; your enquiry won't be duplicated.");
      return false;
    } finally {
      lock.current = false;
      setPending(false);
    }
  }
  return { submitLead, pending, error };
}
