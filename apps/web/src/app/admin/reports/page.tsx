"use client";

import React from "react";
import { Download, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { revenueData, fleetData } from "@/lib/dashboard-mock-data";

const profitData = revenueData.map((d) => ({
  ...d,
  profit: d.revenue - d.expenses,
  margin: Math.round(((d.revenue - d.expenses) / d.revenue) * 100),
}));

const topDrivers = [
  { name: "Budi Santoso", revenue: 7750000, trips: 450, rating: 4.9 },
  { name: "Joko Widodo", revenue: 8060000, trips: 520, rating: 4.8 },
  { name: "Siti Nurhaliza", revenue: 6200000, trips: 380, rating: 4.9 },
  { name: "Andi Wijaya", revenue: 5500000, trips: 340, rating: 4.7 },
  { name: "Dewi Rahayu", revenue: 4500000, trips: 290, rating: 4.8 },
];

const vehicleProfitability = [
  { name: "Toyota Avanza", revenue: 45000000, cost: 8500000, profit: 36500000 },
  { name: "Honda Brio", revenue: 32000000, cost: 6200000, profit: 25800000 },
  { name: "Gesits G1", revenue: 18000000, cost: 3500000, profit: 14500000 },
  { name: "Suzuki Ertiga", revenue: 38000000, cost: 7800000, profit: 30200000 },
  { name: "Daihatsu Xenia", revenue: 28000000, cost: 5600000, profit: 22400000 },
];

export default function ReportsPage() {
  const [dateStart, setDateStart] = React.useState("2024-01-01");
  const [dateEnd, setDateEnd] = React.useState("2024-12-31");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Laporan</h2>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
            className="h-9 w-36"
          />
          <span className="text-sm text-gray-500">-</span>
          <Input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
            className="h-9 w-36"
          />
        </div>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="flex-wrap">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="fleet">Armada</TabsTrigger>
          <TabsTrigger value="driver">Driver</TabsTrigger>
          <TabsTrigger value="profitability">Profitabilitas</TabsTrigger>
        </TabsList>

        {/* Revenue Report */}
        <TabsContent value="revenue" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Download CSV
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Revenue Bulanan 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}jt`} />
                    <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)}jt`} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b98140" name="Revenue" />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef444440" name="Expenses" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-emerald-600">Rp 2.87M</p>
                <p className="text-xs text-gray-500">Total Revenue 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-600">Rp 688jt</p>
                <p className="text-xs text-gray-500">Total Expenses 2024</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">76%</p>
                <p className="text-xs text-gray-500">Avg. Profit Margin</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fleet Report */}
        <TabsContent value="fleet" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Utilisasi per Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fleetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#94a3b8" name="Total" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rented" fill="#10b981" name="Disewa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Kendaraan Paling Profitable</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vehicleProfitability} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000000}jt`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                    <Bar dataKey="profit" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Driver Report */}
        <TabsContent value="driver" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Download CSV
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">78%</p>
                <p className="text-xs text-gray-500">Retention Rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">38</p>
                <p className="text-xs text-gray-500">Driver Baru (Bulan Ini)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">52</p>
                <p className="text-xs text-gray-500">Driver Returning</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Top Drivers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Total Trip</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topDrivers.map((d) => (
                    <TableRow key={d.name}>
                      <TableCell className="text-sm font-medium">{d.name}</TableCell>
                      <TableCell className="text-sm">Rp {d.revenue.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-sm">{d.trips}</TableCell>
                      <TableCell className="text-sm">{d.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profitability */}
        <TabsContent value="profitability" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Download PDF
            </Button>
          </div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Revenue vs Biaya</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={profitData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}jt`} />
                    <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(0)}jt`} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Biaya" />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" name="Profit" strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profitabilitas per Kendaraan</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kendaraan</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Biaya</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Margin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicleProfitability.map((v) => (
                    <TableRow key={v.name}>
                      <TableCell className="text-sm font-medium">{v.name}</TableCell>
                      <TableCell className="text-sm">Rp {(v.revenue / 1000000).toFixed(0)}jt</TableCell>
                      <TableCell className="text-sm">Rp {(v.cost / 1000000).toFixed(1)}jt</TableCell>
                      <TableCell className="text-sm font-medium text-emerald-600">Rp {(v.profit / 1000000).toFixed(1)}jt</TableCell>
                      <TableCell className="text-sm">{Math.round((v.profit / v.revenue) * 100)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
