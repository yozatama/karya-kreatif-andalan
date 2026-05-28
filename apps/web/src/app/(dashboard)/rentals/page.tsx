'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { RentalCountdown } from '@/components/dashboard/RentalCountdown';
import { formatCurrency, formatDate } from '@/lib/format';
import { activeRental, rentalHistory } from '@/lib/mock-dashboard-data';
import { Car, ClipboardCheck, RefreshCcw, ArrowRight } from 'lucide-react';

export default function RentalsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Rental Saya</h1>

      {/* Active Rental */}
      {activeRental && (
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Rental Aktif</CardTitle>
              <StatusBadge status="active" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted">
                <Car className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-lg">{activeRental.vehicle}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(activeRental.startDate)} - {formatDate(activeRental.endDate)}
                </p>
              </div>
            </div>

            <RentalCountdown
              daysRemaining={activeRental.daysRemaining}
              totalDays={activeRental.totalDays}
            />

            <div className="flex gap-2 flex-wrap">
              <Link href={`/checkpoint/${activeRental.id}`}>
                <Button size="sm">
                  <ClipboardCheck className="h-4 w-4 mr-1" /> Checkpoint
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-1" /> Perpanjang
              </Button>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 mr-1" /> Minta Pengembalian
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rental History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Rental</CardTitle>
        </CardHeader>
        <CardContent>
          {rentalHistory.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">Belum ada riwayat rental</p>
          ) : (
            <div className="space-y-3">
              {rentalHistory.map((rental) => (
                <Link key={rental.id} href={`/rentals/${rental.id}`}>
                  <div className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Car className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{rental.vehicle}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(rental.totalPaid)}</p>
                      <StatusBadge status={rental.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
