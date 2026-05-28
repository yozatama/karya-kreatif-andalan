"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  "tips-driver": "Tips Driver",
  "panduan-rental": "Panduan Rental",
  produktivitas: "Produktivitas",
  berita: "Berita",
};

export default function BlogDetailPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 3);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy-800">Artikel tidak ditemukan</h1>
            <Link href="/blog">
              <Button variant="outline" className="mt-4">
                Kembali ke Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy-500 hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Badge>{categoryLabels[post.category] || post.category}</Badge>
              <span className="text-sm text-navy-400">{post.readTime}</span>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-navy-800 sm:text-3xl">
              {post.title}
            </h1>

            <div className="mt-4 flex items-center gap-4 text-sm text-navy-500">
              <span>{post.author}</span>
              <span>{formatDate(post.date)}</span>
            </div>

            <div className="mt-6 flex h-56 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 sm:h-72">
              <BookOpen className="h-16 w-16 text-white/80" />
            </div>

            <div
              className="prose prose-sm mt-8 max-w-none text-navy-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-200 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold text-navy-800">Artikel Terkait</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Badge>{categoryLabels[related.category] || related.category}</Badge>
                    <h3 className="mt-2 font-semibold text-navy-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-xs text-navy-400">{formatDate(related.date)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
