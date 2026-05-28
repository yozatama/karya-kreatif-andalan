'use client';

import { use } from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { RentalCountdown } from '@/components/dashboard/RentalCountdown';
import { formatCurrency, formatDate } from '@/lib/format';
import { activeRental, payments, checkpointRecords } from '@/lib/mock-dashboard-data';
import { Car, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const statusTimeline = [
  { label: 'Booking Dibuat', date: '28 Oktober 2024', completed: true },
  { label: 'Dikonfirmasi Admin', date: '29 Oktober 2024', completed: true },
  { label: 'Checkpoint Awal', date: '1 November 2024', completed: true },
  { label: 'Rental Aktif', date: '1 November 2024', completed: true },
  { label: 'Checkpoint Akhir', date: '-', completed: false },
  { label: 'Pengembalian', date: '-', completed: false },
];

export default function RentalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  use(params);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnReason, setReturnReason] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const rentalPayments = payments.filter((p) => p.description.includes('Avanza'));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Detail Rental</h1>

      {/* Vehicle Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
              <Car className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{activeRental.vehicle}</h2>
                <StatusBadge status={activeRental.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(activeRental.startDate)} - {formatDate(activeRental.endDate)}
              </p>
              <p className="text-sm font-medium text-primary">{formatCurrency(activeRental.monthlyRate)}/bulan</p>
            </div>
          </div>
          <div className="mt-4">
            <RentalCountdown
              daysRemaining={activeRental.daysRemaining}
              totalDays={activeRental.totalDays}
            />
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Rental</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusTimeline.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-3 w-3" />}
                  </div>
                  {index < statusTimeline.length - 1 && (
                    <div className={`w-0.5 h-6 ${step.completed ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
                <div className="pb-4">
                  <p className={`text-sm ${step.completed ? 'font-medium' : 'text-muted-foreground'}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riwayat Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium text-muted-foreground">Tanggal</th>
                  <th className="py-2 text-left font-medium text-muted-foreground">Deskripsi</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Jumlah</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {rentalPayments.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-0">
                    <td className="py-2">{formatDate(payment.date)}</td>
                    <td className="py-2">{payment.description}</td>
                    <td className="py-2 text-right font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="py-2 text-right"><StatusBadge status={payment.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Checkpoint Records */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Catatan Checkpoint</CardTitle>
        </CardHeader>
        <CardContent>
          {checkpointRecords.filter((cp) => cp.bookingId === 'b1').length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Belum ada catatan checkpoint</p>
          ) : (
            <div className="space-y-2">
              {checkpointRecords.filter((cp) => cp.bookingId === 'b1').map((cp) => (
                <div key={cp.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium capitalize">{cp.type === 'pickup' ? 'Pickup' : 'Return'}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(cp.date)}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p>{cp.odometerReading.toLocaleString()} km</p>
                    <p className="text-xs text-muted-foreground">BBM: {cp.fuelLevel}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Return Request */}
      {!showReturnForm ? (
        <Button variant="outline" onClick={() => setShowReturnForm(true)} className="w-full">
          <ArrowRight className="h-4 w-4 mr-2" /> Ajukan Pengembalian
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Formulir Pengembalian</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Alasan Pengembalian</label>
              <textarea
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                placeholder="Jelaskan alasan pengembalian..."
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Tanggal Pengembalian</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowReturnForm(false)} variant="outline">Batal</Button>
              <Button>Ajukan Pengembalian</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
