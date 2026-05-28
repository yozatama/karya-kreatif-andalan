'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Fuel, Users, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Vehicle } from '@/lib/mock-data';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg"
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
          {vehicle.name}
        </div>
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={vehicle.type === 'car' ? 'default' : 'secondary'}>
            {vehicle.type === 'car' ? 'Mobil' : 'Motor Listrik'}
          </Badge>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {vehicle.transmission === 'automatic' ? 'AT' : 'MT'}
          </Badge>
        </div>
        {!vehicle.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Tidak Tersedia</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-card-foreground">{vehicle.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{vehicle.rating}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" /> {vehicle.seats}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3 w-3" /> {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Settings className="h-3 w-3" /> {vehicle.year}
          </span>
        </div>

        <div className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Harian</span>
            <span className="font-medium">Rp {vehicle.pricePerDay.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mingguan</span>
            <span className="font-medium">Rp {vehicle.pricePerWeek.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Bulanan</span>
            <span className="font-medium">Rp {vehicle.pricePerMonth.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full" size="sm" asChild disabled={!vehicle.isAvailable}>
            <Link href={`/fleet/${vehicle.id}`}>Lihat Detail</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
