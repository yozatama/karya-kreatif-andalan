'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { vehicles } from '@/lib/mock-data';

export function FleetSection() {
  const featured = vehicles.filter((v) => v.isAvailable).slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">Armada Kami</h2>
            <p className="mt-2 text-muted-foreground">
              Pilih kendaraan berkualitas sesuai kebutuhan Anda
            </p>
          </div>
          <Button variant="outline" asChild className="hidden sm:inline-flex">
            <Link href="/fleet">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg"
            >
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                  {vehicle.name}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge variant={vehicle.type === 'car' ? 'default' : 'secondary'}>
                    {vehicle.type === 'car' ? 'Mobil' : 'Motor Listrik'}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-card-foreground">{vehicle.name}</h3>
                <div className="mt-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground">{vehicle.rating}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">
                      Rp {vehicle.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">/hari</span>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/fleet/${vehicle.id}`}>Detail</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/fleet">
              Lihat Semua Armada <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
