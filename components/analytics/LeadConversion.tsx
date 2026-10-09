"use client";
import { useEffect, useRef } from "react";

export default function LeadConversion({ eventId }: { eventId: string }) {
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    try {
      if (sessionStorage.getItem(`lead-conversion:${eventId}`)) return;
      sessionStorage.setItem(`lead-conversion:${eventId}`, "1");
    } catch { /* The consumed server receipt also prevents repeat navigation. */ }
    const target = window as Window & { dataLayer?: Record<string, unknown>[] };
    target.dataLayer = target.dataLayer || [];
    target.dataLayer.push({ event: "generate_lead", event_id: eventId, lead_source: "website" });
  }, [eventId]);
  return null;
}
