import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/lib/data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found | Dolce Estetica" };
  return { title: `${post.title} | Dolce Estetica`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="solid" />

      <article>
        <header className="relative min-h-[280px] w-full overflow-hidden sm:min-h-[400px] sm:aspect-[21/9]">
          <Image src={post.coverImage} alt={post.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-4xl px-4 py-12 text-white sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
              <h1 className="font-serif text-3xl font-bold sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="mt-4 text-sm text-white/70">
                {post.author} ·{" "}
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {post.content.map((paragraph, i) => (
            <p key={i} className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
