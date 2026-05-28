'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { RentalCountdown } from '@/components/dashboard/RentalCountdown';
import { NotificationItem } from '@/components/dashboard/NotificationItem';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import {
  currentUser,
  activeRental,
  upcomingPayments,
  notifications,
  earningsData,
} from '@/lib/mock-dashboard-data';
import { Car, CreditCard, Calendar, TrendingUp, Plus, HelpCircle, User, History, AlertTriangle, RefreshCcw, ArrowRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold">Selamat datang, {currentUser.name}!</h1>
        <p className="text-muted-foreground">Kelola rental dan pembayaran Anda di sini.</p>
      </div>

      {/* Active Rental Card */}
      {activeRental && (
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Rental Aktif</CardTitle>
              <StatusBadge status="active" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                <Car className="h-8 w-8 text-muted-foreground" />
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

            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div>
                <p className="text-xs text-muted-foreground">Pembayaran berikutnya</p>
                <p className="font-semibold">{formatCurrency(activeRental.nextPayment.amount)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Jatuh tempo</p>
                <p className="text-sm font-medium">{formatDate(activeRental.nextPayment.dueDate)}</p>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <AlertTriangle className="h-4 w-4 mr-1" /> Lapor Masalah
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCcw className="h-4 w-4 mr-1" /> Perpanjang
              </Button>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 mr-1" /> Kembalikan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Total Bulan Ini"
          value={formatCurrency(4000000)}
          icon={CreditCard}
          description="Pengeluaran sewa"
        />
        <DashboardCard
          title="Hari Aktif"
          value="12"
          icon={Calendar}
          description="Dari 30 hari"
        />
        <DashboardCard
          title="Total Rental"
          value="6"
          icon={Car}
          description="Sejak bergabung"
          className="col-span-2 lg:col-span-1"
        />
      </div>

      {/* Earnings chart + Upcoming Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Estimasi Penghasilan</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), 'Penghasilan']}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Bar dataKey="earnings" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Pembayaran Mendatang</CardTitle>
              <Link href="/payments" className="text-xs text-primary hover:underline">
                Lihat Semua
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{payment.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(payment.dueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(payment.amount)}</p>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Feed */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Notifikasi Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {notifications.slice(0, 5).map((notif) => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/bookings/new">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Plus className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium">Sewa Baru</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/support">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <HelpCircle className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium">Bantuan</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/profile">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <User className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium">Profil</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/rentals">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <History className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium">Riwayat</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
