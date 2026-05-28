"use client";

import { motion } from "framer-motion";
import { Car, Shield, Clock, Headphones } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { benefits } from "@/lib/mock-data";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="h-8 w-8" />,
  Shield: <Shield className="h-8 w-8" />,
  Clock: <Clock className="h-8 w-8" />,
  Headphones: <Headphones className="h-8 w-8" />,
};

export function BenefitsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Mengapa Memilih Kami?"
          subtitle="Kami menyediakan layanan terbaik untuk mendukung penghasilan Anda sebagai driver online"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                {iconMap[benefit.icon]}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-navy-800">{benefit.title}</h3>
              <p className="mt-2 text-sm text-navy-500 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
