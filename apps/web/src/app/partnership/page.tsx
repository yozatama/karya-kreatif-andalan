"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Settings, HeadphonesIcon, BarChart3, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const partnerBenefits = [
  { icon: <TrendingUp className="h-6 w-6" />, title: "Passive Income", description: "Dapatkan penghasilan pasif dari kendaraan Anda tanpa repot cari driver." },
  { icon: <Settings className="h-6 w-6" />, title: "Fleet Management", description: "Kami kelola semua aspek operasional termasuk maintenance dan repair." },
  { icon: <HeadphonesIcon className="h-6 w-6" />, title: "Full Support", description: "Tim profesional kami siap mendukung bisnis kemitraan Anda 24/7." },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Growth", description: "Skala bisnis Anda dengan mudah. Tambah armada kapan saja." },
];

const partnershipTiers = [
  {
    name: "Bronze",
    vehicles: "1 - 5 kendaraan",
    revenue: "70:30",
    features: ["Bagi hasil 70% untuk mitra", "Laporan bulanan", "Maintenance dasar", "Asuransi kendaraan"],
    popular: false,
  },
  {
    name: "Silver",
    vehicles: "6 - 20 kendaraan",
    revenue: "75:25",
    features: ["Bagi hasil 75% untuk mitra", "Laporan mingguan", "Full maintenance", "Asuransi all-risk", "Priority support", "Dashboard monitoring"],
    popular: true,
  },
  {
    name: "Gold",
    vehicles: "21+ kendaraan",
    revenue: "80:20",
    features: ["Bagi hasil 80% untuk mitra", "Laporan real-time", "Full maintenance premium", "Asuransi all-risk", "Dedicated account manager", "Dashboard analytics", "Revenue optimization", "Custom branding"],
    popular: false,
  },
];

export default function PartnershipPage() {
  const [vehicleCount, setVehicleCount] = React.useState(5);
  const avgRentalPerVehicle = 4500000;
  const monthlyRevenue = vehicleCount * avgRentalPerVehicle;
  const partnerShare = monthlyRevenue * 0.7;

  const message = encodeURIComponent(
    "Halo, saya tertarik menjadi mitra armada Karya Kreatif Andalan. Bisa info lebih lanjut?"
  );

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
              Bergabung Sebagai Mitra
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50"
            >
              Jadikan kendaraan Anda sebagai sumber penghasilan pasif. Kami yang kelola, Anda yang untung.
            </motion.p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Keuntungan Menjadi Mitra"
              subtitle="Serahkan pengelolaan kepada profesional, nikmati hasilnya"
            />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {partnerBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-gray-200 bg-white p-6 text-center"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    {benefit.icon}
                  </div>
                  <h3 className="mt-4 font-semibold text-navy-800">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-navy-500">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Pilihan Paket Kemitraan" />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partnershipTiers.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "relative rounded-xl border bg-white p-6",
                    tier.popular ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-200"
                  )}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
                      Rekomendasi
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-navy-800">{tier.name}</h3>
                    <p className="mt-1 text-sm text-navy-500">{tier.vehicles}</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-600">
                      Bagi Hasil {tier.revenue}
                    </p>
                  </div>
                  <ul className="mt-6 space-y-2">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-navy-600">
                        <span className="text-emerald-500">&#10003;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Kalkulator ROI"
              subtitle="Estimasi pendapatan Anda sebagai mitra"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 rounded-xl border border-gray-200 bg-white p-6"
            >
              <div>
                <label className="text-sm font-medium text-navy-700">
                  Jumlah Kendaraan: {vehicleCount} unit
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={vehicleCount}
                  onChange={(e) => setVehicleCount(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500"
                />
              </div>
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-navy-500">Rata-rata rental/kendaraan/bulan</span>
                  <span className="text-navy-800">{formatCurrency(avgRentalPerVehicle)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-navy-500">Total pendapatan bulanan</span>
                  <span className="text-navy-800">{formatCurrency(monthlyRevenue)}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="font-medium text-navy-700">Estimasi pendapatan mitra (70%)</span>
                  <span className="font-bold text-emerald-600">{formatCurrency(partnerShare)}</span>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 text-center">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Daftar Menjadi Mitra
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
