"use client";

import { useState } from "react";
import { ArrowLeft, Car, Image, DollarSign, Calendar, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const steps = [
  { id: 1, label: "Info Dasar", icon: Car },
  { id: 2, label: "Foto", icon: Image },
  { id: 3, label: "Harga", icon: DollarSign },
  { id: 4, label: "Ketersediaan", icon: Calendar },
];

export default function NewFleetPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/fleet"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link>
        <div><h1 className="text-2xl font-bold text-navy-800">Tambah Armada Baru</h1><p className="text-navy-500">Lengkapi informasi kendaraan baru</p></div>
      </div>
      <div className="flex items-center justify-between max-w-lg">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step.id ? "bg-emerald-500 text-white" : "bg-gray-200 text-navy-400"}`}>
                {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
              </div>
              <span className="text-xs mt-1 text-navy-500 hidden sm:block">{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${currentStep > step.id ? "bg-emerald-500" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>
      {currentStep === 1 && (
        <Card className="max-w-lg"><CardHeader><CardTitle>Informasi Dasar</CardTitle></CardHeader><CardContent className="space-y-4">
          <Input id="name" label="Nama Kendaraan" placeholder="Contoh: Toyota Avanza" />
          <Input id="brand" label="Merek" placeholder="Contoh: Toyota" />
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Kategori</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="mobil">Mobil</option><option value="motor-listrik">Motor Listrik</option></select></div>
          <Input id="year" label="Tahun" type="number" placeholder="2024" />
          <Input id="plate" label="Nomor Plat" placeholder="B 1234 KKA" />
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Transmisi</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="manual">Manual</option><option value="automatic">Automatic</option></select></div>
          <Input id="seats" label="Kapasitas Penumpang" type="number" placeholder="7" />
        </CardContent></Card>
      )}
      {currentStep === 2 && (
        <Card className="max-w-lg"><CardHeader><CardTitle>Upload Foto</CardTitle></CardHeader><CardContent>
          <div className="grid grid-cols-2 gap-4">
            {["Depan", "Belakang", "Samping", "Interior"].map((label) => (
              <div key={label}><label className="text-sm font-medium text-navy-700 mb-1 block">{label}</label><div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center"><div className="text-center"><Image className="h-6 w-6 text-navy-400 mx-auto" /><p className="text-xs text-navy-400 mt-1">Upload</p></div></div></div>
            ))}
          </div>
        </CardContent></Card>
      )}
      {currentStep === 3 && (
        <Card className="max-w-lg"><CardHeader><CardTitle>Harga Rental</CardTitle></CardHeader><CardContent className="space-y-4">
          <Input id="dailyRate" label="Harga Harian (Rp)" type="number" placeholder="250000" />
          <Input id="weeklyRate" label="Harga Mingguan (Rp)" type="number" placeholder="1500000" />
          <Input id="monthlyRate" label="Harga Bulanan (Rp)" type="number" placeholder="5000000" />
          <Input id="deposit" label="Deposit (Rp)" type="number" placeholder="2000000" />
        </CardContent></Card>
      )}
      {currentStep === 4 && (
        <Card className="max-w-lg"><CardHeader><CardTitle>Ketersediaan</CardTitle></CardHeader><CardContent className="space-y-4">
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Status</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="tersedia">Tersedia</option><option value="maintenance">Maintenance</option></select></div>
          <Input id="availableFrom" label="Tersedia Mulai" type="date" />
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Platform</label><div className="space-y-2">{["Gojek", "Grab", "Maxim", "InDrive"].map((p) => (<label key={p} className="flex items-center gap-2 text-sm text-navy-700"><input type="checkbox" className="rounded border-gray-300" defaultChecked />{p}</label>))}</div></div>
        </CardContent></Card>
      )}
      <div className="flex justify-between pt-4 border-t max-w-lg">
        <Button variant="ghost" onClick={() => setCurrentStep((s) => Math.max(1, s - 1))} disabled={currentStep === 1}>Kembali</Button>
        <Button onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}>{currentStep === 4 ? "Simpan Armada" : "Lanjutkan"}</Button>
      </div>
    </div>
  );
}
