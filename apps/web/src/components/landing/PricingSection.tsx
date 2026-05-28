'use client';

import { SectionTitle } from '@/components/shared/SectionTitle';
import { PricingCard } from '@/components/shared/PricingCard';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';

const pricingTiers = [
  {
    title: 'Harian',
    price: 'Rp 150.000',
    period: 'hari',
    description: 'Cocok untuk yang baru mulai',
    features: [
      'Pilih kendaraan tersedia',
      'Asuransi all-risk',
      'Bantuan 24 jam',
      'Inspeksi digital',
    ],
    popular: false,
  },
  {
    title: 'Mingguan',
    price: 'Rp 900.000',
    period: 'minggu',
    description: 'Hemat 15% dari harga harian',
    features: [
      'Semua benefit harian',
      'Diskon 15%',
      'Prioritas ganti kendaraan',
      'Gratis perawatan ringan',
      'Support via WhatsApp',
    ],
    popular: true,
  },
  {
    title: 'Bulanan',
    price: 'Rp 3.000.000',
    period: 'bulan',
    description: 'Hemat 30%, paling diminati driver',
    features: [
      'Semua benefit mingguan',
      'Diskon 30%',
      'Ganti kendaraan gratis 1x',
      'Service berkala gratis',
      'Prioritas unit baru',
      'Bonus referral',
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Paket Sewa Terjangkau"
          subtitle="Pilih durasi sewa yang paling sesuai dengan kebutuhan dan budget Anda"
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-start">
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.title}>
              <PricingCard {...tier} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
