"use client";

import React from "react";
import { Banknote, TrendingUp, Clock, AlertCircle, Download, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueData, paymentHistory, activeRentals } from "@/lib/dashboard-mock-data";

const penaltyData = [
  { month: "Okt", penalties: 3500000 },
  { month: "Nov", penalties: 2800000 },
  { month: "Des", penalties: 1750000 },
];

const deposits = activeRentals.map((r) => ({
  id: r.id,
  driver: r.id === "r1" ? "Budi Santoso" : "Ahmad Fauzi",
  vehicle: r.vehicleName,
  amount: r.vehicleType === "car" ? 3000000 : 500000,
  status: "held" as const,
}));

const invoices = [
  { id: "INV-2024-001", driver: "Budi Santoso", amount: 7750000, date: "2024-12-01", status: "sent" },
  { id: "INV-2024-002", driver: "Siti Nurhaliza", amount: 6200000, date: "2024-12-15", status: "draft" },
  { id: "INV-2024-003", driver: "Ahmad Fauzi", amount: 2325000, date: "2024-12-10", status: "paid" },
];

const refunds = [
  { id: "RF-001", driver: "Riko Pratama", amount: 500000, reason: "Deposit pengembalian", status: "pending" as const, date: "2024-12-14" },
  { id: "RF-002", driver: "Joko Widodo", amount: 3000000, reason: "Deposit pengembalian", status: "approved" as const, date: "2024-12-10" },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Modul Keuangan</h2>

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Pembayaran</TabsTrigger>
          <TabsTrigger value="deposits">Deposit</TabsTrigger>
          <TabsTrigger value="penalties">Denda</TabsTrigger>
          <TabsTrigger value="invoices">Invoice</TabsTrigger>
          <TabsTrigger value="refunds">Refund</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-emerald-100 text-emerald-600"><Banknote className="h-4 w-4" /></div>
                </div>
                <p className="mt-2 text-lg font-bold">Rp 310jt</p>
                <p className="text-xs text-gray-500">Revenue Bulan Ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-blue-100 text-blue-600"><TrendingUp className="h-4 w-4" /></div>
                </div>
                <p className="mt-2 text-lg font-bold">Rp 9.5jt</p>
                <p className="text-xs text-gray-500">Deposit Ditahan</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-orange-100 text-orange-600"><Clock className="h-4 w-4" /></div>
                </div>
                <p className="mt-2 text-lg font-bold">Rp 4.5jt</p>
                <p className="text-xs text-gray-500">Tagihan Belum Lunas</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg p-2 bg-red-100 text-red-600"><AlertCircle className="h-4 w-4" /></div>
                </div>
                <p className="mt-2 text-lg font-bold">Rp 1.75jt</p>
                <p className="text-xs text-gray-500">Denda Bulan Ini</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Denda Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={penaltyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000000}jt`} />
                    <Tooltip formatter={(value: number) => `Rp ${(value / 1000000).toFixed(1)}jt`} />
                    <Bar dataKey="penalties" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Metode</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="text-sm">{p.date}</TableCell>
                      <TableCell className="text-sm">{p.description}</TableCell>
                      <TableCell className="text-sm font-medium">Rp {p.amount.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-sm">{p.method}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "PAID" ? "default" : p.status === "OVERDUE" ? "destructive" : "secondary"}>
                          {p.status === "PAID" ? "Lunas" : p.status === "PENDING" ? "Menunggu" : "Terlambat"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Deposits */}
        <TabsContent value="deposits" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Kendaraan</TableHead>
                    <TableHead>Jumlah Deposit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deposits.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="text-sm">{d.driver}</TableCell>
                      <TableCell className="text-sm">{d.vehicle}</TableCell>
                      <TableCell className="text-sm font-medium">Rp {d.amount.toLocaleString("id-ID")}</TableCell>
                      <TableCell><Badge className="bg-blue-100 text-blue-700">Ditahan</Badge></TableCell>
                      <TableCell><Button variant="outline" size="sm">Refund</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Penalties */}
        <TabsContent value="penalties" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Buat Denda Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Driver</Label>
                  <select className="w-full rounded-md border p-2 text-sm">
                    <option>Pilih driver</option>
                    <option>Budi Santoso</option>
                    <option>Siti Nurhaliza</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Jumlah (Rp)</Label>
                  <Input type="number" placeholder="175000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Alasan</Label>
                <Textarea placeholder="Alasan penalti..." />
              </div>
              <Button>Buat Denda</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Invoices */}
        <TabsContent value="invoices" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button><Plus className="h-4 w-4 mr-1" /> Generate Invoice</Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Invoice</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="text-sm font-mono">{inv.id}</TableCell>
                      <TableCell className="text-sm">{inv.driver}</TableCell>
                      <TableCell className="text-sm font-medium">Rp {inv.amount.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-sm">{inv.date}</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === "paid" ? "default" : inv.status === "sent" ? "secondary" : "outline"}>
                          {inv.status === "paid" ? "Lunas" : inv.status === "sent" ? "Terkirim" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Refunds */}
        <TabsContent value="refunds" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Alasan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refunds.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="text-sm font-mono">{r.id}</TableCell>
                      <TableCell className="text-sm">{r.driver}</TableCell>
                      <TableCell className="text-sm font-medium">Rp {r.amount.toLocaleString("id-ID")}</TableCell>
                      <TableCell className="text-sm">{r.reason}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "approved" ? "default" : "secondary"}>
                          {r.status === "approved" ? "Disetujui" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {r.status === "pending" && (
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="text-emerald-600">Approve</Button>
                            <Button variant="ghost" size="sm" className="text-red-600">Reject</Button>
                          </div>
                        )}
                      </TableCell>
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
