'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqItems } from '@/lib/mock-data';

const categories = ['All', 'General', 'Booking', 'Payment', 'Vehicle', 'Account'] as const;
type Category = (typeof categories)[number];

const categoryLabels: Record<Category, string> = {
  All: 'Semua',
  General: 'Umum',
  Booking: 'Pemesanan',
  Payment: 'Pembayaran',
  Vehicle: 'Kendaraan',
  Account: 'Akun',
};

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    let filtered = [...faqItems];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

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
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              Pertanyaan yang Sering Diajukan
            </h1>
            <p className="mt-4 text-lg text-navy-200">
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari pertanyaan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Tidak ada pertanyaan yang sesuai dengan pencarian Anda.
                </p>
              </div>
            )}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center rounded-xl border bg-card p-8"
          >
            <h2 className="text-xl font-bold text-card-foreground">Masih Ada Pertanyaan?</h2>
            <p className="mt-2 text-muted-foreground">
              Jangan ragu untuk menghubungi tim kami melalui WhatsApp
            </p>
            <Button className="mt-4" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
