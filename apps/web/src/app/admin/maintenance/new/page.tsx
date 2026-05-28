"use client";

import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { adminVehicles } from "@/lib/dashboard-data";

export default function NewMaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/admin/maintenance"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link><div><h1 className="text-2xl font-bold text-navy-800">Catat Maintenance Baru</h1><p className="text-navy-500">Tambah record maintenance kendaraan</p></div></div>
      <Card className="max-w-2xl"><CardHeader><CardTitle>Form Maintenance</CardTitle></CardHeader><CardContent><form className="space-y-4">
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Kendaraan</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="">Pilih kendaraan</option>{adminVehicles.map((v) => (<option key={v.id} value={v.id}>{v.name} - {v.plate}</option>))}</select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Tipe Maintenance</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="service">Service Berkala</option><option value="perbaikan">Perbaikan</option><option value="ganti_parts">Ganti Parts</option><option value="body_repair">Body Repair</option></select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Deskripsi</label><textarea className="w-full h-24 rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:border-emerald-500 focus:outline-none" placeholder="Detail pekerjaan..." /></div>
        <Input id="cost" label="Biaya (Rp)" type="number" placeholder="850000" />
        <Input id="date" label="Tanggal" type="date" />
        <Input id="nextMaintenance" label="Maintenance Berikutnya" type="date" />
        <div className="flex gap-3 pt-4"><Button type="button">Simpan</Button><Link href="/admin/maintenance"><Button type="button" variant="ghost">Batal</Button></Link></div>
      </form></CardContent></Card>
    </div>
  );
}
