"use client";

import React from "react";
import { CreditCard, Wallet, QrCode, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { paymentHistory, activeRentals } from "@/lib/dashboard-mock-data";

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = React.useState("all");
  const totalPaid = paymentHistory.filter((p) => p.status === "PAID").reduce((s, p) => s + p.amount, 0);
  const outstanding = paymentHistory.filter((p) => p.status === "PENDING" || p.status === "OVERDUE").reduce((s, p) => s + p.amount, 0);
  const deposit = 3500000;
  const nextDue = paymentHistory.find((p) => p.status === "PENDING");

  const filteredPayments = statusFilter === "all"
    ? paymentHistory
    : paymentHistory.filter((p) => p.status === statusFilter);

  const statCards = [
    { label: "Total Dibayar", value: totalPaid, icon: CheckCircle, color: "text-emerald-600 bg-emerald-100" },
    { label: "Tagihan Aktif", value: outstanding, icon: Clock, color: "text-orange-600 bg-orange-100" },
    { label: "Deposit Ditahan", value: deposit, icon: Wallet, color: "text-blue-600 bg-blue-100" },
    { label: "Jatuh Tempo", value: nextDue?.amount || 0, icon: AlertCircle, color: "text-red-600 bg-red-100" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Pembayaran</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-sm font-bold">Rp {stat.value.toLocaleString("id-ID")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Metode Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border p-4 text-center space-y-2">
              <CreditCard className="h-6 w-6 mx-auto text-blue-600" />
              <p className="text-sm font-medium">Virtual Account</p>
              <p className="text-xs text-gray-500">BCA, Mandiri, BNI, BRI</p>
            </div>
            <div className="rounded-lg border p-4 text-center space-y-2">
              <Wallet className="h-6 w-6 mx-auto text-green-600" />
              <p className="text-sm font-medium">E-Wallet</p>
              <p className="text-xs text-gray-500">GoPay, OVO, Dana</p>
            </div>
            <div className="rounded-lg border p-4 text-center space-y-2">
              <QrCode className="h-6 w-6 mx-auto text-purple-600" />
              <p className="text-sm font-medium">QRIS</p>
              <p className="text-xs text-gray-500">Scan & Pay</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installment Tracker */}
      {activeRentals[0] && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Progress Cicilan - {activeRentals[0].vehicleName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Terbayar</span>
              <span className="font-medium">Rp {activeRentals[0].paidAmount.toLocaleString("id-ID")} / Rp {activeRentals[0].totalAmount.toLocaleString("id-ID")}</span>
            </div>
            <Progress value={(activeRentals[0].paidAmount / activeRentals[0].totalAmount) * 100} className="h-3" />
            <p className="text-xs text-gray-500">
              {Math.round((activeRentals[0].paidAmount / activeRentals[0].totalAmount) * 100)}% dari total pembayaran
            </p>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CardTitle className="text-base">Riwayat Pembayaran</CardTitle>
            <div className="flex gap-2">
              {["all", "PAID", "PENDING", "OVERDUE"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" ? "Semua" : status === "PAID" ? "Lunas" : status === "PENDING" ? "Menunggu" : "Terlambat"}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="text-sm">{payment.date}</TableCell>
                  <TableCell className="text-sm">{payment.description}</TableCell>
                  <TableCell className="text-sm font-medium">Rp {payment.amount.toLocaleString("id-ID")}</TableCell>
                  <TableCell className="text-sm">{payment.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "PAID" ? "default" :
                        payment.status === "OVERDUE" ? "destructive" : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {payment.status === "PAID" ? "Lunas" : payment.status === "PENDING" ? "Menunggu" : "Terlambat"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payment.status === "PAID" && (
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
