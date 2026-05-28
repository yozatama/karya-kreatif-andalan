'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewVehiclePage() {
  const [form, setForm] = useState({
    name: '', brand: '', model: '', year: '', plateNumber: '', color: '',
    transmission: 'manual', fuelType: 'Bensin', seats: '5', category: 'mobil',
    priceDaily: '', priceWeekly: '', priceMonthly: '',
    description: '', features: '',
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tambah Kendaraan</h1>
          <p className="text-muted-foreground">Isi informasi kendaraan baru</p>
        </div>
        <Link href="/admin/fleet">
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>

      <div className="space-y-6">
        {/* Informasi Dasar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Dasar</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Nama Kendaraan *</label>
              <Input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Contoh: Toyota Avanza" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Brand *</label>
              <Input value={form.brand} onChange={(e) => update('brand', e.target.value)} placeholder="Contoh: Toyota" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Model *</label>
              <Input value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="Contoh: Avanza 1.3 E MT" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tahun *</label>
              <Input type="number" value={form.year} onChange={(e) => update('year', e.target.value)} placeholder="2024" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Plat Nomor *</label>
              <Input value={form.plateNumber} onChange={(e) => update('plateNumber', e.target.value)} placeholder="B 1234 ABC" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Warna *</label>
              <Input value={form.color} onChange={(e) => update('color', e.target.value)} placeholder="Putih" />
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

        {/* Harga Sewa */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Harga Sewa</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Harian (Rp) *</label>
              <Input type="number" value={form.priceDaily} onChange={(e) => update('priceDaily', e.target.value)} placeholder="200000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Mingguan (Rp)</label>
              <Input type="number" value={form.priceWeekly} onChange={(e) => update('priceWeekly', e.target.value)} placeholder="1200000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Harga Bulanan (Rp)</label>
              <Input type="number" value={form.priceMonthly} onChange={(e) => update('priceMonthly', e.target.value)} placeholder="4000000" />
            </div>
          </CardContent>
        </Card>

        {/* Deskripsi & Fitur */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Deskripsi & Fitur</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Deskripsi</label>
              <textarea
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring"
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Deskripsi kendaraan..."
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Fitur (pisahkan dengan koma)</label>
              <Input value={form.features} onChange={(e) => update('features', e.target.value)} placeholder="AC, Bluetooth Audio, USB Charger" />
            </div>
          </CardContent>
        </Card>

        {/* Foto Kendaraan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Foto Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <p className="text-sm font-medium">Foto Utama</p>
                <p className="text-xs mt-1">Klik atau drag file untuk upload</p>
              </div>
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                <p className="text-sm font-medium">Foto Tambahan</p>
                <p className="text-xs mt-1">Klik atau drag file untuk upload</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Link href="/admin/fleet">
            <Button variant="outline">Batal</Button>
          </Link>
          <Button>Simpan Kendaraan</Button>
        </div>
      </div>
    </div>
  );
}
