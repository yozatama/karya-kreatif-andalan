'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants';

export function CTASection() {
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo, saya ingin mendaftar sebagai driver di Karya Kreatif Andalan.')}`;

  return (
    <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Siap Mulai Menghasilkan?
          </h2>
          <p className="mt-4 text-lg text-emerald-100">
            Bergabung dengan ratusan driver yang sudah percaya pada armada kami
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-100 text-base"
              asChild
            >
              <Link href="/register">Daftar Sekarang</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover:text-white text-base"
              asChild
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp Kami
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
