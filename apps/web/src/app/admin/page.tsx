"use client";

import React from "react";
import {
  TrendingUp,
  Car,
  Users,
  Banknote,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { revenueData, fleetData, bookingStats, maintenanceSchedule, activeRentals } from "@/lib/dashboard-mock-data";

const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"];

export default function AdminDashboardPage() {
  const stats = [
    { label: "Revenue Bulan Ini", value: "Rp 310jt", icon: Banknote, color: "text-emerald-600 bg-emerald-100", change: "+12%" },
    { label: "Rental Aktif", value: "56", icon: Car, color: "text-blue-600 bg-blue-100", change: "+5" },
    { label: "Total Kendaraan", value: "78", icon: Car, color: "text-purple-600 bg-purple-100", change: "+3" },
    { label: "Driver Aktif", value: "52", icon: Users, color: "text-orange-600 bg-orange-100", change: "+8" },
    { label: "Pending Verifikasi", value: "5", icon: ShieldCheck, color: "text-red-600 bg-red-100", change: "" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-lg font-bold">{stat.value}</p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-gray-500">{stat.label}</p>
                {stat.change && (
                  <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}jt`} />
                  <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)}jt`} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b98140" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Booking Harian (30 Hari)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingStats.slice(0, 15)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Utilization & Recent Bookings */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Fleet Utilization */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Utilisasi Armada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fleetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="utilization"
                    nameKey="category"
                    label={({ category }) => category}
                  >
                    {fleetData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {fleetData.map((item, i) => (
                <div key={item.category} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span>{item.category}</span>
                  </div>
                  <span className="font-medium">{item.utilization}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Booking Terbaru</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <a href="/admin/bookings">Lihat Semua <ArrowRight className="h-3 w-3 ml-1" /></a>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver</TableHead>
                  <TableHead>Kendaraan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-sm">Budi Santoso</TableCell>
                  <TableCell className="text-sm">Toyota Avanza 2023</TableCell>
                  <TableCell><Badge>Aktif</Badge></TableCell>
                  <TableCell className="text-sm">Rp 7.75jt</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">Siti Nurhaliza</TableCell>
                  <TableCell className="text-sm">Honda Brio 2024</TableCell>
                  <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                  <TableCell className="text-sm">Rp 6jt</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">Ahmad Fauzi</TableCell>
                  <TableCell className="text-sm">Gesits G1 2024</TableCell>
                  <TableCell><Badge>Aktif</Badge></TableCell>
                  <TableCell className="text-sm">Rp 1.5jt</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">Dewi Rahayu</TableCell>
                  <TableCell className="text-sm">Daihatsu Xenia 2023</TableCell>
                  <TableCell><Badge className="bg-yellow-100 text-yellow-700">Review</Badge></TableCell>
                  <TableCell className="text-sm">Rp 4.5jt</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-sm">Riko Pratama</TableCell>
                  <TableCell className="text-sm">Viar Q1 2024</TableCell>
                  <TableCell><Badge>Aktif</Badge></TableCell>
                  <TableCell className="text-sm">Rp 1.3jt</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alerts & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Peringatan Perawatan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maintenanceSchedule.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="rounded-full bg-orange-100 p-1.5">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.vehicleName}</p>
                  <p className="text-xs text-gray-500">{item.type} - {item.scheduledDate}</p>
                </div>
                <span className="text-xs font-medium">Rp {item.cost.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <a href="/admin/bookings">
                  <Car className="h-5 w-5 text-emerald-600" />
                  <span className="text-xs">Approve Booking</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <a href="/admin/users">
                  <ShieldCheck className="h-5 w-5 text-blue-600" />
                  <span className="text-xs">Verifikasi User</span>
                </a>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <a href="/admin/fleet">
                  <Car className="h-5 w-5 text-purple-600" />
                  <span className="text-xs">Tambah Kendaraan</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
