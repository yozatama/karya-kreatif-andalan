"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Car, Zap, ArrowLeft, Fuel, Users, Calendar, Gauge } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { VehicleCard } from "@/components/shared/vehicle-card";
import { AvailabilityBadge } from "@/components/shared/availability-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatCurrency } from "@/lib/utils";
import { vehicles } from "@/lib/mock-data";
import { SITE_CONFIG } from "@/lib/constants";

export default function FleetDetailPage() {
  const params = useParams();
  const vehicle = vehicles.find((v) => v.id === params.id);
  const [hoursPerDay, setHoursPerDay] = React.useState(10);

  if (!vehicle) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-navy-800">Kendaraan tidak ditemukan</h1>
            <Link href="/fleet">
              <Button variant="outline" className="mt-4">
                Kembali ke Armada
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ratePerHour = vehicle.category === "mobil" ? 25000 : 15000;
  const dailyEarning = hoursPerDay * ratePerHour;
  const monthlyEarning = dailyEarning * 26;
  const monthlyProfit = monthlyEarning - vehicle.monthlyRate;

  const related = vehicles
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, 3);

  const message = encodeURIComponent(
    `Halo, saya tertarik untuk booking ${vehicle.name}. Bisa info lebih lanjut?`
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/fleet"
            className="mb-6 inline-flex items-center gap-2 text-sm text-navy-500 hover:text-emerald-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Armada
          </Link>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`${vehicle.color} flex h-64 items-center justify-center rounded-xl sm:h-80`}>
                {vehicle.category === "mobil" ? (
                  <Car className="h-24 w-24 text-white/80" />
                ) : (
                  <Zap className="h-24 w-24 text-white/80" />
                )}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`${vehicle.color} flex h-20 items-center justify-center rounded-lg opacity-80`}
                  >
                    {vehicle.category === "mobil" ? (
                      <Car className="h-8 w-8 text-white/60" />
                    ) : (
                      <Zap className="h-8 w-8 text-white/60" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-navy-800 sm:text-3xl">
                      {vehicle.name}
                    </h1>
                    <p className="mt-1 text-navy-500">{vehicle.brand}</p>
                  </div>
                  <AvailabilityBadge available={vehicle.available} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge>{vehicle.category === "mobil" ? "Mobil" : "Motor Listrik"}</Badge>
                  <Badge variant="info">
                    {vehicle.transmission === "automatic" ? "Matic" : "Manual"}
                  </Badge>
                </div>
              </div>

              <p className="text-sm text-navy-600 leading-relaxed">{vehicle.description}</p>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: <Fuel className="h-4 w-4" />, label: "Bahan Bakar", value: vehicle.fuel === "listrik" ? "Listrik" : "Bensin" },
                  { icon: <Users className="h-4 w-4" />, label: "Kapasitas", value: `${vehicle.seats} orang` },
                  { icon: <Calendar className="h-4 w-4" />, label: "Tahun", value: vehicle.year.toString() },
                  { icon: <Gauge className="h-4 w-4" />, label: "Kilometer", value: `${(vehicle.km / 1000).toFixed(0)}k km` },
                ].map((spec) => (
                  <div key={spec.label} className="rounded-lg border border-gray-200 bg-white p-3 text-center">
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      {spec.icon}
                    </div>
                    <p className="text-xs text-navy-500">{spec.label}</p>
                    <p className="text-sm font-semibold text-navy-800">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-navy-800 mb-3">Harga Rental</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Harian</span>
                    <span className="font-semibold text-navy-800">{formatCurrency(vehicle.dailyRate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Mingguan</span>
                    <span className="font-semibold text-navy-800">{formatCurrency(vehicle.weeklyRate)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Bulanan</span>
                    <span className="font-semibold text-emerald-600">{formatCurrency(vehicle.monthlyRate)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between text-sm">
                    <span className="text-navy-500">Deposit</span>
                    <span className="font-semibold text-navy-800">{formatCurrency(vehicle.deposit)}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-navy-800 mb-3">
                  Estimasi Penghasilan
                </h3>
                <div className="mb-3">
                  <label className="text-xs text-navy-500">Jam kerja per hari: {hoursPerDay} jam</label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(Number(e.target.value))}
                    className="mt-1 w-full accent-emerald-500"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-navy-500">Pendapatan harian</span>
                    <span className="text-navy-800">{formatCurrency(dailyEarning)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy-500">Pendapatan bulanan (26 hari)</span>
                    <span className="text-navy-800">{formatCurrency(monthlyEarning)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-1">
                    <span className="text-navy-500">Profit bersih (setelah rental)</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(monthlyProfit)}</span>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full" disabled={!vehicle.available}>
                  Booking Sekarang
                </Button>
              </a>
            </motion.div>
          </div>

          <div className="mt-12">
            <Accordion>
              <AccordionItem title="Syarat & Ketentuan">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Minimal usia 21 tahun dengan SIM aktif</li>
                  <li>Deposit wajib dibayar sebelum pengambilan kendaraan</li>
                  <li>Kendaraan hanya untuk keperluan driver online</li>
                  <li>Dilarang digunakan di luar kota tanpa izin</li>
                  <li>Kerusakan akibat kelalaian ditanggung penyewa</li>
                  <li>Pembayaran tepat waktu setiap awal bulan</li>
                </ul>
              </AccordionItem>
              <AccordionItem title="Asuransi & Perlindungan">
                <p>Semua kendaraan telah dilindungi asuransi all-risk yang mencakup kecelakaan, pencurian, dan bencana alam. Premi sudah termasuk dalam harga rental bulanan.</p>
              </AccordionItem>
              <AccordionItem title="Maintenance & Service">
                <p>Service rutin setiap 5.000 km atau 1 bulan ditanggung sepenuhnya oleh Karya Kreatif Andalan. Termasuk ganti oli, cek rem, rotasi ban, dan pengecekan komponen kritis.</p>
              </AccordionItem>
            </Accordion>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <SectionHeading title="Kendaraan Serupa" subtitle="Pilihan lain yang mungkin cocok untuk Anda" />
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((v, i) => (
                  <VehicleCard key={v.id} vehicle={v} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
