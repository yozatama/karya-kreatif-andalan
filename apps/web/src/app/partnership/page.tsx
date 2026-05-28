'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle, TrendingUp, Shield, Users, Wallet, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { partnershipTiers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const partnerBenefits = [
  { title: 'Pendapatan Pasif', description: 'Dapatkan return dari armada kendaraan Anda tanpa repot operasional', icon: TrendingUp },
  { title: 'Asuransi Lengkap', description: 'Seluruh kendaraan dilindungi asuransi comprehensive', icon: Shield },
  { title: 'Manajemen Profesional', description: 'Tim berpengalaman mengelola armada dan driver Anda', icon: Users },
  { title: 'Transparansi Penuh', description: 'Dashboard real-time untuk memantau pendapatan dan kondisi armada', icon: Wallet },
  { title: 'Reputasi Terjamin', description: 'Kami hanya menerima driver terverifikasi dengan rating tinggi', icon: Award },
  { title: 'ROI Tinggi', description: 'Return on investment yang kompetitif dibanding investasi lainnya', icon: Star },
];

export default function PartnershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Jadilah Mitra Fleet Kami
            </h1>
            <p className="mt-6 text-lg text-navy-200">
              Investasikan kendaraan Anda bersama kami dan dapatkan passive income yang
              menguntungkan. Kami yang mengelola, Anda yang menikmati hasilnya.
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Hubungi Tim Partnership
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">Keuntungan Menjadi Mitra</h2>
            <p className="mt-4 text-muted-foreground">
              Berbagai keuntungan yang Anda dapatkan saat bermitra dengan kami
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">Tier Kemitraan</h2>
            <p className="mt-4 text-muted-foreground">
              Pilih level kemitraan sesuai dengan skala armada Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partnershipTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative rounded-xl border bg-card p-6',
                  index === 1 && 'border-primary shadow-lg md:scale-105'
                )}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Rekomendasi</Badge>
                  </div>
                )}
                <h3 className="text-xl font-bold text-card-foreground mb-4">{tier.name}</h3>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Keuntungan:</h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Persyaratan:</h4>
                  <ul className="space-y-2">
                    {tier.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-1.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full mt-6"
                  variant={index === 1 ? 'default' : 'outline'}
                  asChild
                >
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                    Daftar Sekarang
                  </a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">Kata Mitra Kami</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-card p-6"
            >
              <p className="text-muted-foreground italic mb-4">
                &quot;Sejak menjadi mitra fleet, penghasilan pasif saya meningkat signifikan.
                Manajemen armada yang profesional membuat saya tenang tanpa perlu turun tangan langsung.&quot;
              </p>
              <div>
                <p className="font-semibold text-card-foreground">Hendra Wijaya</p>
                <p className="text-xs text-muted-foreground">Gold Partner - 20 unit armada</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <p className="text-muted-foreground italic mb-4">
                &quot;Transparansi laporan dan ROI yang konsisten membuat saya terus menambah
                unit armada. Sudah 3 tahun bermitra dan sangat puas dengan hasilnya.&quot;
              </p>
              <div>
                <p className="font-semibold text-card-foreground">Indra Kusuma</p>
                <p className="text-xs text-muted-foreground">Platinum Partner - 35 unit armada</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white">Siap Bermitra?</h2>
            <p className="mt-4 text-emerald-100 max-w-xl mx-auto">
              Hubungi tim partnership kami untuk konsultasi gratis dan mulai investasikan
              armada Anda bersama kami.
            </p>
            <Button size="lg" className="mt-6 bg-white text-emerald-700 hover:bg-white/90" asChild>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Hubungi Kami
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
