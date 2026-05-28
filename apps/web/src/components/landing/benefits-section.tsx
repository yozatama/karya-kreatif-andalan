'use client';

import { motion } from 'framer-motion';
import { Wallet, Shield, Zap, Headphones, UserCheck, Gift } from 'lucide-react';
import { benefits } from '@/lib/mock-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  Shield,
  Zap,
  Headphones,
  UserCheck,
  Gift,
};

export function BenefitsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Kenapa Pilih Kami?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Keuntungan yang Anda dapatkan saat bermitra dengan Karya Kreatif Andalan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon] || Wallet;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
