"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { adminBookings } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  menunggu: { label: "Menunggu", variant: "warning" },
  disetujui: { label: "Disetujui", variant: "info" },
  aktif: { label: "Aktif", variant: "success" },
  selesai: { label: "Selesai", variant: "default" },
  ditolak: { label: "Ditolak", variant: "danger" },
};

export default function AdminBookingsPage() {
  const [filter, setFilter] = useState("semua");
  const filtered = filter === "semua" ? adminBookings : adminBookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Manajemen Booking</h1><p className="text-navy-500 mt-1">Kelola dan approve booking driver</p></div>
      <div className="flex flex-wrap gap-2">
        {["semua", "menunggu", "aktif", "selesai"].map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === status ? "bg-navy-800 text-white" : "bg-gray-100 text-navy-600 hover:bg-gray-200"}`}>
            {status === "semua" ? "Semua" : statusConfig[status]?.label || status}
          </button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Driver</th>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Kendaraan</th>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Tanggal</th>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Total</th>
                <th className="text-left text-xs font-medium text-navy-500 p-4">Aksi</th>
              </tr></thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 text-sm font-medium text-navy-800">{booking.driverName}</td>
                    <td className="p-4 text-sm text-navy-600">{booking.vehicleName}</td>
                    <td className="p-4 text-sm text-navy-600">{booking.startDate}</td>
                    <td className="p-4"><Badge variant={statusConfig[booking.status]?.variant}>{statusConfig[booking.status]?.label}</Badge></td>
                    <td className="p-4 text-sm font-medium text-navy-800">{formatCurrency(booking.totalCost)}</td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Link href={`/admin/bookings/${booking.id}`}><Button variant="ghost" size="sm">Detail</Button></Link>
                        {booking.status === "menunggu" && (<><Button size="sm" className="h-7 px-2 text-xs">Setujui</Button><Button size="sm" variant="destructive" className="h-7 px-2 text-xs">Tolak</Button></>)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
