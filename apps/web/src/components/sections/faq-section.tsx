"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/mock-data";

export function FAQSection() {
  const topFaqs = faqItems.slice(0, 5);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pertanyaan yang Sering Diajukan"
          subtitle="Temukan jawaban untuk pertanyaan umum seputar layanan kami"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10"
        >
          <Accordion>
            {topFaqs.map((faq) => (
              <AccordionItem key={faq.id} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-8 text-center">
          <Link href="/faq">
            <Button variant="outline">Lihat Semua FAQ</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
