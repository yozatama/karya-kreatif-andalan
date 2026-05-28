"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { VehicleCard } from "@/components/shared/vehicle-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { vehicles } from "@/lib/mock-data";
import { SlidersHorizontal } from "lucide-react";

type VehicleType = "semua" | "mobil" | "motor-listrik";
type SortOption = "harga-terendah" | "harga-tertinggi" | "terbaru" | "terpopuler";

export default function FleetPage() {
  const [vehicleType, setVehicleType] = React.useState<VehicleType>("semua");
  const [transmission, setTransmission] = React.useState<string[]>([]);
  const [availableOnly, setAvailableOnly] = React.useState(false);
  const [sort, setSort] = React.useState<SortOption>("harga-terendah");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredVehicles = React.useMemo(() => {
    let result = [...vehicles];

    if (vehicleType !== "semua") {
      result = result.filter((v) => v.category === vehicleType);
    }
    if (transmission.length > 0) {
      result = result.filter((v) => transmission.includes(v.transmission));
    }
    if (availableOnly) {
      result = result.filter((v) => v.available);
    }

    switch (sort) {
      case "harga-terendah":
        result.sort((a, b) => a.dailyRate - b.dailyRate);
        break;
      case "harga-tertinggi":
        result.sort((a, b) => b.dailyRate - a.dailyRate);
        break;
      case "terbaru":
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return result;
  }, [vehicleType, transmission, availableOnly, sort]);

  const handleTransmissionChange = (value: string) => {
    setTransmission((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Tipe Kendaraan</h4>
        <div className="space-y-2">
          {[
            { value: "semua" as VehicleType, label: "Semua" },
            { value: "mobil" as VehicleType, label: "Mobil" },
            { value: "motor-listrik" as VehicleType, label: "Motor Listrik" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input
                type="radio"
                name="vehicleType"
                checked={vehicleType === opt.value}
                onChange={() => setVehicleType(opt.value)}
                className="accent-emerald-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Transmisi</h4>
        <div className="space-y-2">
          {[
            { value: "manual", label: "Manual" },
            { value: "automatic", label: "Matic" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input
                type="checkbox"
                checked={transmission.includes(opt.value)}
                onChange={() => handleTransmissionChange(opt.value)}
                className="accent-emerald-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-navy-800 mb-3">Ketersediaan</h4>
        <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="accent-emerald-500"
          />
          Hanya yang tersedia
        </label>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-white py-12 border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Armada Kami"
              subtitle={`${vehicles.length} kendaraan tersedia untuk Anda`}
            />
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 lg:hidden"
                onClick={() => setFilterOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
              </Button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-navy-700 focus:border-emerald-500 focus:outline-none"
              >
                <option value="harga-terendah">Harga Terendah</option>
                <option value="harga-tertinggi">Harga Tertinggi</option>
                <option value="terbaru">Terbaru</option>
                <option value="terpopuler">Terpopuler</option>
              </select>
            </div>

            <div className="flex gap-8">
              <aside className="hidden w-64 shrink-0 lg:block">
                <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6">
                  <FilterContent />
                </div>
              </aside>

              <div className="flex-1">
                {loading ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                        <Skeleton className="h-40 w-full rounded-none" />
                        <div className="p-4 space-y-3">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredVehicles.map((vehicle, index) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                    ))}
                  </div>
                )}

                {!loading && filteredVehicles.length === 0 && (
                  <div className="py-16 text-center text-navy-500">
                    <p className="text-lg font-medium">Tidak ada kendaraan yang sesuai filter.</p>
                    <p className="mt-2 text-sm">Coba ubah filter pencarian Anda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

      <Sheet open={filterOpen} onOpenChange={setFilterOpen} side="left">
        <SheetHeader>
          <SheetTitle>Filter Armada</SheetTitle>
        </SheetHeader>
        <FilterContent />
      </Sheet>
    </>
  );
}
