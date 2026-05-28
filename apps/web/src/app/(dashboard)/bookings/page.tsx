"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { bookings } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  menunggu: { label: "Menunggu", variant: "warning" },
  disetujui: { label: "Disetujui", variant: "info" },
  aktif: { label: "Aktif", variant: "success" },
  selesai: { label: "Selesai", variant: "default" },
  ditolak: { label: "Ditolak", variant: "danger" },
};

export default function BookingsPage() {
  const [filter, setFilter] = useState<string>("semua");

  const filteredBookings = filter === "semua" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Booking Saya</h1>
          <p className="text-navy-500 mt-1">Kelola semua booking kendaraan Anda</p>
        </div>
        <Link href="/bookings/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Booking Baru
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {["semua", "menunggu", "disetujui", "aktif", "selesai", "ditolak"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-navy-600 hover:bg-gray-200"
            }`}
          >
            {status === "semua" ? "Semua" : statusConfig[status]?.label || status}
          </button>
        ))}
      </div>

      {/* Booking List */}
      <div className="space-y-3">
        {filteredBookings.map((booking) => (
          <Link key={booking.id} href={`/bookings/${booking.id}`}>
            <Card className="hover:border-emerald-200 transition-colors cursor-pointer mb-3">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-navy-800">{booking.vehicleName}</p>
                      <Badge variant={statusConfig[booking.status]?.variant}>
                        {statusConfig[booking.status]?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-navy-500">
                      {booking.startDate} - {booking.endDate} ({booking.duration})
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-navy-800">{formatCurrency(booking.totalCost)}</p>
                    <p className="text-xs text-navy-400">Dibuat: {booking.createdAt}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12 text-navy-400">
            Tidak ada booking dengan status ini.
          </div>
        )}
      </div>
    </div>
  );
}
