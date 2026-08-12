import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog | Dolce Estetica",
  description: "Insights, tips, and the latest news from the world of aesthetics and wellness.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar variant="solid" />

      <section className="bg-dolce-green py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-5 font-serif text-4xl font-bold sm:mb-6 md:text-6xl">Our Blog</h1>
          <p className="mx-auto max-w-2xl text-base text-white/80 sm:text-xl">
            Insights, tips, and the latest news from the world of aesthetics and wellness.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h2 className="mb-4 line-clamp-2 text-xl font-bold text-dolce-ink transition-colors group-hover:text-dolce-green sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mb-6 line-clamp-3 leading-relaxed text-gray-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto flex items-center gap-2 text-sm font-bold tracking-wider text-dolce-green uppercase transition-all group-hover:gap-3">
                      Read Article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-[40px] border border-gray-100 bg-white py-20 text-center">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">No articles found</h2>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
