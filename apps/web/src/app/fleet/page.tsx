'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { VehicleCard } from '@/components/fleet/vehicle-card';
import { vehicles } from '@/lib/mock-data';

type VehicleType = 'all' | 'car' | 'motorcycle';
type SortOption = 'price-asc' | 'price-desc' | 'newest';

export default function FleetPage() {
  const [vehicleType, setVehicleType] = useState<VehicleType>('all');
  const [transmission, setTransmission] = useState<string>('all');
  const [sort, setSort] = useState<SortOption>('price-asc');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    let filtered = [...vehicles];

    if (vehicleType !== 'all') {
      filtered = filtered.filter((v) => v.type === vehicleType);
    }

    if (transmission !== 'all') {
      filtered = filtered.filter((v) => v.transmission === transmission);
    }

    if (availableOnly) {
      filtered = filtered.filter((v) => v.isAvailable);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case 'price-asc':
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'newest':
        filtered.sort((a, b) => b.year - a.year);
        break;
    }

    return filtered;
  }, [vehicleType, transmission, sort, availableOnly, searchQuery]);

  const typeFilters: { value: VehicleType; label: string }[] = [
    { value: 'all', label: 'Semua' },
    { value: 'car', label: 'Mobil' },
    { value: 'motorcycle', label: 'Motor Listrik' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Armada Tersedia</h1>
        <p className="mt-2 text-muted-foreground">
          Temukan kendaraan yang sesuai dengan kebutuhan dan budget Anda
        </p>
      </motion.div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={vehicleType === filter.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setVehicleType(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari kendaraan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
          >
            <option value="all">Semua Transmisi</option>
            <option value="automatic">Otomatis</option>
            <option value="manual">Manual</option>
          </Select>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
          >
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="newest">Terbaru</option>
          </Select>
          <Button
            variant={availableOnly ? 'default' : 'outline'}
            onClick={() => setAvailableOnly(!availableOnly)}
            className="w-full"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {availableOnly ? 'Tersedia Saja' : 'Semua Status'}
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {filteredVehicles.length} kendaraan
        </p>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <SlidersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground">Tidak Ada Hasil</h3>
          <p className="mt-2 text-muted-foreground">
            Coba ubah filter pencarian Anda untuk menemukan kendaraan yang sesuai.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setVehicleType('all');
              setTransmission('all');
              setAvailableOnly(false);
              setSearchQuery('');
            }}
          >
            Reset Filter
          </Button>
        </div>
      )}
    </div>
  );
}
