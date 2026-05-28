"use client";

import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminVehicles } from "@/lib/dashboard-data";
import { vehicles } from "@/lib/mock-data";
import Link from "next/link";

export default function EditFleetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const adminVehicle = adminVehicles.find((v) => v.id === id) || adminVehicles[0];
  const vehicleDetail = vehicles.find((v) => v.id === id) || vehicles[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/admin/fleet/${id}`}><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link>
        <div><h1 className="text-2xl font-bold text-navy-800">Edit {adminVehicle.name}</h1><p className="text-navy-500">{adminVehicle.plate}</p></div>
      </div>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Edit Informasi Kendaraan</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input id="name" label="Nama Kendaraan" defaultValue={adminVehicle.name} />
              <Input id="plate" label="Nomor Plat" defaultValue={adminVehicle.plate} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Kategori</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" defaultValue={adminVehicle.category === "Mobil" ? "mobil" : "motor-listrik"}><option value="mobil">Mobil</option><option value="motor-listrik">Motor Listrik</option></select></div>
              <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Status</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm" defaultValue={adminVehicle.status}><option value="tersedia">Tersedia</option><option value="disewakan">Disewakan</option><option value="maintenance">Maintenance</option></select></div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Input id="dailyRate" label="Harga Harian" type="number" defaultValue={String(vehicleDetail.dailyRate)} />
              <Input id="weeklyRate" label="Harga Mingguan" type="number" defaultValue={String(vehicleDetail.weeklyRate)} />
              <Input id="monthlyRate" label="Harga Bulanan" type="number" defaultValue={String(vehicleDetail.monthlyRate)} />
            </div>
            <Input id="deposit" label="Deposit" type="number" defaultValue={String(vehicleDetail.deposit)} />
            <div className="flex gap-3 pt-4"><Button type="button">Simpan Perubahan</Button><Link href={`/admin/fleet/${id}`}><Button type="button" variant="ghost">Batal</Button></Link></div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
