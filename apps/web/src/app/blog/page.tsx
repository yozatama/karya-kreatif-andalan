'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/mock-data';

const categories = ['Semua', 'Tips Penghasilan', 'Tips Driver', 'Panduan Rental'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'Semua') return blogPosts;
    return blogPosts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory]);

  const featuredPost = blogPosts[0];
  const otherPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl">Blog & Tips</h1>
            <p className="mt-4 text-lg text-navy-200">
              Informasi, tips, dan panduan untuk memaksimalkan penghasilan Anda
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group">
              <div className="rounded-xl border bg-card overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto bg-muted flex items-center justify-center min-h-[250px]">
                  <span className="text-muted-foreground text-sm">Featured Image</span>
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-3">{featuredPost.category}</Badge>
                  <h2 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{featuredPost.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{new Date(featuredPost.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="group">
                  <div className="rounded-xl border bg-card overflow-hidden h-full flex flex-col">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Thumbnail</span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                      <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{new Date(post.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Belum ada artikel dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
