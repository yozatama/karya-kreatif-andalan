"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/constants";

const categories = [
  { value: "rental", label: "Rental" },
  { value: "pembayaran", label: "Pembayaran" },
  { value: "kendaraan", label: "Kendaraan" },
  { value: "kemitraan", label: "Kemitraan" },
] as const;

export default function FAQPage() {
  const message = encodeURIComponent(
    "Halo, saya punya pertanyaan yang belum ada di FAQ. Bisa dibantu?"
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Pertanyaan yang Sering Diajukan"
              subtitle="Temukan jawaban untuk pertanyaan Anda seputar layanan rental kami"
            />
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Tabs defaultValue="rental">
                <TabsList className="flex flex-wrap">
                  {categories.map((cat) => (
                    <TabsTrigger key={cat.value} value={cat.value}>
                      {cat.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((cat) => (
                  <TabsContent key={cat.value} value={cat.value}>
                    <Accordion>
                      {faqItems
                        .filter((item) => item.category === cat.value)
                        .map((item) => (
                          <AccordionItem key={item.id} title={item.question}>
                            {item.answer}
                          </AccordionItem>
                        ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-xl bg-emerald-50 border border-emerald-100 p-8 text-center"
            >
              <h3 className="text-lg font-semibold text-navy-800">
                Masih punya pertanyaan?
              </h3>
              <p className="mt-2 text-navy-500">
                Hubungi kami via WhatsApp untuk respons cepat
              </p>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-4 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
