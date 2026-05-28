"use client";

import { use } from "react";
import { ArrowLeft, Car, Clock, CreditCard, AlertTriangle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { rentals, payments } from "@/lib/dashboard-data";
import Link from "next/link";

export default function RentalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const rental = rentals.find((r) => r.id === id) || rentals[0];
  const rentalPayments = payments.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/rentals">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Detail Rental</h1>
          <p className="text-navy-500">ID: {rental.id}</p>
        </div>
      </div>

      {/* Vehicle Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Car className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-800">{rental.vehicleName}</h2>
                <p className="text-navy-500">Plat: {rental.plate}</p>
                <Badge variant={rental.status === "aktif" ? "success" : "default"}>
                  {rental.status === "aktif" ? "Aktif" : "Selesai"}
                </Badge>
              </div>
            </div>
            {rental.status === "aktif" && (
              <div className="text-center md:text-right">
                <div className="flex items-center gap-2 justify-center md:justify-end">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span className="text-2xl font-bold text-navy-800">{rental.remainingDays}</span>
                </div>
                <p className="text-sm text-navy-500">hari tersisa</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Rental Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Rental</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-navy-500">Tanggal Mulai</span>
              <span className="font-medium text-navy-800">{rental.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Tanggal Selesai</span>
              <span className="font-medium text-navy-800">{rental.endDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Tarif Bulanan</span>
              <span className="font-medium text-navy-800">{formatCurrency(rental.monthlyRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Pembayaran Berikutnya</span>
              <span className="font-medium text-emerald-600">{rental.nextPayment}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Pembayaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rentalPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-navy-800">{payment.description}</p>
                    <p className="text-xs text-navy-400">{payment.date}</p>
                  </div>
                  <Badge variant={payment.status === "lunas" ? "success" : "warning"}>
                    {payment.status === "lunas" ? "Lunas" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      {rental.status === "aktif" && (
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Laporkan Masalah
          </Button>
          <Button variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Ajukan Pengembalian
          </Button>
        </div>
      )}
    </div>
  );
}
