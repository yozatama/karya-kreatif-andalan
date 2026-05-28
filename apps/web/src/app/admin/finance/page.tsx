"use client";

import { DollarSign, TrendingUp, AlertTriangle, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { payments, adminStats } from "@/lib/dashboard-data";
import Link from "next/link";

export default function AdminFinancePage() {
  const overduePayments = payments.filter((p) => p.status === "pending");
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Dashboard Keuangan</h1><p className="text-navy-500 mt-1">Pantau pendapatan dan pembayaran</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center"><DollarSign className="h-5 w-5 text-emerald-600" /></div><div><p className="text-xs text-navy-500">Total Pendapatan</p><p className="text-lg font-bold text-navy-800">{formatCurrency(adminStats.totalRevenue)}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-blue-600" /></div><div><p className="text-xs text-navy-500">Bulan Ini</p><p className="text-lg font-bold text-navy-800">{formatCurrency(48000000)}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center"><CreditCard className="h-5 w-5 text-yellow-600" /></div><div><p className="text-xs text-navy-500">Pending</p><p className="text-lg font-bold text-navy-800">{overduePayments.length}</p></div></div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-red-600" /></div><div><p className="text-xs text-navy-500">Overdue</p><p className="text-lg font-bold text-navy-800">3</p></div></div></CardContent></Card>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/finance/payments"><Card className="hover:border-emerald-200 transition-colors cursor-pointer h-full"><CardContent className="p-4 flex items-center gap-3"><CreditCard className="h-5 w-5 text-emerald-600" /><span className="font-medium text-navy-800">Semua Pembayaran</span></CardContent></Card></Link>
        <Link href="/admin/finance/penalties"><Card className="hover:border-emerald-200 transition-colors cursor-pointer h-full"><CardContent className="p-4 flex items-center gap-3"><AlertTriangle className="h-5 w-5 text-yellow-600" /><span className="font-medium text-navy-800">Penalti</span></CardContent></Card></Link>
        <Link href="/admin/finance/reports"><Card className="hover:border-emerald-200 transition-colors cursor-pointer h-full"><CardContent className="p-4 flex items-center gap-3"><TrendingUp className="h-5 w-5 text-blue-600" /><span className="font-medium text-navy-800">Laporan Revenue</span></CardContent></Card></Link>
      </div>
      <Card>
        <CardHeader><CardTitle>Pembayaran Terbaru</CardTitle></CardHeader>
        <CardContent><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b"><th className="text-left text-xs font-medium text-navy-500 pb-3">Invoice</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Tanggal</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Jumlah</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Status</th></tr></thead><tbody>
          {payments.slice(0, 5).map((payment) => (<tr key={payment.id} className="border-b last:border-0"><td className="py-3 text-sm font-medium text-navy-800">{payment.invoice}</td><td className="py-3 text-sm text-navy-600">{payment.date}</td><td className="py-3 text-sm font-medium text-navy-800">{formatCurrency(payment.amount)}</td><td className="py-3"><Badge variant={payment.status === "lunas" ? "success" : payment.status === "pending" ? "warning" : "danger"}>{payment.status}</Badge></td></tr>))}
        </tbody></table></div></CardContent>
      </Card>
    </div>
  );
}
