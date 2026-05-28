'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { payments } from '@/lib/mock-dashboard-data';
import { CreditCard, Calendar, AlertCircle, Download, Wallet, QrCode } from 'lucide-react';

type FilterStatus = 'all' | 'paid' | 'pending' | 'overdue';

export default function PaymentsPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredPayments = filter === 'all'
    ? payments
    : payments.filter((p) => p.status === filter);

  const totalPaid = payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const outstanding = payments.filter((p) => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0);
  const nextDue = payments.find((p) => p.status === 'pending');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pembayaran</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Total Dibayar"
          value={formatCurrency(totalPaid)}
          icon={CreditCard}
          description="Sejak bergabung"
        />
        <DashboardCard
          title="Sisa Tagihan"
          value={formatCurrency(outstanding)}
          icon={AlertCircle}
          description="Belum dibayar"
        />
        <DashboardCard
          title="Jatuh Tempo Berikutnya"
          value={nextDue ? formatDate(nextDue.date) : '-'}
          icon={Calendar}
          description={nextDue ? formatCurrency(nextDue.amount) : 'Tidak ada tagihan'}
        />
      </div>

      {/* Deposit Tracking */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">{formatCurrency(1000000)}</p>
              <p className="text-sm text-muted-foreground">Deposit aktif - Toyota Avanza</p>
            </div>
            <StatusBadge status="active" label="Aktif" />
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Deposit akan dikembalikan saat pengembalian kendaraan dalam kondisi baik</p>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Metode Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Virtual Account</p>
                <p className="text-xs text-muted-foreground">BCA, BNI, BRI, Mandiri</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">E-Wallet</p>
                <p className="text-xs text-muted-foreground">GoPay, OVO, DANA</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <QrCode className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">QRIS</p>
                <p className="text-xs text-muted-foreground">Scan QR universal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Riwayat Pembayaran</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {([
              { key: 'all', label: 'Semua' },
              { key: 'paid', label: 'Lunas' },
              { key: 'pending', label: 'Menunggu' },
              { key: 'overdue', label: 'Terlambat' },
            ] as { key: FilterStatus; label: string }[]).map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left font-medium text-muted-foreground">Tanggal</th>
                  <th className="py-2 text-left font-medium text-muted-foreground">Deskripsi</th>
                  <th className="py-2 text-right font-medium text-muted-foreground">Jumlah</th>
                  <th className="py-2 text-center font-medium text-muted-foreground">Metode</th>
                  <th className="py-2 text-center font-medium text-muted-foreground">Status</th>
                  <th className="py-2 text-center font-medium text-muted-foreground">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-0">
                    <td className="py-3">{formatDate(payment.date)}</td>
                    <td className="py-3">{payment.description}</td>
                    <td className="py-3 text-right font-medium">{formatCurrency(payment.amount)}</td>
                    <td className="py-3 text-center text-muted-foreground">{payment.method}</td>
                    <td className="py-3 text-center"><StatusBadge status={payment.status} /></td>
                    <td className="py-3 text-center">
                      {payment.invoiceUrl && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
