'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { allVehicles } from '@/lib/mock-admin-data';

export default function NewMaintenancePage() {
  const [form, setForm] = useState({
    vehicleId: '',
    type: 'Servis Berkala',
    description: '',
    cost: '',
    performedBy: '',
    notes: '',
    nextServiceDate: '',
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tambah Record Maintenance</h1>
          <p className="text-muted-foreground">Catat servis atau perbaikan kendaraan</p>
        </div>
        <Link href="/admin/maintenance">
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Kendaraan *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.vehicleId} onChange={(e) => update('vehicleId', e.target.value)}>
                <option value="">Pilih kendaraan</option>
                {allVehicles.map((v) => (
                  <option key={v.id} value={v.id}>{v.name} ({v.plateNumber})</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Jenis *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.type} onChange={(e) => update('type', e.target.value)}>
                <option value="Servis Berkala">Servis Berkala</option>
                <option value="Ganti Oli">Ganti Oli</option>
                <option value="Perbaikan">Perbaikan</option>
                <option value="Inspeksi">Inspeksi</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium">Deskripsi *</label>
              <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Deskripsi pekerjaan..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Biaya (Rp) *</label>
              <Input type="number" value={form.cost} onChange={(e) => update('cost', e.target.value)} placeholder="850000" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Dikerjakan Oleh *</label>
              <Input value={form.performedBy} onChange={(e) => update('performedBy', e.target.value)} placeholder="Nama teknisi" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Tanggal Servis Berikutnya</label>
              <Input type="date" value={form.nextServiceDate} onChange={(e) => update('nextServiceDate', e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Catatan</label>
              <Input value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Catatan tambahan..." />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Link href="/admin/maintenance">
              <Button variant="outline">Batal</Button>
            </Link>
            <Button>Simpan Record</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
