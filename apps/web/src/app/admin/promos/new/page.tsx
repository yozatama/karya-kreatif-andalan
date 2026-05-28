"use client";

import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NewPromoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/admin/promos"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link><div><h1 className="text-2xl font-bold text-navy-800">Buat Promo Baru</h1><p className="text-navy-500">Tambah kode promo untuk platform</p></div></div>
      <Card className="max-w-2xl"><CardHeader><CardTitle>Form Promo</CardTitle></CardHeader><CardContent><form className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4"><Input id="code" label="Kode Promo" placeholder="NEWDRIVER2024" /><Input id="name" label="Nama Promo" placeholder="Driver Baru 2024" /></div>
        <div className="grid sm:grid-cols-2 gap-4"><div><label className="mb-1.5 block text-sm font-medium text-navy-700">Tipe Diskon</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="percentage">Persentase (%)</option><option value="fixed">Nominal Tetap (Rp)</option></select></div><Input id="value" label="Nilai Diskon" type="number" placeholder="10" /></div>
        <div className="grid sm:grid-cols-2 gap-4"><Input id="limit" label="Batas Penggunaan" type="number" placeholder="100" /><div><label className="mb-1.5 block text-sm font-medium text-navy-700">Kondisi</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="all">Semua Kendaraan</option><option value="mobil">Mobil Saja</option><option value="motor">Motor Listrik Saja</option><option value="bulanan">Paket Bulanan</option></select></div></div>
        <div className="grid sm:grid-cols-2 gap-4"><Input id="validFrom" label="Berlaku Dari" type="date" /><Input id="validTo" label="Berlaku Sampai" type="date" /></div>
        <div className="flex gap-3 pt-4"><Button type="button">Simpan Promo</Button><Link href="/admin/promos"><Button type="button" variant="ghost">Batal</Button></Link></div>
      </form></CardContent></Card>
    </div>
  );
}
