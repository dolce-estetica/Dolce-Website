"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-base text-dolce-ink outline-none transition-colors placeholder:text-gray-400 focus:border-dolce-green focus:bg-white focus:ring-2 focus:ring-dolce-green/15";

const labelClass =
  "mb-2 block text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Dolce Estetica, I have an inquiry.",
      "",
      `Name: ${form.name}`,
      `Mobile: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      "",
      form.message,
    ].filter(Boolean);

    // Capture the enquiry in the CMO Brain (n8n CRM bridge) before WhatsApp handoff.
    fetch("https://n8n-production-f013.up.railway.app/webhook/crm-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead.created",
        source: "website-contact",
        name: form.name,
        phone: form.phone,
        at: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {});

    window.open(
      `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="c-name">
          Full Name
        </label>
        <input
          id="c-name"
          required
          autoComplete="name"
          className={fieldClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="c-phone">
            Mobile Number
          </label>
          <input
            id="c-phone"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-email">
            Email Address
          </label>
          <input
            id="c-email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="c-message">
          Inquiry Details
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-dolce-green px-8 py-4 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all hover:bg-dolce-bronze active:scale-[0.99]"
      >
        Submit Request
      </button>
    </form>
  );
}
