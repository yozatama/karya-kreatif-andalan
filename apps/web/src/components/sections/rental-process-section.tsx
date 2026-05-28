"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { rentalSteps } from "@/lib/mock-data";

export function RentalProcessSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Cara Mudah Rental"
          subtitle="5 langkah sederhana untuk mulai menghasilkan sebagai driver online"
        />

        <div className="mt-12 flex flex-col items-center gap-0 md:flex-row md:items-start md:justify-between md:gap-4">
          {rentalSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy-800">{step.title}</h3>
              <p className="mt-2 max-w-[180px] text-sm text-navy-500">{step.description}</p>
              {index < rentalSteps.length - 1 && (
                <div className="my-4 h-8 w-px bg-emerald-200 md:hidden" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
