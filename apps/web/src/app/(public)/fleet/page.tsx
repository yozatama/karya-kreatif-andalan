'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VehicleCard } from '@/components/shared/VehicleCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { VehicleGridSkeleton } from '@/components/shared/LoadingSkeleton';
import { vehicles } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'semua', label: 'Semua' },
  { value: 'mobil', label: 'Mobil' },
  { value: 'motor-listrik', label: 'Motor Listrik' },
];

const transmissions = [
  { value: 'semua', label: 'Semua' },
  { value: 'manual', label: 'Manual' },
  { value: 'otomatis', label: 'Otomatis' },
];

const priceRanges = [
  { value: 'semua', label: 'Semua Harga' },
  { value: 'low', label: '< Rp 200.000' },
  { value: 'mid', label: 'Rp 200.000 - 300.000' },
  { value: 'high', label: '> Rp 300.000' },
];

const ITEMS_PER_PAGE = 6;

export default function FleetPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('semua');
  const [transmission, setTransmission] = useState('semua');
  const [priceRange, setPriceRange] = useState('semua');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== 'semua' && v.category !== category) return false;
      if (transmission !== 'semua' && v.transmission !== transmission) return false;
      if (availableOnly && v.status !== 'tersedia') return false;
      if (priceRange === 'low' && v.priceDaily >= 200000) return false;
      if (priceRange === 'mid' && (v.priceDaily < 200000 || v.priceDaily > 300000)) return false;
      if (priceRange === 'high' && v.priceDaily <= 300000) return false;
      return true;
    });
  }, [search, category, transmission, priceRange, availableOnly]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = filteredVehicles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleFilterChange = () => {
    setPage(1);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-dark">Armada Kami</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Pilih kendaraan yang sesuai kebutuhan Anda. Semua kendaraan terawat dan siap pakai.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari kendaraan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleFilterChange();
            }}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg p-4 space-y-6 lg:sticky lg:top-20">
              <div>
                <h3 className="font-semibold text-sm text-navy-dark mb-3">Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge
                      key={cat.value}
                      className={cn(
                        'cursor-pointer',
                        category === cat.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      )}
                      onClick={() => {
                        setCategory(cat.value);
                        handleFilterChange();
                      }}
                    >
                      {cat.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-navy-dark mb-3">Harga per Hari</h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map((range) => (
                    <Badge
                      key={range.value}
                      className={cn(
                        'cursor-pointer',
                        priceRange === range.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      )}
                      onClick={() => {
                        setPriceRange(range.value);
                        handleFilterChange();
                      }}
                    >
                      {range.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-navy-dark mb-3">Transmisi</h3>
                <div className="flex flex-wrap gap-2">
                  {transmissions.map((trans) => (
                    <Badge
                      key={trans.value}
                      className={cn(
                        'cursor-pointer',
                        transmission === trans.value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                      )}
                      onClick={() => {
                        setTransmission(trans.value);
                        handleFilterChange();
                      }}
                    >
                      {trans.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableOnly}
                    onChange={(e) => {
                      setAvailableOnly(e.target.checked);
                      handleFilterChange();
                    }}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-navy-dark">Tersedia saja</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {isLoading ? (
              <VehicleGridSkeleton />
            ) : paginatedVehicles.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Menampilkan {paginatedVehicles.length} dari {filteredVehicles.length} kendaraan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="Tidak ada kendaraan ditemukan"
                message="Coba ubah filter atau kata kunci pencarian Anda."
                ctaText="Reset Filter"
                onCta={() => {
                  setSearch('');
                  setCategory('semua');
                  setTransmission('semua');
                  setPriceRange('semua');
                  setAvailableOnly(false);
                  setPage(1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
