import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts, type ContentBlock } from "@/lib/data/blog";
import { treatmentPages } from "@/lib/data/treatment-pages";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const BASE = "https://dolceestetica.com";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found | Dolce Estetica" };

  return {
    title: `${post.title} | Dolce Estetica`,
    description: post.excerpt,
    alternates: { canonical: `${BASE}/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${BASE}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
    },
  };
}

/** Renders one content block. Everything here is server-rendered on purpose:
 *  AI crawlers do not execute JavaScript, so any content behind a client
 *  component or an interaction is invisible to them. */
function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 mb-4 font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 mb-3 text-lg font-bold text-dolce-ink sm:text-xl">{block.text}</h3>
      );
    case "p":
      return (
        <p className="mb-5 text-base leading-relaxed text-gray-700 sm:text-lg">{block.text}</p>
      );
    case "list":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-gray-700 sm:text-lg">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-dolce-bronze" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <figure className="mb-8">
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-left text-sm sm:text-base">
              <thead className="bg-dolce-green/5">
                <tr>
                  {block.headers.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="border-b border-gray-200 px-4 py-3 font-bold text-dolce-green"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-50/60">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`border-b border-gray-100 px-4 py-3 align-top text-gray-700 ${
                          j === 0 ? "font-semibold text-dolce-ink" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="mt-2 text-xs text-gray-500">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "callout":
      return (
        <aside className="mb-8 rounded-2xl border-l-4 border-dolce-bronze bg-dolce-sand/20 p-5 sm:p-6">
          <p className="mb-2 text-sm font-bold tracking-wide text-dolce-green uppercase">
            {block.title}
          </p>
          <p className="text-base leading-relaxed text-gray-700">{block.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="mb-8 border-l-4 border-dolce-green/30 pl-5 italic text-gray-700">
          <p className="mb-2 text-lg leading-relaxed">{block.text}</p>
          <cite className="text-sm not-italic text-gray-500">— {block.attribution}</cite>
        </blockquote>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const published = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const modified = post.dateModified
    ? new Date(post.dateModified).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const related = (post.relatedTreatments ?? [])
    .map((s) => treatmentPages.find((t) => t.slug === s))
    .filter(Boolean);

  // Article + FAQ structured data. FAQPage no longer produces a rich result in
  // Google Search, but it remains valid machine-readable markup and costs
  // nothing to emit.
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.dateModified ?? post.date,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/blog/${post.slug}` },
        author: { "@type": "Organization", name: post.author, url: BASE },
        ...(post.reviewedBy
          ? { reviewedBy: { "@type": "Organization", name: post.reviewedBy } }
          : {}),
        publisher: {
          "@type": "Organization",
          name: "Dolce Estetica",
          url: BASE,
        },
        ...(post.category ? { articleSection: post.category } : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar variant="solid" />

      <article>
        <header className="relative min-h-[300px] w-full overflow-hidden sm:min-h-[420px]">
          <Image src={post.coverImage} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-4xl px-4 py-12 text-white sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              {post.category ? (
                <p className="mb-3 text-xs font-bold tracking-[0.25em] text-dolce-sand uppercase">
                  {post.category}
                </p>
              ) : null}
              <h1 className="font-serif text-3xl font-bold sm:text-5xl">{post.title}</h1>
              <p className="mt-4 text-sm text-white/70">
                {post.author}
                {post.readingMinutes ? ` · ${post.readingMinutes} min read` : ""} · {published}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Direct answer. First thing on the page, self-contained by design —
              this is the block an answer engine can lift without context. */}
          <div className="mb-10 rounded-2xl border border-dolce-green/15 bg-dolce-green/5 p-6 sm:p-8">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-dolce-green uppercase">
              The short answer
            </p>
            <p className="text-base leading-relaxed text-dolce-ink sm:text-lg">
              {post.directAnswer}
            </p>
          </div>

          {(post.authorCredentials || post.reviewedBy) && (
            <div className="mb-10 border-y border-gray-100 py-4 text-sm text-gray-500">
              {post.authorCredentials ? <p>{post.authorCredentials}</p> : null}
              {post.reviewedBy ? <p>{post.reviewedBy}</p> : null}
              {modified ? <p className="mt-1">Last reviewed: {modified}</p> : null}
            </div>
          )}

          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {post.faqs.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 font-serif text-2xl font-bold text-dolce-green sm:text-3xl">
                Frequently asked questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((f, i) => (
                  <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 sm:p-6">
                    <h3 className="mb-2 font-bold text-dolce-ink">{f.q}</h3>
                    <p className="text-base leading-relaxed text-gray-700">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {post.sources && post.sources.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-3 text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
                References
              </h2>
              <ul className="space-y-1 text-sm text-gray-500">
                {post.sources.map((s, i) => (
                  <li key={i}>{s.url ? <a href={s.url}>{s.label}</a> : s.label}</li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">
                Related treatments
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((t) => (
                  <Link
                    key={t!.slug}
                    href={`/treatments/${t!.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-gray-100 p-4 transition-colors hover:border-dolce-green/30 hover:bg-dolce-green/5"
                  >
                    <span className="font-semibold text-dolce-ink">{t!.name}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-dolce-green transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-14 rounded-[2rem] bg-dolce-green p-8 text-white sm:p-10">
            <h2 className="mb-3 font-serif text-2xl font-bold text-dolce-sand">
              Have a question about your own skin?
            </h2>
            <p className="mb-6 text-white/80">
              General information can only take you so far. A consultation looks at your skin, your
              history and what you actually want to change.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-dolce-green transition-colors hover:bg-dolce-sand"
              >
                <MessageCircle className="h-4 w-4" />
                Ask on WhatsApp
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </section>

          <p className="mt-8 text-xs leading-relaxed text-gray-400">
            This article is general health information and is not a diagnosis, prescription or
            treatment recommendation for any individual. Outcomes differ between people. Suitability
            for any procedure can only be established at an in-person medical consultation.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
