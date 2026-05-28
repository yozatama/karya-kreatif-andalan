"use client";

import { use } from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { adminVehicles } from "@/lib/dashboard-data";
import { vehicles } from "@/lib/mock-data";
import Link from "next/link";

export default function FleetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const adminVehicle = adminVehicles.find((v) => v.id === id) || adminVehicles[0];
  const vehicleDetail = vehicles.find((v) => v.id === id) || vehicles[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/fleet">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy-800">{adminVehicle.name}</h1>
            <p className="text-navy-500">{adminVehicle.plate}</p>
          </div>
        </div>
        <Link href={`/admin/fleet/${id}/edit`}>
          <Button variant="outline"><Edit className="h-4 w-4 mr-2" />Edit</Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Informasi Kendaraan</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-navy-500">Nama</span><span className="font-medium text-navy-800">{adminVehicle.name}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Kategori</span><span className="font-medium text-navy-800">{adminVehicle.category}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Plat Nomor</span><span className="font-medium font-mono text-navy-800">{adminVehicle.plate}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Status</span><Badge variant={adminVehicle.status === "tersedia" ? "info" : adminVehicle.status === "disewakan" ? "success" : "warning"}>{adminVehicle.status}</Badge></div>
            <div className="flex justify-between"><span className="text-navy-500">Tahun</span><span className="font-medium text-navy-800">{vehicleDetail.year}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Transmisi</span><span className="font-medium text-navy-800 capitalize">{vehicleDetail.transmission}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Harga & Rental</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-navy-500">Harian</span><span className="font-medium text-navy-800">{formatCurrency(vehicleDetail.dailyRate)}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Mingguan</span><span className="font-medium text-navy-800">{formatCurrency(vehicleDetail.weeklyRate)}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Bulanan</span><span className="font-medium text-navy-800">{formatCurrency(vehicleDetail.monthlyRate)}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Deposit</span><span className="font-medium text-navy-800">{formatCurrency(vehicleDetail.deposit)}</span></div>
            {adminVehicle.driver && (<div className="flex justify-between pt-3 border-t"><span className="text-navy-500">Driver Saat Ini</span><span className="font-medium text-emerald-600">{adminVehicle.driver}</span></div>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
