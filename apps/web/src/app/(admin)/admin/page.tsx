'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { DollarSign, Car, Clock, Activity, Wrench, Plus, ShieldCheck, FileBarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import {
  dashboardStats,
  revenueData,
  fleetStatus,
  recentBookings,
  maintenanceRecords,
} from '@/lib/mock-admin-data';

const FLEET_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6b7280'];
const fleetChartData = [
  { name: 'Tersedia', value: fleetStatus.available },
  { name: 'Disewa', value: fleetStatus.rented },
  { name: 'Servis', value: fleetStatus.maintenance },
  { name: 'Nonaktif', value: fleetStatus.inactive },
];

type ChartView = 'harian' | 'mingguan' | 'bulanan';

export default function AdminDashboardPage() {
  const [chartView, setChartView] = useState<ChartView>('harian');

  const chartData = chartView === 'harian'
    ? revenueData
    : chartView === 'mingguan'
    ? revenueData.filter((_, i) => i % 7 === 0)
    : revenueData.filter((_, i) => i % 30 === 0 || i === revenueData.length - 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">Ringkasan operasional Karya Kreatif Andalan</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          icon={DollarSign}
          label="Total Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          trend={{ value: '+12% dari bulan lalu', positive: true }}
        />
        <AdminStatCard
          icon={Car}
          label="Rental Aktif"
          value={String(dashboardStats.activeRentals)}
          trend={{ value: '+5% dari bulan lalu', positive: true }}
        />
        <AdminStatCard
          icon={Clock}
          label="Booking Pending"
          value={String(dashboardStats.pendingBookings)}
          trend={{ value: '+3 hari ini', positive: false }}
        />
        <AdminStatCard
          icon={Activity}
          label="Utilisasi Armada"
          value={`${dashboardStats.fleetUtilization}%`}
          trend={{ value: '+2% dari bulan lalu', positive: true }}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Pendapatan</CardTitle>
            <div className="flex gap-1">
              {(['harian', 'mingguan', 'bulanan'] as ChartView[]).map((view) => (
                <Button
                  key={view}
                  variant={chartView === view ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => setChartView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}jt`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fleet status donut */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Status Armada</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={fleetChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {fleetChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={FLEET_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {fleetChartData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-2 text-xs">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: FLEET_COLORS[i] }} />
                  <span>{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent bookings and maintenance alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Booking Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Kendaraan</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                    <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-2">{booking.driverName}</td>
                      <td className="py-2">{booking.vehicleName}</td>
                      <td className="py-2">
                        <StatusBadge status={booking.status} />
                      </td>
                      <td className="py-2 text-right">
                        <Link href={`/admin/bookings/${booking.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs">Lihat</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Peringatan Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceRecords
                .filter((m) => new Date(m.nextService) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
                .slice(0, 4)
                .map((record) => (
                  <div key={record.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{record.vehicleName}</p>
                      <p className="text-xs text-muted-foreground">Servis berikutnya: {formatDate(record.nextService)}</p>
                    </div>
                    <Wrench className="h-4 w-4 text-amber-500" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/admin/fleet/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Kendaraan
          </Button>
        </Link>
        <Link href="/admin/users?tab=verification">
          <Button variant="outline" className="gap-2">
            <ShieldCheck className="h-4 w-4" /> Verifikasi Pending
          </Button>
        </Link>
        <Link href="/admin/reports">
          <Button variant="outline" className="gap-2">
            <FileBarChart className="h-4 w-4" /> Lihat Laporan
          </Button>
        </Link>
      </div>
    </div>
  );
}
