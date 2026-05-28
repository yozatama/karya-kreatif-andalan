'use client';

import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import { monthlyRevenue, allVehicles, paymentRecords } from '@/lib/mock-admin-data';
import { Download } from 'lucide-react';

type DateRange = '7d' | '30d' | '3m' | '6m' | '1y';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<DateRange>('30d');

  const dateRangeOptions: { key: DateRange; label: string }[] = [
    { key: '7d', label: '7 hari' },
    { key: '30d', label: '30 hari' },
    { key: '3m', label: '3 bulan' },
    { key: '6m', label: '6 bulan' },
    { key: '1y', label: '1 tahun' },
  ];

  const topVehicles = [...allVehicles]
    .sort((a, b) => b.utilization - a.utilization)
    .slice(0, 10)
    .map((v) => ({ name: v.name.split(' ').slice(0, 2).join(' '), utilization: v.utilization }));

  const profitableVehicles = [...allVehicles]
    .sort((a, b) => b.revenueEarned - a.revenueEarned)
    .slice(0, 5);

  const overduePayments = paymentRecords.filter((p) => p.status === 'overdue');
  const totalOverdue = overduePayments.reduce((sum, p) => sum + p.amount, 0);

  const registrationData = [
    { month: 'Jul', registrations: 12 },
    { month: 'Agu', registrations: 18 },
    { month: 'Sep', registrations: 15 },
    { month: 'Okt', registrations: 22 },
    { month: 'Nov', registrations: 20 },
    { month: 'Des', registrations: 25 },
    { month: 'Jan', registrations: 16 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Laporan & Analitik</h1>
          <p className="text-muted-foreground">Analisis performa bisnis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export PDF
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Date range picker */}
      <div className="flex gap-2">
        {dateRangeOptions.map((opt) => (
          <Button
            key={opt.key}
            variant={dateRange === opt.key ? 'default' : 'outline'}
            size="sm"
            className="text-xs"
            onClick={() => setDateRange(opt.key)}
          >
            {opt.label}
          </Button>
        ))}
      </div>

      {/* Revenue report */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pendapatan vs Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Pendapatan" />
              <Area type="monotone" dataKey="expenses" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.1} name="Pengeluaran" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Utilisasi Armada (Top 10)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topVehicles} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Bar dataKey="utilization" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Driver registrations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Registrasi Driver Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="registrations" stroke="#10b981" strokeWidth={2} name="Registrasi" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm"><span className="font-medium">Driver Retention:</span> 72% driver kembali menyewa setelah kontrak pertama</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Most profitable vehicles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kendaraan Paling Menguntungkan (Top 5)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground">Kendaraan</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Total Revenue</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Utilisasi</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {profitableVehicles.map((v) => (
                  <tr key={v.id} className="border-b last:border-0">
                    <td className="py-2 font-medium">{v.name}</td>
                    <td className="py-2">{formatCurrency(v.revenueEarned)}</td>
                    <td className="py-2">{v.utilization}%</td>
                    <td className="py-2 capitalize">{v.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Overdue payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Pembayaran Overdue</CardTitle>
          <div className="text-sm font-medium text-red-600">
            Total: {formatCurrency(totalOverdue)}
          </div>
        </CardHeader>
        <CardContent>
          {overduePayments.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Tidak ada pembayaran overdue</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Hari Overdue</th>
                  </tr>
                </thead>
                <tbody>
                  {overduePayments.map((p) => {
                    const daysOverdue = Math.floor((Date.now() - new Date(p.date).getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={p.id} className="border-b last:border-0">
                        <td className="py-2">{p.driverName}</td>
                        <td className="py-2">{formatCurrency(p.amount)}</td>
                        <td className="py-2 text-red-600 font-medium">{daysOverdue} hari</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
