'use client';

import { use } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allVehicles } from '@/lib/mock-admin-data';

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = allVehicles.find((v) => v.id === id) ?? allVehicles[0];

  const [form, setForm] = useState({
    name: vehicle.name,
    brand: vehicle.brand,
    model: vehicle.model,
    year: String(vehicle.year),
    plateNumber: vehicle.plateNumber,
    color: vehicle.color,
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    seats: String(vehicle.seats),
    category: vehicle.category,
    priceDaily: String(vehicle.priceDaily),
    priceWeekly: String(vehicle.priceWeekly),
    priceMonthly: String(vehicle.priceMonthly),
    description: vehicle.description,
    features: vehicle.features.join(', '),
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Kendaraan</h1>
          <p className="text-muted-foreground">{vehicle.name} - {vehicle.plateNumber}</p>
        </div>
        <Link href="/admin/fleet">
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nama Kendaraan *</label>
              <Input value={form.name} onChange={(e) => update('name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Brand *</label>
              <Input value={form.brand} onChange={(e) => update('brand', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Model *</label>
              <Input value={form.model} onChange={(e) => update('model', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tahun *</label>
              <Input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Plat Nomor *</label>
              <Input value={form.plateNumber} onChange={(e) => update('plateNumber', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Warna *</label>
              <Input value={form.color} onChange={(e) => update('color', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Transmisi *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.transmission} onChange={(e) => update('transmission', e.target.value)}>
                <option value="manual">Manual</option>
                <option value="otomatis">Otomatis</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Bahan Bakar *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.fuelType} onChange={(e) => update('fuelType', e.target.value)}>
                <option value="Bensin">Bensin</option>
                <option value="Diesel">Diesel</option>
                <option value="Listrik">Listrik</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Jumlah Kursi *</label>
              <Input type="number" value={form.seats} onChange={(e) => update('seats', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Kategori *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={(e) => update('category', e.target.value)}>
                <option value="mobil">Mobil</option>
                <option value="motor-listrik">Motor Listrik</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Harga Sewa</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Harian (Rp) *</label>
              <Input type="number" value={form.priceDaily} onChange={(e) => update('priceDaily', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Mingguan (Rp)</label>
              <Input type="number" value={form.priceWeekly} onChange={(e) => update('priceWeekly', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Bulanan (Rp)</label>
              <Input type="number" value={form.priceMonthly} onChange={(e) => update('priceMonthly', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deskripsi & Fitur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring" value={form.description} onChange={(e) => update('description', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Fitur (pisahkan dengan koma)</label>
              <Input value={form.features} onChange={(e) => update('features', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-end">
          <Link href="/admin/fleet">
            <Button variant="outline">Batal</Button>
          </Link>
          <Button>Simpan Perubahan</Button>
        </div>
      </div>
    </div>
  );
}
