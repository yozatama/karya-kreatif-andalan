"use client";

import React from "react";
import Link from "next/link";
import {
  Car,
  Calendar,
  CreditCard,
  TrendingUp,
  Clock,
  Bell,
  Plus,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/stores/auth-store";
import { activeRentals, paymentHistory, notifications } from "@/lib/dashboard-mock-data";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalSpent = paymentHistory
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    { label: "Rental Aktif", value: activeRentals.length, icon: Car, color: "text-emerald-600 bg-emerald-100" },
    { label: "Sisa Hari", value: activeRentals[0]?.remainingDays || 0, icon: Clock, color: "text-blue-600 bg-blue-100" },
    { label: "Total Dibayar", value: `Rp ${(totalSpent / 1000000).toFixed(1)}jt`, icon: Wallet, color: "text-purple-600 bg-purple-100" },
    { label: "Estimasi Pendapatan", value: "Rp 12.5jt", icon: TrendingUp, color: "text-orange-600 bg-orange-100" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h2 className="text-2xl font-bold">
          Selamat datang, {user?.firstName}! 👋
        </h2>
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Rental Card */}
      {activeRentals.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Rental Aktif</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeRentals.map((rental) => (
              <div
                key={rental.id}
                className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4"
              >
                <div className="h-20 w-28 shrink-0 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <Car className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{rental.vehicleName}</h4>
                    <Badge
                      variant={rental.status === "ACTIVE" ? "default" : "secondary"}
                    >
                      {rental.status === "ACTIVE" ? "Aktif" : "Disetujui"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{rental.licensePlate}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Sisa {rental.remainingDays} hari</span>
                      <span>{Math.round((1 - rental.remainingDays / rental.totalDays) * 100)}%</span>
                    </div>
                    <Progress
                      value={((rental.totalDays - rental.remainingDays) / rental.totalDays) * 100}
                      className="h-2"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Pembayaran berikutnya: <span className="font-medium text-foreground">Rp {rental.nextPaymentAmount.toLocaleString("id-ID")}</span> pada {rental.nextPaymentDate}
                  </p>
                </div>
                <Link href={`/dashboard/rentals`}>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Payments */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pembayaran Mendatang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentHistory
              .filter((p) => p.status === "PENDING" || p.status === "OVERDUE")
              .slice(0, 3)
              .map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{payment.description}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      Rp {payment.amount.toLocaleString("id-ID")}
                    </p>
                    <Badge
                      variant={payment.status === "OVERDUE" ? "destructive" : "secondary"}
                      className="text-[10px]"
                    >
                      {payment.status === "OVERDUE" ? "Terlambat" : "Menunggu"}
                    </Badge>
                  </div>
                </div>
              ))}
            <Link href="/dashboard/payments">
              <Button variant="ghost" size="sm" className="w-full mt-2">
                Lihat Semua <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Notifikasi Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <div
                  className={`mt-0.5 rounded-full p-1.5 ${
                    notif.type === "success"
                      ? "bg-green-100 text-green-600"
                      : notif.type === "warning"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Bell className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-gray-500 truncate">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Link href="/dashboard/booking">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Plus className="h-5 w-5 text-emerald-600" />
                <span className="text-xs">Booking Baru</span>
              </Button>
            </Link>
            <Link href="/dashboard/payments">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="text-xs">Bayar Rental</span>
              </Button>
            </Link>
            <Link href="/dashboard/rentals">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Car className="h-5 w-5 text-purple-600" />
                <span className="text-xs">Pengembalian</span>
              </Button>
            </Link>
            <Link href="/dashboard/support">
              <Button variant="outline" className="h-auto w-full flex-col gap-2 py-4">
                <Calendar className="h-5 w-5 text-orange-600" />
                <span className="text-xs">Bantuan</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
