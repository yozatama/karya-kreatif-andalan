'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const pricingPlans = [
  {
    name: 'Harian',
    price: 'Rp 200.000',
    period: '/hari',
    description: 'Cocok untuk mencoba atau kebutuhan jangka pendek',
    features: [
      'Bebas pilih kendaraan tersedia',
      'Asuransi dasar',
      'Batas 200 km/hari',
      'Support via WhatsApp',
      'Pengembalian fleksibel',
    ],
    highlighted: false,
  },
  {
    name: 'Mingguan',
    price: 'Rp 1.200.000',
    period: '/minggu',
    description: 'Paling populer untuk driver online aktif',
    features: [
      'Semua fitur Harian',
      'Diskon 15% dari harga harian',
      'Tanpa batas kilometer',
      'Service gratis 1x',
      'Priority support 24/7',
      'Ganti kendaraan gratis',
    ],
    highlighted: true,
  },
  {
    name: 'Bulanan',
    price: 'Rp 4.000.000',
    period: '/bulan',
    description: 'Hemat maksimal untuk driver full-time',
    features: [
      'Semua fitur Mingguan',
      'Diskon 30% dari harga harian',
      'Tanpa batas kilometer',
      'Service & perawatan gratis',
      'Asuransi all-risk',
      'Bonus loyalitas bulanan',
      'Opsi beli kendaraan',
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">Paket Rental</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pilih paket yang sesuai dengan kebutuhan dan budget Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative rounded-xl border bg-card p-6 transition-all',
                plan.highlighted && 'border-primary shadow-lg scale-105 md:scale-110'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Paling Populer
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-card-foreground">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                Pilih Paket
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
