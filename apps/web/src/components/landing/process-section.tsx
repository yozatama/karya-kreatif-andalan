'use client';

import { motion } from 'framer-motion';
import { Car, FileText, CheckCircle, CreditCard, MapPin, Rocket } from 'lucide-react';
import { rentalSteps } from '@/lib/mock-data';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Car,
  FileText,
  CheckCircle,
  CreditCard,
  MapPin,
  Rocket,
};

export function ProcessSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Cara Rental di Kami
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            6 langkah mudah untuk mulai menghasilkan dengan kendaraan berkualitas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Car;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                    {index + 1}
                  </span>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
