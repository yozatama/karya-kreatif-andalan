'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Check, MessageCircle, Car, Fuel, Users, Settings, Palette, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { VehicleCard } from '@/components/fleet/vehicle-card';
import { type Vehicle } from '@/lib/mock-data';

interface FleetDetailClientProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export function FleetDetailClient({ vehicle, relatedVehicles }: FleetDetailClientProps) {
  const estimatedDailyTrips = vehicle.type === 'car' ? 12 : 20;
  const avgFarePerTrip = vehicle.type === 'car' ? 45000 : 15000;
  const estimatedDailyEarning = estimatedDailyTrips * avgFarePerTrip;
  const estimatedMonthlyEarning = estimatedDailyEarning * 26;
  const netMonthly = estimatedMonthlyEarning - vehicle.pricePerMonth;

  const specs = [
    { label: 'Transmisi', value: vehicle.transmission === 'automatic' ? 'Otomatis' : 'Manual', icon: Settings },
    { label: 'Kapasitas', value: `${vehicle.seats} Orang`, icon: Users },
    { label: 'Bahan Bakar', value: vehicle.fuelType, icon: Fuel },
    { label: 'Tahun', value: vehicle.year.toString(), icon: Calendar },
    { label: 'Warna', value: vehicle.color, icon: Palette },
    { label: 'Kategori', value: vehicle.category, icon: Car },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/fleet">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Armada
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images & Info */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Main Image */}
            <div className="aspect-video rounded-xl bg-muted border overflow-hidden flex items-center justify-center">
              <span className="text-muted-foreground">{vehicle.name}</span>
            </div>
            {/* Thumbnail Grid */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video rounded-lg bg-muted border flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Foto {i}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vehicle Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">{vehicle.name}</h1>
              <Badge variant={vehicle.type === 'car' ? 'default' : 'secondary'}>
                {vehicle.type === 'car' ? 'Mobil' : 'Motor Listrik'}
              </Badge>
              {vehicle.isAvailable ? (
                <Badge className="bg-green-500">Tersedia</Badge>
              ) : (
                <Badge variant="destructive">Tidak Tersedia</Badge>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{vehicle.rating}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">{vehicle.brand} {vehicle.model} {vehicle.year}</span>
            </div>
          </motion.div>

          {/* Specs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          >
            {specs.map((spec) => (
              <div key={spec.label} className="flex items-center gap-3 rounded-lg border p-3">
                <spec.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="font-medium text-sm">{spec.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Earnings Estimate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border bg-emerald-50 dark:bg-emerald-950/20 p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Estimasi Pendapatan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Estimasi Trip/Hari</p>
                <p className="text-2xl font-bold text-primary">{estimatedDailyTrips}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pendapatan/Hari</p>
                <p className="text-2xl font-bold text-primary">Rp {estimatedDailyEarning.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Net Income/Bulan</p>
                <p className="text-2xl font-bold text-primary">Rp {netMonthly.toLocaleString()}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              *Estimasi berdasarkan rata-rata driver yang menggunakan layanan kami. Hasil aktual dapat bervariasi.
            </p>
          </motion.div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Syarat & Ketentuan</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="requirements">
                <AccordionTrigger>Persyaratan Dokumen</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> KTP asli dan fotocopy</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> SIM A (mobil) / SIM C (motor) asli dan fotocopy</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Akun aktif di platform ride-hailing</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Pas foto 3x4 (2 lembar)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="rules">
                <AccordionTrigger>Peraturan Penggunaan</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Kendaraan hanya digunakan untuk operasional ride-hailing</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Dilarang memindahtangankan kendaraan ke pihak lain</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Wajib menjaga kebersihan dan kondisi kendaraan</li>
                    <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-primary shrink-0" /> Pelaporan kerusakan/kecelakaan dalam 1x24 jam</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="deposit">
                <AccordionTrigger>Informasi Deposit</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Deposit sebesar Rp {(vehicle.type === 'car' ? 3000000 : 1000000).toLocaleString()} diperlukan
                    saat pengambilan kendaraan. Deposit akan dikembalikan penuh saat pengembalian kendaraan
                    dalam kondisi baik sesuai checklist.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Right Column - Pricing & CTA */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sticky top-20 rounded-xl border bg-card p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Harga Rental</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <span className="text-muted-foreground">Harian</span>
                <span className="font-bold text-lg">Rp {vehicle.pricePerDay.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                <span className="text-muted-foreground">Mingguan</span>
                <span className="font-bold text-lg">Rp {vehicle.pricePerWeek.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div>
                  <span className="font-medium text-foreground">Bulanan</span>
                  <p className="text-xs text-muted-foreground">Paling hemat!</p>
                </div>
                <span className="font-bold text-lg text-primary">Rp {vehicle.pricePerMonth.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-muted">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deposit</span>
                <span className="font-medium">Rp {(vehicle.type === 'car' ? 3000000 : 1000000).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button className="w-full" size="lg" disabled={!vehicle.isAvailable}>
                Booking Sekarang
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Tanya via WhatsApp
                </a>
              </Button>
            </div>

            {!vehicle.isAvailable && (
              <p className="mt-3 text-center text-sm text-destructive">
                Kendaraan sedang tidak tersedia. Hubungi kami untuk informasi ketersediaan.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Kendaraan Serupa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedVehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
