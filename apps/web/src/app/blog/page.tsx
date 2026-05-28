"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  "tips-driver": "Tips Driver",
  "panduan-rental": "Panduan Rental",
  produktivitas: "Produktivitas",
  berita: "Berita",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Blog & Artikel"
              subtitle="Tips, panduan, dan berita terbaru untuk driver online"
            />
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600">
                        <BookOpen className="h-12 w-12 text-white/80" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2">
                          <Badge>{categoryLabels[post.category] || post.category}</Badge>
                          <span className="text-xs text-navy-400">{post.readTime}</span>
                        </div>
                        <h3 className="mt-3 text-base font-semibold text-navy-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm text-navy-500 line-clamp-2">{post.excerpt}</p>
                        <div className="mt-4 flex items-center justify-between text-xs text-navy-400">
                          <span>{formatDate(post.date)}</span>
                          <span className="flex items-center gap-1 text-emerald-600 font-medium group-hover:gap-2 transition-all">
                            Baca <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
