"use client";

import { Car, CreditCard, Clock, Star, Plus, Receipt, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EarningsAreaChart } from "@/components/dashboard/charts";
import { formatCurrency } from "@/lib/utils";
import {
  dashboardStats,
  activeRental,
  upcomingPayments,
  monthlyEarnings,
  recentActivity,
} from "@/lib/dashboard-data";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const progress = ((activeRental.totalDays - activeRental.remainingDays) / activeRental.totalDays) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-navy-800">
          Selamat Datang, {user?.name || "Driver"}!
        </h1>
        <p className="text-navy-500 mt-1">Berikut ringkasan aktivitas rental Anda.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Car className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-navy-500">Rental Aktif</p>
                <p className="text-xl font-bold text-navy-800">{dashboardStats.activeRentals}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-navy-500">Total Pembayaran</p>
                <p className="text-xl font-bold text-navy-800">{formatCurrency(dashboardStats.totalPayments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-navy-500">Sisa Hari Rental</p>
                <p className="text-xl font-bold text-navy-800">{dashboardStats.remainingDays} hari</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-navy-500">Rating</p>
                <p className="text-xl font-bold text-navy-800">{dashboardStats.rating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Rental Card */}
      <Card>
        <CardHeader>
          <CardTitle>Rental Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Car className="h-7 w-7 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-navy-800">{activeRental.vehicleName}</p>
                <p className="text-sm text-navy-500">Plat: {activeRental.plate}</p>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <p className="text-sm text-navy-500">
                Sisa: <span className="font-semibold text-navy-800">{activeRental.remainingDays} hari</span>
              </p>
              <p className="text-sm text-navy-500">
                Pembayaran berikutnya: <span className="font-semibold text-emerald-600">{formatCurrency(activeRental.nextPaymentAmount)}</span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-navy-500 mb-1">
              <span>Progress Rental</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Pembayaran Mendatang</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-navy-800">{payment.description}</p>
                    <p className="text-xs text-navy-500">Jatuh tempo: {payment.dueDate}</p>
                  </div>
                  <p className="text-sm font-semibold text-navy-800">{formatCurrency(payment.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <EarningsAreaChart data={monthlyEarnings} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-navy-800">{activity.description}</p>
                  <p className="text-xs text-navy-400">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/bookings/new">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Plus className="h-5 w-5" />
            <span>Booking Baru</span>
          </Button>
        </Link>
        <Link href="/payments">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Receipt className="h-5 w-5" />
            <span>Bayar Tagihan</span>
          </Button>
        </Link>
        <Link href="/support">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Headphones className="h-5 w-5" />
            <span>Hubungi Support</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
