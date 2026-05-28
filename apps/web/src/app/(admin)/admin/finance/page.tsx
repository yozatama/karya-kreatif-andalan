'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { paymentRecords, type PaymentRecord } from '@/lib/mock-admin-data';
import { DollarSign, Clock, Shield, AlertTriangle } from 'lucide-react';

type FinanceTab = 'pembayaran' | 'deposit' | 'penalti' | 'invoice' | 'refund';

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<FinanceTab>('pembayaran');

  const tabs: { key: FinanceTab; label: string }[] = [
    { key: 'pembayaran', label: 'Pembayaran' },
    { key: 'deposit', label: 'Deposit' },
    { key: 'penalti', label: 'Penalti' },
    { key: 'invoice', label: 'Invoice' },
    { key: 'refund', label: 'Refund' },
  ];

  const paymentColumns: AdminColumn<PaymentRecord>[] = [
    { key: 'date', header: 'Tanggal', render: (item) => formatDate(item.date) },
    { key: 'driverName', header: 'Driver' },
    { key: 'bookingId', header: 'Booking#' },
    { key: 'amount', header: 'Jumlah', render: (item) => formatCurrency(item.amount) },
    { key: 'method', header: 'Metode' },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  const totalRevenue = paymentRecords.filter((p) => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const outstanding = paymentRecords.filter((p) => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Modul Keuangan</h1>
        <p className="text-muted-foreground">Kelola pembayaran, deposit, dan penalti</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard icon={DollarSign} label="Revenue Bulan Ini" value={formatCurrency(totalRevenue)} trend={{ value: '+8%', positive: true }} />
        <AdminStatCard icon={Clock} label="Outstanding" value={formatCurrency(outstanding)} trend={{ value: '5 transaksi', positive: false }} />
        <AdminStatCard icon={Shield} label="Total Deposit" value={formatCurrency(25000000)} trend={{ value: '25 aktif', positive: true }} />
        <AdminStatCard icon={AlertTriangle} label="Total Penalti" value={formatCurrency(8500000)} trend={{ value: '3 pending', positive: false }} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-3">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'ghost'}
            size="sm"
            className="text-xs"
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'pembayaran' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">Export</Button>
          </div>
          <AdminDataTable
            columns={paymentColumns}
            data={paymentRecords}
            page={1}
            pageSize={10}
            totalItems={paymentRecords.length}
            getRowId={(item) => item.id}
          />
        </div>
      )}

      {activeTab === 'deposit' && (
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Kendaraan</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah Deposit</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {['Budi Santoso', 'Ahmad Rizki', 'Hendra Wijaya', 'Agus Pratama', 'Siti Nurhaliza'].map((name, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-2">{name}</td>
                      <td className="py-2">Toyota Avanza</td>
                      <td className="py-2">{formatCurrency(1000000)}</td>
                      <td className="py-2"><StatusBadge status="active" label="Aktif" /></td>
                      <td className="py-2 text-right">
                        <Button variant="outline" size="sm" className="text-xs">Refund</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'penalti' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm">Tambah Penalti</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Booking#</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Jenis</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Eko Prasetyo</td>
                      <td className="py-2">BK-0010</td>
                      <td className="py-2">Kerusakan</td>
                      <td className="py-2">{formatCurrency(2500000)}</td>
                      <td className="py-2"><StatusBadge status="pending" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Budi Santoso</td>
                      <td className="py-2">BK-0014</td>
                      <td className="py-2">Keterlambatan</td>
                      <td className="py-2">{formatCurrency(500000)}</td>
                      <td className="py-2"><StatusBadge status="paid" /></td>
                    </tr>
                    <tr className="border-b last:border-0">
                      <td className="py-2">Hendra Wijaya</td>
                      <td className="py-2">BK-0003</td>
                      <td className="py-2">Denda</td>
                      <td className="py-2">{formatCurrency(750000)}</td>
                      <td className="py-2"><StatusBadge status="overdue" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'invoice' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm">Generate Invoice</Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Invoice#</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">INV-2025-001</td>
                      <td className="py-2">Budi Santoso</td>
                      <td className="py-2">{formatCurrency(4000000)}</td>
                      <td className="py-2"><StatusBadge status="paid" /></td>
                      <td className="py-2">15 Jan 2025</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">INV-2025-002</td>
                      <td className="py-2">Ahmad Rizki</td>
                      <td className="py-2">{formatCurrency(3600000)}</td>
                      <td className="py-2"><StatusBadge status="pending" /></td>
                      <td className="py-2">20 Jan 2025</td>
                    </tr>
                    <tr className="border-b last:border-0">
                      <td className="py-2">INV-2025-003</td>
                      <td className="py-2">Hendra Wijaya</td>
                      <td className="py-2">{formatCurrency(4400000)}</td>
                      <td className="py-2"><StatusBadge status="overdue" /></td>
                      <td className="py-2">10 Jan 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'refund' && (
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Alasan</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Lukman Hakim</td>
                    <td className="py-2">{formatCurrency(5400000)}</td>
                    <td className="py-2">Pembatalan booking</td>
                    <td className="py-2"><StatusBadge status="pending" /></td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm" className="text-xs text-emerald-600">Approve</Button>
                      <Button variant="ghost" size="sm" className="text-xs text-red-600">Reject</Button>
                    </td>
                  </tr>
                  <tr className="border-b last:border-0">
                    <td className="py-2">Eko Prasetyo</td>
                    <td className="py-2">{formatCurrency(3300000)}</td>
                    <td className="py-2">Kendaraan bermasalah</td>
                    <td className="py-2"><StatusBadge status="completed" label="Diproses" /></td>
                    <td className="py-2 text-right">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
