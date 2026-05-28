'use client';

import { TrendingUp, Shield, Zap, Wallet } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Penghasilan Tinggi',
    description: 'Kendaraan kami terawat untuk memaksimalkan penghasilan harian Anda',
  },
  {
    icon: Shield,
    title: 'Kendaraan Terawat',
    description: 'Perawatan berkala dan inspeksi ketat sebelum diserahkan',
  },
  {
    icon: Zap,
    title: 'Proses Cepat',
    description: 'Dari pendaftaran sampai mulai nge-trip hanya butuh 24 jam',
  },
  {
    icon: Wallet,
    title: 'Harga Terjangkau',
    description: 'Harga sewa kompetitif dengan opsi harian, mingguan, dan bulanan',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Mengapa Memilih Kami?"
          subtitle="Kami berkomitmen memberikan layanan terbaik untuk mendukung kesuksesan Anda sebagai driver online"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-navy-dark text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
