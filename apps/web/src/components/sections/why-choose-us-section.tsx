"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const features = [
  { label: "Armada terawat & service rutin", us: true, others: false },
  { label: "Harga transparan tanpa biaya tersembunyi", us: true, others: false },
  { label: "Asuransi all-risk termasuk", us: true, others: false },
  { label: "Support 24/7 via WhatsApp", us: true, others: false },
  { label: "Fleksibel harian/mingguan/bulanan", us: true, others: false },
  { label: "Deposit bisa dicicil", us: true, others: false },
  { label: "Program loyalty & bonus", us: true, others: false },
  { label: "Biaya maintenance ditanggung", us: true, others: false },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Keunggulan Karya Kreatif Andalan"
          subtitle="Bandingkan layanan kami dengan penyedia rental kendaraan lainnya"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-navy-700">
            <div>Fitur</div>
            <div className="text-center text-emerald-600">Karya Kreatif</div>
            <div className="text-center text-navy-400">Lainnya</div>
          </div>
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-3 border-b border-gray-100 px-4 py-3 text-sm last:border-0"
            >
              <div className="text-navy-700">{feature.label}</div>
              <div className="flex justify-center">
                <Check className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="flex justify-center">
                <X className="h-5 w-5 text-red-400" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
