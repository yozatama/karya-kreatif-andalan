'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { faqs } from '@/lib/mock-data';
import { COMPANY_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';

const categories = ['Semua', 'Pendaftaran', 'Pembayaran', 'Kendaraan', 'Pengembalian'] as const;

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [openId, setOpenId] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        !search ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'Semua' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo, saya punya pertanyaan yang belum terjawab di FAQ.')}`;

  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-600 to-navy-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-emerald-100 mt-3 max-w-xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan rental kendaraan kami.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pertanyaan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openId === faq.id}
                  >
                    <span className="font-medium text-sm text-navy-dark pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform',
                        openId === faq.id && 'rotate-180',
                      )}
                    />
                  </button>
                  {openId === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada pertanyaan yang cocok dengan pencarian Anda.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
            <h3 className="text-lg font-semibold text-navy-dark">
              Tidak menemukan jawaban?
            </h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Hubungi tim kami langsung via WhatsApp untuk bantuan lebih lanjut.
            </p>
            <Button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white"
              asChild
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Hubungi via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
