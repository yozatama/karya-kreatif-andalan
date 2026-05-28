'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Car, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stats } from '@/lib/mock-data';

const statItems = [
  { label: 'Driver Aktif', value: stats.totalDrivers, icon: Users, suffix: '+' },
  { label: 'Unit Kendaraan', value: stats.totalVehicles, icon: Car, suffix: '+' },
  { label: 'Kota', value: stats.totalCities, icon: MapPin, suffix: '' },
  { label: 'Tahun Beroperasi', value: stats.totalYears, icon: Calendar, suffix: '+' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Rental Mobil & Motor Listrik{' '}
            <span className="text-emerald-400">Terpercaya</span> untuk Driver Online
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg text-navy-200 md:text-xl"
          >
            Bergabung bersama ribuan driver Gojek, Grab, Maxim, dan InDrive yang sudah
            merasakan kemudahan rental kendaraan berkualitas dengan harga terjangkau.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/fleet">
                Lihat Armada <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-navy-400 text-white hover:bg-navy-700" asChild>
              <Link href="https://wa.me/6281234567890">
                Hubungi Kami
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
                <item.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white md:text-3xl">
                {item.value.toLocaleString()}{item.suffix}
              </div>
              <div className="text-sm text-navy-300">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
