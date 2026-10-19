import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Mail, Phone, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Dolce Estetica",
  description:
    "How Dolce Estetica collects, uses, protects and shares your personal information when you use our website, book a consultation or contact our clinics.",
  alternates: { canonical: "/privacy-policy" },
};

type Section = { id: string; title: string };

const sections: Section[] = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "cookies", title: "Cookies & Tracking Technologies" },
  { id: "sharing", title: "How We Share Information" },
  { id: "retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights and Choices" },
  { id: "security", title: "Data Security" },
  { id: "children", title: "Children's Information" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

function SectionHeading({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 font-sans text-xl font-bold text-dolce-green sm:text-2xl"
    >
      <span className="mr-3 font-sans text-sm font-bold tracking-widest text-dolce-bronze sm:text-base">
        {String(index + 1).padStart(2, "0")}
      </span>
      {title}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 sm:text-base">
      {children}
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-dolce-sand">
      {children}
    </li>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-white font-sans">
      <Navbar variant="solid" />

      {/* Page header */}
      <section className="bg-white px-4 pt-10 pb-8 md:pt-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-dolce-green transition-colors hover:text-dolce-bronze"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>

          <div className="mt-8 flex flex-col items-center gap-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-dolce-sand/50 bg-dolce-sand/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-dolce-green sm:text-sm">
              <ShieldCheck className="h-4 w-4 text-dolce-bronze" />
              Your data, treated with care
            </span>
            <h1 className="font-sans text-3xl font-bold text-dolce-ink sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              This policy explains what personal information Dolce Estetica collects when you use
              our website or visit our clinics, how we use it, and the choices you have.
            </p>
            <p className="inline-flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
              <CalendarDays className="h-4 w-4 text-dolce-bronze" />
              Last updated: 19 October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Policy body: sticky contents list on desktop, collapsible on mobile */}
      <section className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 sm:px-6 sm:pb-24">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
          {/* Contents */}
          <nav aria-label="On this page" className="mb-8 lg:mb-0">
            <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 lg:sticky lg:top-8">
              <details className="group lg:hidden" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-bold text-dolce-green [&::-webkit-details-marker]:hidden">
                  On this page
                  <svg
                    className="h-4 w-4 shrink-0 text-dolce-bronze transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                  </svg>
                </summary>
                <ul className="mt-4 space-y-2.5 border-t border-gray-200/70 pt-4 lg:mt-0 lg:border-0 lg:pt-0">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block text-sm text-gray-500 transition-colors hover:text-dolce-green"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
              {/* Always-expanded list on desktop */}
              <ul className="hidden space-y-2.5 lg:block">
                <li className="mb-3 text-sm font-bold text-dolce-green">On this page</li>
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block text-sm leading-snug text-gray-500 transition-colors hover:text-dolce-green"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sections */}
          <div className="space-y-12 sm:space-y-14">
            <section id="information-we-collect" className="scroll-mt-24">
              <SectionHeading index={0} id="information-we-collect" title={sections[0].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    We collect only the information needed to respond to your enquiries and manage
                    your appointments. Depending on how you interact with us, this includes:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Contact details</strong> —
                      your name, phone number and email address when you submit a booking,
                      consultation or contact form.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">
                        Appointment preferences
                      </strong>{" "}
                      — the clinic and treatment you are interested in, your preferred date and
                      time, and any message you include with your request.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Marketing context</strong>{" "}
                      — when you arrive from an advertisement or campaign, we record referral
                      details such as the campaign, the page you landed on and advertising click
                      identifiers (for example <code>gclid</code> or <code>fbclid</code>), so we
                      know which campaign brought you to us.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Usage information</strong>{" "}
                      — basic device and browsing information collected through analytics tools,
                      described in the Cookies section below.
                    </Bullet>
                  </ul>
                  <p>
                    Medical records created during your treatment are maintained by the clinic you
                    visit and are not stored on this website.
                  </p>
                </Body>
              </div>
            </section>

            <section id="how-we-use" className="scroll-mt-24">
              <SectionHeading index={1} id="how-we-use" title={sections[1].title} />
              <div className="mt-5">
                <Body>
                  <p>We use the information we collect to:</p>
                  <ul className="space-y-2.5">
                    <Bullet>Respond to your enquiries and confirm your appointments.</Bullet>
                    <Bullet>Contact you by phone, SMS, email or WhatsApp about your booking.</Bullet>
                    <Bullet>Route your request to the clinic you selected.</Bullet>
                    <Bullet>
                      Understand which campaigns and pages help people find us, so we can improve
                      the website.
                    </Bullet>
                    <Bullet>
                      Meet legal, accounting and regulatory obligations where required.
                    </Bullet>
                  </ul>
                  <p>
                    We do not sell your personal information, and we do not use it for automated
                    decision-making.
                  </p>
                </Body>
              </div>
            </section>

            <section id="cookies" className="scroll-mt-24">
              <SectionHeading index={2} id="cookies" title={sections[2].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    This website uses a small number of cookies and similar technologies. You can
                    block or delete cookies in your browser settings; the site will continue to
                    work, though some features may be affected.
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Analytics &amp; tags</strong>{" "}
                      — we use Google Tag Manager and associated measurement tools to understand
                      how the site is used and to measure the performance of our campaigns. These
                      tools may set cookies that help report anonymous usage data.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">
                        Form submission receipt
                      </strong>{" "}
                      — after you submit a booking or enquiry, we set a short-lived cookie that
                      only confirms your submission reference so we can show you the right
                      confirmation page. It contains no personal details.
                    </Bullet>
                  </ul>
                  <p>
                    For more about how Google handles data from these tools, see Google&rsquo;s
                    Privacy &amp; Terms page.
                  </p>
                </Body>
              </div>
            </section>

            <section id="sharing" className="scroll-mt-24">
              <SectionHeading index={3} id="sharing" title={sections[3].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    Your information is shared only where it is necessary to serve you, and never
                    sold:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Within our group</strong> —
                      submissions are stored in our own clinic management (CRM) system and are
                      visible only to the Dolce Estetica team members who handle appointments and
                      enquiries.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Service providers</strong> —
                      measurement and messaging platforms (such as analytics, advertising and
                      communication tools) process data on our behalf under their own privacy
                      policies.
                    </Bullet>
                    <Bullet>
                      <strong className="font-semibold text-dolce-ink">Legal requirements</strong>{" "}
                      — we may disclose information if required by law, regulation or a valid legal
                      process.
                    </Bullet>
                  </ul>
                </Body>
              </div>
            </section>

            <section id="retention" className="scroll-mt-24">
              <SectionHeading index={4} id="retention" title={sections[4].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    We keep enquiry and booking information only as long as needed to handle your
                    request and for a reasonable period afterwards for record-keeping. Analytics and
                    campaign data is retained according to the retention settings of the respective
                    tools. When information is no longer required, it is deleted or anonymised.
                  </p>
                </Body>
              </div>
            </section>

            <section id="your-rights" className="scroll-mt-24">
              <SectionHeading index={5} id="your-rights" title={sections[5].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    Under India&rsquo;s Digital Personal Data Protection Act, 2023 and similar laws,
                    you can ask us to:
                  </p>
                  <ul className="space-y-2.5">
                    <Bullet>Confirm what personal information we hold about you.</Bullet>
                    <Bullet>Correct information that is inaccurate or incomplete.</Bullet>
                    <Bullet>
                      Erase your information, subject to records we must retain by law.
                    </Bullet>
                    <Bullet>Withdraw consent for marketing communication at any time.</Bullet>
                    <Bullet>Nominate another person to exercise your rights if needed.</Bullet>
                  </ul>
                  <p>
                    To exercise any of these rights, contact us using the details in the Contact Us
                    section below. We will respond within a reasonable period and may ask for
                    verification of your identity.
                  </p>
                </Body>
              </div>
            </section>

            <section id="security" className="scroll-mt-24">
              <SectionHeading index={6} id="security" title={sections[6].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    We use industry-standard measures to protect your information, including
                    encryption in transit (HTTPS), access limited to staff who need it, and
                    API-key-protected integrations for data leaving the website. No method of
                    transmission over the internet is completely secure, so while we protect your
                    data, we cannot guarantee absolute security.
                  </p>
                </Body>
              </div>
            </section>

            <section id="children" className="scroll-mt-24">
              <SectionHeading index={7} id="children" title={sections[7].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    This website is intended for adults. We do not knowingly collect personal
                    information from children. Treatments for minors are arranged by a parent or
                    guardian through our clinics, and we process such information only with their
                    verifiable consent. If you believe a child has submitted information to us,
                    contact us and we will delete it.
                  </p>
                </Body>
              </div>
            </section>

            <section id="changes" className="scroll-mt-24">
              <SectionHeading index={8} id="changes" title={sections[8].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    We may update this policy from time to time to reflect changes in our practices
                    or the law. The &ldquo;Last updated&rdquo; date at the top of this page always
                    shows the current version, and significant changes will be highlighted on the
                    website. Continued use of the website after an update means you accept the
                    revised policy.
                  </p>
                </Body>
              </div>
            </section>

            <section id="contact" className="scroll-mt-24">
              <SectionHeading index={9} id="contact" title={sections[9].title} />
              <div className="mt-5">
                <Body>
                  <p>
                    Questions, requests or concerns about this policy or your personal information
                    can be raised with our Grievance Officer:
                  </p>
                </Body>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-colors hover:border-dolce-sand/50 hover:bg-dolce-sand/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dolce-green/5 text-dolce-green group-hover:bg-dolce-green group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        Email
                      </span>
                      <span className="block text-sm font-semibold break-all text-dolce-ink">
                        {site.email}
                      </span>
                    </span>
                  </a>
                  <a
                    href={site.phoneHref}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 transition-colors hover:border-dolce-sand/50 hover:bg-dolce-sand/10"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-dolce-green/5 text-dolce-green group-hover:bg-dolce-green group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        Phone
                      </span>
                      <span className="block text-sm font-semibold text-dolce-ink">
                        {site.phone}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </section>

            <p className="border-t border-gray-100 pt-8 text-xs leading-relaxed text-gray-400 sm:text-sm">
              Dolce Estetica operates clinics across Kerala and Karnataka, India. This policy is
              provided for general information and does not constitute legal advice.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
