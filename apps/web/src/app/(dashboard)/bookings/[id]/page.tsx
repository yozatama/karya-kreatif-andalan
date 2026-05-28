"use client";

import { use } from "react";
import { ArrowLeft, Car, Calendar, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { bookings, payments } from "@/lib/dashboard-data";
import Link from "next/link";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  menunggu: { label: "Menunggu", variant: "warning" },
  disetujui: { label: "Disetujui", variant: "info" },
  aktif: { label: "Aktif", variant: "success" },
  selesai: { label: "Selesai", variant: "default" },
  ditolak: { label: "Ditolak", variant: "danger" },
};

const timelineSteps = [
  { key: "submitted", label: "Booking Diajukan", icon: Calendar },
  { key: "approved", label: "Disetujui Admin", icon: CheckCircle },
  { key: "active", label: "Rental Aktif", icon: Car },
  { key: "completed", label: "Selesai", icon: CheckCircle },
];

function getTimelineProgress(status: string): number {
  switch (status) {
    case "menunggu": return 1;
    case "disetujui": return 2;
    case "aktif": return 3;
    case "selesai": return 4;
    case "ditolak": return 0;
    default: return 0;
  }
}

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const booking = bookings.find((b) => b.id === id) || bookings[0];
  const bookingPayments = payments.slice(0, 2);
  const progress = getTimelineProgress(booking.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/bookings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Detail Booking</h1>
          <p className="text-navy-500">ID: {booking.id}</p>
        </div>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Status Booking
            <Badge variant={statusConfig[booking.status]?.variant}>
              {statusConfig[booking.status]?.label}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {booking.status === "ditolak" ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
              <XCircle className="h-6 w-6 text-red-500" />
              <div>
                <p className="font-medium text-red-700">Booking Ditolak</p>
                <p className="text-sm text-red-600">Dokumen verifikasi tidak lengkap. Silakan upload ulang.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between max-w-xl">
              {timelineSteps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index < progress ? "bg-emerald-500 text-white" : "bg-gray-200 text-navy-400"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] mt-1 text-navy-500 text-center max-w-16">{step.label}</span>
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className={`w-8 sm:w-16 h-0.5 mx-1 ${index < progress - 1 ? "bg-emerald-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-navy-500">Kendaraan</span>
              <span className="font-medium text-navy-800">{booking.vehicleName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Tanggal Mulai</span>
              <span className="font-medium text-navy-800">{booking.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Tanggal Selesai</span>
              <span className="font-medium text-navy-800">{booking.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Durasi</span>
              <span className="font-medium text-navy-800">{booking.duration}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="font-semibold text-navy-800">Total Biaya</span>
              <span className="font-bold text-emerald-600">{formatCurrency(booking.totalCost)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riwayat Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookingPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-navy-800">{payment.invoice}</p>
                    <p className="text-xs text-navy-500">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(payment.amount)}</p>
                    <Badge variant={payment.status === "lunas" ? "success" : payment.status === "pending" ? "warning" : "danger"}>
                      {payment.status === "lunas" ? "Lunas" : payment.status === "pending" ? "Pending" : "Gagal"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      {booking.status === "aktif" && (
        <div className="flex gap-3">
          <Button variant="outline">Perpanjang Rental</Button>
          <Button variant="destructive">Ajukan Pengembalian</Button>
        </div>
      )}
    </div>
  );
}
