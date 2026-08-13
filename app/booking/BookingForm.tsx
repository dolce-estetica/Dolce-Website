"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, Mail, MapPin, Phone, Sparkles, User } from "lucide-react";
import { serviceCategories } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";
import { site } from "@/lib/site";

const times = [
  { value: "Morning (9AM - 12PM)", label: "Morning (9AM - 12PM)" },
  { value: "Afternoon (12PM - 4PM)", label: "Afternoon (12PM - 4PM)" },
  { value: "Evening (4PM - 8PM)", label: "Evening (4PM - 8PM)" },
];

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-base text-dolce-ink outline-none transition-colors placeholder:text-gray-400 focus:border-dolce-green focus:bg-white focus:ring-2 focus:ring-dolce-green/15";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function BookingForm() {
  const params = useSearchParams();
  const presetCategory = params.get("category") ?? "";
  const presetService = params.get("service") ?? "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: locations[0].city,
    service: presetService,
    date: "",
    time: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  // When a category came in on the URL, offer that category first.
  const orderedCategories = useMemo(() => {
    const keys = Object.keys(serviceCategories);
    if (!presetCategory || !keys.includes(presetCategory)) return keys;
    return [presetCategory, ...keys.filter((k) => k !== presetCategory)];
  }, [presetCategory]);

  const summaryReady = form.name && form.phone && form.service;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      "Hello Dolce Estetica, I would like to book an appointment.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : "",
      `Location: ${form.location}`,
      `Service: ${form.service}`,
      form.date ? `Preferred date: ${form.date}` : "",
      form.time ? `Preferred time: ${form.time}` : "",
    ].filter(Boolean);

    // Capture the lead in the CMO Brain (n8n CRM bridge) BEFORE the WhatsApp
    // handoff — so no enquiry is lost even if WhatsApp isn't completed.
    fetch("https://n8n-production-f013.up.railway.app/webhook/crm-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "lead.created",
        source: "website-booking",
        clinic: form.location,
        service: form.service,
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
    <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
      <form
        onSubmit={submit}
        className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2 lg:p-10"
      >
        <fieldset>
          <legend className="mb-6 flex items-center gap-3 text-xl font-bold text-dolce-green sm:text-2xl">
            <User className="h-5 w-5" />
            Personal Information
          </legend>

          <div className="space-y-5">
            <div>
              <label className={labelClass} htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                required
                autoComplete="name"
                placeholder="John Doe"
                className={fieldClass}
                value={form.name}
                onChange={(e) => set("name")(e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={site.phone}
                  className={`${fieldClass} pl-11`}
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className={`${fieldClass} pl-11`}
                  value={form.email}
                  onChange={(e) => set("email")(e.target.value)}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <hr className="my-8 border-gray-100" />

        <fieldset>
          <legend className="mb-6 flex items-center gap-3 text-xl font-bold text-dolce-green sm:text-2xl">
            <MapPin className="h-5 w-5" />
            Service &amp; Location
          </legend>

          <div className="space-y-5">
            <div>
              <label className={labelClass} htmlFor="location">
                Location
              </label>
              <select
                id="location"
                className={fieldClass}
                value={form.location}
                onChange={(e) => set("location")(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc.city} value={loc.city}>
                    {loc.city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="service">
                Service Type
              </label>
              <select
                id="service"
                required
                className={fieldClass}
                value={form.service}
                onChange={(e) => set("service")(e.target.value)}
              >
                <option value="">Select a service</option>
                {orderedCategories.map((category) => (
                  <optgroup key={category} label={category}>
                    {serviceCategories[category].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <hr className="my-8 border-gray-100" />

        <fieldset>
          <legend className="mb-6 flex items-center gap-3 text-xl font-bold text-dolce-green sm:text-2xl">
            <Calendar className="h-5 w-5" />
            Date &amp; Time
          </legend>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="date">
                Preferred Date
              </label>
              <input
                id="date"
                type="date"
                className={fieldClass}
                value={form.date}
                onChange={(e) => set("date")(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="time">
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  id="time"
                  className={`${fieldClass} pl-11`}
                  value={form.time}
                  onChange={(e) => set("time")(e.target.value)}
                >
                  <option value="">Select time</option>
                  {times.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-dolce-green px-8 py-4 text-base font-bold text-white transition-all hover:bg-dolce-green-light active:scale-[0.99] sm:text-lg"
        >
          Book Appointment via WhatsApp
        </button>

        <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
          * Required fields. You&apos;ll be redirected to WhatsApp to confirm your booking.
        </p>
      </form>

      <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-dolce-green sm:text-xl">Booking Summary</h2>
          {summaryReady ? (
            <dl className="space-y-3 text-sm">
              {[
                ["Name", form.name],
                ["Phone", form.phone],
                ["Location", form.location],
                ["Service", form.service],
                ["Date", form.date],
                ["Time", form.time],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-gray-50 pb-2">
                    <dt className="shrink-0 text-gray-400">{label}</dt>
                    <dd className="text-right font-medium text-dolce-ink">{value}</dd>
                  </div>
                ))}
            </dl>
          ) : (
            <p className="text-sm leading-relaxed text-gray-500">
              Please fill out the form to see your summary.
            </p>
          )}
        </div>

        <div className="rounded-[2rem] bg-dolce-green p-6 text-white sm:p-8">
          <h2 className="mb-4 text-lg font-bold text-dolce-sand sm:text-xl">Our Services</h2>
          <ul className="space-y-3">
            {Object.keys(serviceCategories).map((category) => (
              <li key={category} className="flex items-start gap-3 text-sm text-white/80">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-dolce-sand" />
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-3 text-lg font-bold text-dolce-green sm:text-xl">Need Help?</h2>
          <p className="mb-5 text-sm leading-relaxed text-gray-500">
            Our team is here to assist you with any questions about our services or booking process.
          </p>
          <a
            href={site.phoneHref}
            className="flex items-center justify-center gap-2 rounded-full border border-dolce-green/20 px-6 py-3.5 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-green hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </div>
      </aside>
    </div>
  );
}
