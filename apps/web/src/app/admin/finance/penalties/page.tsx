"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

const penalties = [
  { id: "pen1", driver: "Budi Santoso", type: "Keterlambatan", amount: 250000, date: "2024-01-16", status: "lunas" },
  { id: "pen2", driver: "Ahmad Rizki", type: "Kerusakan", amount: 1500000, date: "2024-01-10", status: "pending" },
  { id: "pen3", driver: "Dewi Lestari", type: "Keterlambatan", amount: 100000, date: "2023-12-15", status: "lunas" },
];

export default function AdminPenaltiesPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Manajemen Penalti</h1><p className="text-navy-500 mt-1">Kelola denda dan penalti driver</p></div>
      <Card>
        <CardHeader><CardTitle>Buat Penalti Baru</CardTitle></CardHeader>
        <CardContent>
          <form className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Booking</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="">Pilih booking</option><option value="b1">b1 - Budi Santoso</option><option value="b2">b2 - Ahmad Rizki</option></select></div>
            <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Tipe Penalti</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="keterlambatan">Keterlambatan Pembayaran</option><option value="kerusakan">Kerusakan Kendaraan</option><option value="pelanggaran">Pelanggaran Syarat</option></select></div>
            <Input id="amount" label="Jumlah (Rp)" type="number" placeholder="250000" />
            <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Deskripsi</label><input type="text" className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" placeholder="Deskripsi penalti..." /></div>
            <div className="sm:col-span-2"><Button type="button">Buat Penalti</Button></div>
          </form>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Daftar Penalti</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b"><th className="text-left text-xs font-medium text-navy-500 pb-3">Driver</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Tipe</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Jumlah</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Tanggal</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Status</th></tr></thead><tbody>
        {penalties.map((p) => (<tr key={p.id} className="border-b last:border-0"><td className="py-3 text-sm text-navy-800">{p.driver}</td><td className="py-3 text-sm text-navy-600">{p.type}</td><td className="py-3 text-sm font-medium text-navy-800">{formatCurrency(p.amount)}</td><td className="py-3 text-sm text-navy-600">{p.date}</td><td className="py-3"><Badge variant={p.status === "lunas" ? "success" : "warning"}>{p.status}</Badge></td></tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
