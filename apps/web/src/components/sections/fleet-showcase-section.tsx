"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { VehicleCard } from "@/components/shared/vehicle-card";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/lib/mock-data";

export function FleetShowcaseSection() {
  const featured = vehicles.filter((v) => v.available).slice(0, 6);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Armada Unggulan"
          subtitle="Pilihan kendaraan terbaik untuk menunjang produktivitas Anda"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/fleet">
            <Button variant="outline" size="lg">
              Lihat Semua Armada
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
