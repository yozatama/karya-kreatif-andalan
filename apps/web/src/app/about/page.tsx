"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Car, Calendar, ThumbsUp } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";

const stats = [
  { icon: <Users className="h-6 w-6" />, value: "500+", label: "Driver Aktif" },
  { icon: <Car className="h-6 w-6" />, value: "200+", label: "Unit Armada" },
  { icon: <Calendar className="h-6 w-6" />, value: "3+", label: "Tahun Beroperasi" },
  { icon: <ThumbsUp className="h-6 w-6" />, value: "98%", label: "Kepuasan" },
];

const values = [
  { title: "Kepercayaan", description: "Membangun hubungan jangka panjang berdasarkan transparansi dan integritas." },
  { title: "Kualitas", description: "Menyediakan armada terbaik dengan standar perawatan tinggi." },
  { title: "Inovasi", description: "Terus berinovasi dengan motor listrik dan teknologi untuk masa depan." },
  { title: "Komunitas", description: "Membangun komunitas driver online yang solid dan saling mendukung." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-emerald-500 to-emerald-700 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white sm:text-4xl"
            >
              Tentang Karya Kreatif Andalan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50"
            >
              Membantu driver online Indonesia mendapatkan akses kendaraan berkualitas dengan harga terjangkau
            </motion.p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading title="Cerita Kami" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 space-y-4 text-navy-600 leading-relaxed"
              >
                <p>
                  Karya Kreatif Andalan didirikan pada tahun 2021 dengan satu misi sederhana: membantu
                  para driver online di Indonesia mendapatkan akses kendaraan yang layak tanpa harus
                  mengeluarkan modal besar.
                </p>
                <p>
                  Kami memahami bahwa banyak calon driver online yang memiliki semangat kerja tinggi namun
                  terkendala modal untuk membeli kendaraan. Dengan sistem rental fleksibel, kami memberikan
                  solusi agar siapa pun bisa memulai karirnya sebagai driver online.
                </p>
                <p>
                  Saat ini, kami telah melayani lebih dari 500 driver aktif dengan armada yang terus
                  bertumbuh, termasuk kendaraan listrik untuk mendukung transportasi ramah lingkungan.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-navy-800">Visi</h3>
                <p className="mt-3 text-navy-600 leading-relaxed">
                  Menjadi platform rental kendaraan nomor satu untuk driver online di Indonesia,
                  dengan menyediakan armada berkualitas, harga terjangkau, dan layanan terbaik.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-gray-200 bg-white p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-navy-800">Misi</h3>
                <ul className="mt-3 space-y-2 text-navy-600">
                  <li>1. Menyediakan armada berkualitas dengan harga terjangkau</li>
                  <li>2. Memberikan dukungan penuh dan layanan 24/7</li>
                  <li>3. Mendorong adopsi kendaraan listrik untuk lingkungan</li>
                  <li>4. Membangun komunitas driver online yang sejahtera</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    {stat.icon}
                  </div>
                  <p className="mt-3 text-2xl font-bold text-navy-800">{stat.value}</p>
                  <p className="text-sm text-navy-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Nilai-Nilai Kami" />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Heart className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-semibold text-navy-800">{value.title}</h3>
                  <p className="mt-2 text-sm text-navy-500">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
