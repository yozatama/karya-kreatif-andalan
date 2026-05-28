'use client';

import { SectionTitle } from '@/components/shared/SectionTitle';
import { StaggerContainer, StaggerItem } from '@/components/motion/StaggerContainer';

const steps = [
  {
    number: '1',
    title: 'Daftar & Verifikasi',
    description: 'Upload KTP, SIM, dan foto selfie',
  },
  {
    number: '2',
    title: 'Pilih Kendaraan',
    description: 'Pilih mobil atau motor listrik sesuai kebutuhan',
  },
  {
    number: '3',
    title: 'Bayar Deposit',
    description: 'Pembayaran mudah via transfer, e-wallet, atau QRIS',
  },
  {
    number: '4',
    title: 'Ambil Kendaraan',
    description: 'Inspeksi digital dan serah terima di lokasi pickup',
  },
  {
    number: '5',
    title: 'Mulai Nge-Trip',
    description: 'Kendaraan siap digunakan untuk mengantar penumpang',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Cara Sewa Kendaraan"
          subtitle="Proses mudah dan cepat dalam 5 langkah sederhana"
        />

        <StaggerContainer className="relative max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-primary/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="flex flex-col items-center text-center relative">
                  <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                    {step.number}
                  </div>
                  <h3 className="font-semibold text-navy-dark text-sm mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
