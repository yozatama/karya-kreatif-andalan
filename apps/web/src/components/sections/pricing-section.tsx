"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/mock-data";

export function PricingSection() {
  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pilihan Paket Rental"
          subtitle="Pilih paket yang sesuai dengan kebutuhan dan budget Anda"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "relative rounded-xl border bg-white p-6 shadow-sm",
                tier.popular ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-200"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                  Paling Populer
                </div>
              )}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-navy-800">{tier.name}</h3>
                <p className="mt-2 text-2xl font-bold text-emerald-600">{tier.priceRange}</p>
                <p className="text-sm text-navy-500">{tier.period}</p>
              </div>
              <ul className="mt-6 space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full"
                >
                  Pilih Paket
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
