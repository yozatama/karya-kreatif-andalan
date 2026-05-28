'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { bookings } from '@/lib/mock-dashboard-data';
import { Plus, Car } from 'lucide-react';

type TabFilter = 'all' | 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

const tabs: { key: TabFilter; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Menunggu' },
  { key: 'confirmed', label: 'Dikonfirmasi' },
  { key: 'active', label: 'Aktif' },
  { key: 'completed', label: 'Selesai' },
  { key: 'cancelled', label: 'Dibatalkan' },
];

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Booking Saya</h1>
        <Link href="/bookings/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Booking Baru
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Booking Cards */}
      {filteredBookings.length === 0 ? (
        <div className="py-12 text-center">
          <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Belum ada booking</p>
          <Link href="/bookings/new">
            <Button className="mt-4">Buat Booking Baru</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted shrink-0">
                      <Car className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{booking.vehicle}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </p>
                      <p className="text-sm text-muted-foreground">{booking.duration} | {booking.pickupLocation}</p>
                    </div>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <p className="font-semibold">{formatCurrency(booking.totalAmount)}</p>
                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <Button variant="outline" size="sm">Batalkan</Button>
                    )}
                    {booking.status === 'active' && (
                      <Link href={`/rentals/${booking.id}`}>
                        <Button size="sm">Lihat Rental</Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
