"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { payments } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  lunas: { label: "Lunas", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  gagal: { label: "Gagal", variant: "danger" },
};

export default function PaymentsPage() {
  const [filter, setFilter] = useState<string>("semua");
  const filtered = filter === "semua" ? payments : payments.filter((p) => p.status === filter);

  // Deposit tracking
  const totalDeposit = 2000000;
  const paidDeposit = 2000000;
  const depositProgress = (paidDeposit / totalDeposit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Pembayaran</h1>
        <p className="text-navy-500 mt-1">Riwayat dan status pembayaran Anda</p>
      </div>

      {/* Deposit Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-navy-500">Progress Deposit</span>
            <span className="text-sm font-medium text-navy-800">{formatCurrency(paidDeposit)} / {formatCurrency(totalDeposit)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-emerald-500 h-3 rounded-full" style={{ width: `${depositProgress}%` }} />
          </div>
          <p className="text-xs text-navy-400 mt-2">Deposit akan dikembalikan setelah rental selesai dan kendaraan dalam kondisi baik.</p>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["semua", "lunas", "pending", "gagal"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === status ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-navy-600 hover:bg-gray-200"
            }`}
          >
            {status === "semua" ? "Semua" : statusConfig[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Payment Table - Desktop */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Invoice</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Tanggal</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Jumlah</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Metode</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((payment) => (
                  <tr key={payment.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <Link href={`/payments/${payment.id}`} className="text-sm font-medium text-emerald-600 hover:underline">
                        {payment.invoice}
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-navy-600">{payment.date}</td>
                    <td className="p-4 text-sm font-medium text-navy-800">{formatCurrency(payment.amount)}</td>
                    <td className="p-4 text-sm text-navy-600">{payment.method}</td>
                    <td className="p-4">
                      <Badge variant={statusConfig[payment.status]?.variant}>
                        {statusConfig[payment.status]?.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Payment Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((payment) => (
          <Link key={payment.id} href={`/payments/${payment.id}`}>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-emerald-600">{payment.invoice}</span>
                  <Badge variant={statusConfig[payment.status]?.variant}>
                    {statusConfig[payment.status]?.label}
                  </Badge>
                </div>
                <p className="text-sm text-navy-500">{payment.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-navy-400">{payment.date}</span>
                  <span className="font-semibold text-navy-800">{formatCurrency(payment.amount)}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
