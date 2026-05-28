"use client";

import { DollarSign, Car, Users, CalendarCheck, Plus, ClipboardList, BarChart3, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevenueBarChart, FleetPieChart } from "@/components/dashboard/charts";
import { formatCurrency } from "@/lib/utils";
import {
  adminStats,
  monthlyRevenue,
  fleetUtilization,
  adminBookings,
  maintenanceAlerts,
} from "@/lib/dashboard-data";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Admin Dashboard</h1>
        <p className="text-navy-500 mt-1">Ringkasan bisnis dan operasional</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-navy-500">Total Pendapatan</p>
                <p className="text-lg font-bold text-navy-800">{formatCurrency(adminStats.totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Car className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-navy-500">Armada Aktif</p>
                <p className="text-lg font-bold text-navy-800">{adminStats.activeFleet}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-navy-500">Driver Aktif</p>
                <p className="text-lg font-bold text-navy-800">{adminStats.activeDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-navy-500">Booking Bulan Ini</p>
                <p className="text-lg font-bold text-navy-800">{adminStats.monthlyBookings}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueBarChart data={monthlyRevenue} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Utilisasi Armada</CardTitle>
          </CardHeader>
          <CardContent>
            <FleetPieChart data={fleetUtilization} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Booking Terbaru</CardTitle>
            <Link href="/admin/bookings">
              <Button variant="ghost" size="sm">Lihat Semua</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-navy-500 pb-3">Driver</th>
                  <th className="text-left text-xs font-medium text-navy-500 pb-3">Kendaraan</th>
                  <th className="text-left text-xs font-medium text-navy-500 pb-3">Status</th>
                  <th className="text-left text-xs font-medium text-navy-500 pb-3">Total</th>
                  <th className="text-left text-xs font-medium text-navy-500 pb-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {adminBookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0">
                    <td className="py-3 text-sm text-navy-800">{booking.driverName}</td>
                    <td className="py-3 text-sm text-navy-600">{booking.vehicleName}</td>
                    <td className="py-3">
                      <Badge variant={
                        booking.status === "menunggu" ? "warning" :
                        booking.status === "aktif" ? "success" :
                        booking.status === "disetujui" ? "info" : "default"
                      }>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm font-medium text-navy-800">{formatCurrency(booking.totalCost)}</td>
                    <td className="py-3">
                      {booking.status === "menunggu" && (
                        <div className="flex gap-1">
                          <Button size="sm" className="h-7 px-2 text-xs">Setujui</Button>
                          <Button size="sm" variant="destructive" className="h-7 px-2 text-xs">Tolak</Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Peringatan Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {maintenanceAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alert.priority === "tinggi" ? "bg-red-500" :
                    alert.priority === "sedang" ? "bg-yellow-500" : "bg-green-500"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-navy-800">{alert.vehicleName} ({alert.plate})</p>
                    <p className="text-xs text-navy-500">{alert.type} - Jatuh tempo: {alert.dueDate}</p>
                  </div>
                </div>
                <Badge variant={alert.priority === "tinggi" ? "danger" : alert.priority === "sedang" ? "warning" : "default"}>
                  {alert.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/admin/fleet/new">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Tambah Armada</span>
          </Button>
        </Link>
        <Link href="/admin/bookings">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            <span className="text-xs">Kelola Booking</span>
          </Button>
        </Link>
        <Link href="/admin/reports">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Lihat Laporan</span>
          </Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
            <Bell className="h-5 w-5" />
            <span className="text-xs">Kirim Notifikasi</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
