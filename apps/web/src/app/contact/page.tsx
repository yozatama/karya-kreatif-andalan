"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SITE_CONFIG } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: <MessageCircle className="h-5 w-5" />,
    title: "WhatsApp",
    value: SITE_CONFIG.phone,
    href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    value: SITE_CONFIG.email,
    href: `mailto:${SITE_CONFIG.email}`,
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Alamat",
    value: SITE_CONFIG.address,
    href: "#",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Jam Operasional",
    value: SITE_CONFIG.operatingHours,
    href: "#",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Hubungi Kami"
              subtitle="Ada pertanyaan? Tim kami siap membantu Anda"
            />
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {submitted ? (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                    <h3 className="text-lg font-semibold text-emerald-800">
                      Pesan Terkirim!
                    </h3>
                    <p className="mt-2 text-emerald-600">
                      Terima kasih telah menghubungi kami. Tim kami akan segera merespons dalam 1x24 jam.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
                  >
                    <Input
                      id="name"
                      label="Nama Lengkap"
                      placeholder="Masukkan nama Anda"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <Input
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="email@contoh.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <Input
                      id="phone"
                      label="Nomor Telepon"
                      type="tel"
                      placeholder="08xxxxxxxxxx"
                      error={errors.phone?.message}
                      {...register("phone")}
                    />
                    <Input
                      id="subject"
                      label="Subjek"
                      placeholder="Apa yang bisa kami bantu?"
                      error={errors.subject?.message}
                      {...register("subject")}
                    />
                    <div className="w-full">
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-700">
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Tulis pesan Anda di sini..."
                        className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                      )}
                    </div>
                    <Button type="submit" size="lg" className="w-full">
                      Kirim Pesan
                    </Button>
                  </form>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-emerald-200 transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        {info.icon}
                      </div>
                      <h4 className="mt-3 text-sm font-semibold text-navy-800">{info.title}</h4>
                      <p className="mt-1 text-sm text-navy-500">{info.value}</p>
                    </a>
                  ))}
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-200 p-8 text-center">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-4 text-sm text-gray-500">
                    Lokasi kantor kami di peta
                  </p>
                  <p className="mt-1 text-xs text-gray-400">{SITE_CONFIG.address}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
