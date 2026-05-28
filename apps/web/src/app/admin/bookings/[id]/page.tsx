"use client";

import { use } from "react";
import { ArrowLeft, CheckCircle, XCircle, Clock, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { adminBookings, adminVehicles } from "@/lib/dashboard-data";
import Link from "next/link";

export default function AdminBookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const booking = adminBookings.find((b) => b.id === id) || adminBookings[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/bookings"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link>
        <div><h1 className="text-2xl font-bold text-navy-800">Detail Booking</h1><p className="text-navy-500">ID: {booking.id}</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Informasi Booking</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-navy-500">Driver</span><span className="font-medium text-navy-800">{booking.driverName}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Kendaraan</span><span className="font-medium text-navy-800">{booking.vehicleName}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Tanggal Mulai</span><span className="font-medium text-navy-800">{booking.startDate}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Status</span><Badge variant={booking.status === "menunggu" ? "warning" : booking.status === "aktif" ? "success" : "default"}>{booking.status}</Badge></div>
            <div className="flex justify-between border-t pt-3"><span className="font-semibold text-navy-800">Total</span><span className="font-bold text-emerald-600">{formatCurrency(booking.totalCost)}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Aksi Admin</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {booking.status === "menunggu" && (<>
              <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Assign Kendaraan</label>
                <select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm">
                  {adminVehicles.filter((v) => v.status === "tersedia").map((v) => (<option key={v.id} value={v.id}>{v.name} - {v.plate}</option>))}
                </select>
              </div>
              <div className="flex gap-3"><Button className="flex-1"><CheckCircle className="h-4 w-4 mr-2" />Setujui</Button><Button variant="destructive" className="flex-1"><XCircle className="h-4 w-4 mr-2" />Tolak</Button></div>
              <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Alasan Penolakan (jika ditolak)</label><textarea className="w-full h-20 rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none" placeholder="Masukkan alasan..." /></div>
            </>)}
            {booking.status === "aktif" && (<div className="space-y-3"><Button variant="outline" className="w-full"><Clock className="h-4 w-4 mr-2" />Perpanjang Rental</Button><Button variant="outline" className="w-full"><Car className="h-4 w-4 mr-2" />Proses Pengembalian</Button></div>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
