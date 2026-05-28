'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export function SearchSection() {
  return (
    <section className="relative z-10 -mt-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <div className="mx-auto max-w-4xl rounded-xl border bg-card p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">
            Cari Kendaraan
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Select id="vehicle-type" label="Jenis Kendaraan">
              <option value="">Semua</option>
              <option value="car">Mobil</option>
              <option value="motorcycle">Motor Listrik</option>
            </Select>
            <Select id="duration" label="Durasi Rental">
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </Select>
            <Input id="location" label="Lokasi" placeholder="Jakarta, Bandung..." />
            <div className="flex items-end">
              <Button className="w-full" size="lg">
                <Search className="mr-2 h-4 w-4" /> Cari
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
