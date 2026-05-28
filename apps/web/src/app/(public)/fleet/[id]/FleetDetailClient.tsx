'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VehicleCard } from '@/components/shared/VehicleCard';
import { formatCurrency } from '@/lib/format';
import { COMPANY_INFO } from '@/lib/constants';
import type { Vehicle } from '@/lib/mock-data';
import { Users, Fuel, Gauge, Calendar, Car, Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FleetDetailClientProps {
  vehicle: Vehicle;
  relatedVehicles: Vehicle[];
}

export function FleetDetailClient({ vehicle, relatedVehicles }: FleetDetailClientProps) {
  const [showTerms, setShowTerms] = useState(false);

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik untuk menyewa ${vehicle.name}. Bisa info lebih lanjut?`)}`;

  const weeklySavings = Math.round((1 - vehicle.priceWeekly / (vehicle.priceDaily * 7)) * 100);
  const monthlySavings = Math.round((1 - vehicle.priceMonthly / (vehicle.priceDaily * 30)) * 100);

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/fleet" className="hover:text-primary">
            Armada
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy-dark">{vehicle.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mb-4">
              <span className="text-emerald-700 font-semibold text-lg">
                {vehicle.name}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-md flex items-center justify-center"
                >
                  <span className="text-emerald-600 text-xs">Foto {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{vehicle.brand}</Badge>
              <Badge variant={vehicle.status === 'tersedia' ? 'default' : 'secondary'}>
                {vehicle.status === 'tersedia' ? 'Tersedia' : vehicle.status === 'disewa' ? 'Disewa' : 'Maintenance'}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold text-navy-dark">{vehicle.name}</h1>
            <p className="text-muted-foreground mt-2">{vehicle.description}</p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Users className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Kapasitas</p>
                <p className="font-semibold text-sm">{vehicle.seats} orang</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Gauge className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Transmisi</p>
                <p className="font-semibold text-sm capitalize">{vehicle.transmission}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Fuel className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Bahan Bakar</p>
                <p className="font-semibold text-sm">{vehicle.fuelType}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Calendar className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Tahun</p>
                <p className="font-semibold text-sm">{vehicle.year}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <Car className="h-5 w-5 mx-auto text-primary mb-1" />
                <p className="text-xs text-muted-foreground">Kilometer</p>
                <p className="font-semibold text-sm">{vehicle.mileage}</p>
              </div>
            </div>

            {/* Pricing */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-navy-dark mb-3">Harga Sewa</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Harian</span>
                    <span className="font-bold text-primary">{formatCurrency(vehicle.priceDaily)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Mingguan <Badge variant="secondary" className="ml-1 text-xs">Hemat {weeklySavings}%</Badge>
                    </span>
                    <span className="font-bold text-primary">{formatCurrency(vehicle.priceWeekly)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Bulanan <Badge variant="secondary" className="ml-1 text-xs">Hemat {monthlySavings}%</Badge>
                    </span>
                    <span className="font-bold text-primary">{formatCurrency(vehicle.priceMonthly)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Earnings */}
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-semibold text-navy-dark mb-3">Estimasi Penghasilan</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Rata-rata pendapatan driver di platform ojek online:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pendapatan kotor/hari</span>
                    <span className="font-medium">Rp 300.000 - 500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya sewa/hari</span>
                    <span className="font-medium text-destructive">- {formatCurrency(vehicle.priceDaily)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Biaya BBM/listrik</span>
                    <span className="font-medium text-destructive">
                      - {vehicle.fuelType === 'Listrik' ? 'Rp 5.000' : 'Rp 50.000'}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Estimasi bersih/hari</span>
                    <span className="text-primary">Rp 150.000 - 350.000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <div className="mt-6">
              <h3 className="font-semibold text-navy-dark mb-3">Fitur Kendaraan</h3>
              <ul className="grid grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms */}
            <div className="mt-6 border rounded-lg overflow-hidden">
              <button
                onClick={() => setShowTerms(!showTerms)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-sm">Syarat & Ketentuan</span>
                <ChevronDown className={cn('h-4 w-4 transition-transform', showTerms && 'rotate-180')} />
              </button>
              {showTerms && (
                <div className="px-4 pb-4 text-sm text-muted-foreground space-y-2">
                  <p>1. Penyewa wajib memiliki KTP dan SIM yang masih berlaku.</p>
                  <p>2. Deposit sebesar Rp 1.000.000 (mobil) atau Rp 500.000 (motor) dibayar di muka.</p>
                  <p>3. Kendaraan wajib dikembalikan dalam kondisi bersih dan layak.</p>
                  <p>4. Kerusakan akibat kelalaian menjadi tanggung jawab penyewa.</p>
                  <p>5. Keterlambatan pengembalian dikenakan denda Rp 50.000/jam.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        {relatedVehicles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-navy-dark mb-6">Kendaraan Lainnya</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky Bottom CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:hidden z-40">
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              Sewa Sekarang
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
