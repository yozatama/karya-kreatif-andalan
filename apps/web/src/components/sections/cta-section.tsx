"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function CTASection() {
  const message = encodeURIComponent(
    "Halo, saya ingin mendaftar untuk rental kendaraan di Karya Kreatif Andalan."
  );

  return (
    <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Mulai Rental Sekarang
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
            Bergabung dengan 500+ driver yang sudah mempercayakan kebutuhan kendaraan mereka
            kepada Karya Kreatif Andalan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2 bg-white text-emerald-600 hover:bg-gray-100">
                <MessageCircle className="h-5 w-5" />
                Chat WhatsApp
              </Button>
            </a>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Daftar Sekarang
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
