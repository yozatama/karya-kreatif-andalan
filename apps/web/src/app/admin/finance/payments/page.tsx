"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { payments } from "@/lib/dashboard-data";

export default function AdminPaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("semua");
  const filtered = statusFilter === "semua" ? payments : payments.filter((p) => p.status === statusFilter);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Semua Pembayaran</h1><p className="text-navy-500 mt-1">Daftar lengkap pembayaran platform</p></div>
      <div className="flex flex-wrap gap-2">
        {["semua", "lunas", "pending", "gagal"].map((status) => (
          <button key={status} onClick={() => setStatusFilter(status)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === status ? "bg-navy-800 text-white" : "bg-gray-100 text-navy-600 hover:bg-gray-200"}`}>{status === "semua" ? "Semua" : status.charAt(0).toUpperCase() + status.slice(1)}</button>
        ))}
      </div>
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Invoice</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Deskripsi</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Tanggal</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Jumlah</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Metode</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
      </tr></thead><tbody>
        {filtered.map((payment) => (<tr key={payment.id} className="border-b last:border-0 hover:bg-gray-50">
          <td className="p-4 text-sm font-medium text-navy-800">{payment.invoice}</td>
          <td className="p-4 text-sm text-navy-600">{payment.description}</td>
          <td className="p-4 text-sm text-navy-600">{payment.date}</td>
          <td className="p-4 text-sm font-medium text-navy-800">{formatCurrency(payment.amount)}</td>
          <td className="p-4 text-sm text-navy-600">{payment.method}</td>
          <td className="p-4"><Badge variant={payment.status === "lunas" ? "success" : payment.status === "pending" ? "warning" : "danger"}>{payment.status}</Badge></td>
        </tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
