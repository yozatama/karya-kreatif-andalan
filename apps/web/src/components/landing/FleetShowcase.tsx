'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { VehicleCard } from '@/components/shared/VehicleCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { vehicles } from '@/lib/mock-data';

export function FleetShowcase() {
  const featuredVehicles = vehicles.filter((v) => v.status === 'tersedia').slice(0, 6);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Armada Kami"
          subtitle="Pilihan mobil dan motor listrik berkualitas untuk mendukung aktivitas Anda"
        />

        <FadeIn>
          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible">
            {featuredVehicles.map((vehicle) => (
              <div key={vehicle.id} className="min-w-[280px] lg:min-w-0">
                <VehicleCard vehicle={vehicle} />
              </div>
            ))}
          </div>
        </FadeIn>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/fleet">Lihat Semua Armada</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
