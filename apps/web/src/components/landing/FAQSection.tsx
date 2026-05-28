'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { FadeIn } from '@/components/motion/FadeIn';
import { faqs } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayFaqs = faqs.slice(0, 5);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Temukan jawaban untuk pertanyaan umum seputar layanan kami"
        />

        <FadeIn>
          <div className="max-w-2xl mx-auto space-y-3">
            {displayFaqs.map((faq) => (
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
            ))}
          </div>
        </FadeIn>

        <div className="text-center mt-8">
          <Button variant="link" asChild>
            <Link href="/faq">Lihat Semua FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
