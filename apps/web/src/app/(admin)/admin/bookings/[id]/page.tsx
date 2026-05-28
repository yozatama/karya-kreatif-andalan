'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusTimeline } from '@/components/admin/StatusTimeline';
import { ApprovalDialog } from '@/components/admin/ApprovalDialog';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { recentBookings, paymentRecords } from '@/lib/mock-admin-data';

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const booking = recentBookings.find((b) => b.id === id) ?? recentBookings[0];
  const payments = paymentRecords.filter((p) => p.bookingId === booking.id);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const timelineSteps = [
    { label: 'Booking Dibuat', date: formatDate(booking.startDate), status: 'completed' as const },
    { label: 'Dikonfirmasi', date: booking.status !== 'pending' ? '2 Jan 2025' : undefined, status: booking.status === 'pending' ? 'upcoming' as const : 'completed' as const },
    { label: 'Aktif (Disewa)', date: booking.status === 'active' || booking.status === 'completed' ? '3 Jan 2025' : undefined, status: booking.status === 'active' ? 'current' as const : booking.status === 'completed' ? 'completed' as const : 'upcoming' as const },
    { label: 'Selesai', date: booking.status === 'completed' ? formatDate(booking.endDate) : undefined, status: booking.status === 'completed' ? 'completed' as const : 'upcoming' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Detail Booking</h1>
          <p className="text-muted-foreground">Booking #{booking.id}</p>
        </div>
        <Link href="/admin/bookings">
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Informasi Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Driver</p>
                <p className="font-medium">{booking.driverName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Kendaraan</p>
                <p className="font-medium">{booking.vehicleName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tanggal Mulai</p>
                <p className="font-medium">{formatDate(booking.startDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tanggal Selesai</p>
                <p className="font-medium">{formatDate(booking.endDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-medium">{formatCurrency(booking.amount)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <StatusBadge status={booking.status} />
              </div>
            </div>

            {/* Action panel */}
            <div className="border-t pt-4">
              {booking.status === 'pending' && (
                <div className="flex gap-3">
                  <Button className="gap-2" onClick={() => setApprovalOpen(true)}>Setujui</Button>
                  <Button variant="destructive" className="gap-2" onClick={() => setRejectOpen(true)}>Tolak</Button>
                </div>
              )}
              {booking.status === 'confirmed' && (
                <div className="flex gap-3">
                  <Button>Aktifkan Booking</Button>
                </div>
              )}
              {booking.status === 'active' && (
                <div className="flex gap-3">
                  <Button variant="outline">Perpanjang</Button>
                  <Button>Proses Pengembalian</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusTimeline steps={timelineSteps} />
          </CardContent>
        </Card>
      </div>

      {/* Payment records */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Belum ada pembayaran</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Metode</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-2">{formatDate(p.date)}</td>
                      <td className="py-2">{formatCurrency(p.amount)}</td>
                      <td className="py-2">{p.method}</td>
                      <td className="py-2"><StatusBadge status={p.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ApprovalDialog
        open={approvalOpen}
        onOpenChange={setApprovalOpen}
        title="Setujui Booking"
        description={`Setujui booking ${booking.id} untuk ${booking.driverName}?`}
        actionType="approve"
        onConfirm={() => {}}
      />
      <ApprovalDialog
        open={rejectOpen}
        onOpenChange={setRejectOpen}
        title="Tolak Booking"
        description={`Tolak booking ${booking.id}? Masukkan alasan penolakan.`}
        actionType="reject"
        requireReason
        onConfirm={() => {}}
      />
    </div>
  );
}
