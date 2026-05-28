'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { formatCurrency, formatDate } from '@/lib/format';
import { promoList, type PromoItem } from '@/lib/mock-admin-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

export default function PromosPage() {
  const [showActive, setShowActive] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = promoList.filter((p) => showActive ? p.status === 'active' : p.status === 'expired');

  const columns: AdminColumn<PromoItem>[] = [
    { key: 'code', header: 'Kode', render: (item) => <span className="font-mono font-medium">{item.code}</span> },
    { key: 'type', header: 'Tipe', render: (item) => item.type === 'percentage' ? 'Persentase' : 'Nominal' },
    { key: 'value', header: 'Nilai', render: (item) => item.type === 'percentage' ? `${item.value}%` : formatCurrency(item.value) },
    { key: 'validFrom', header: 'Valid Dari', render: (item) => formatDate(item.validFrom) },
    { key: 'validUntil', header: 'Valid Sampai', render: (item) => formatDate(item.validUntil) },
    { key: 'used', header: 'Terpakai/Maks', render: (item) => `${item.used}/${item.maxUses}` },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'}`}>
          {item.status === 'active' ? 'Aktif' : 'Expired'}
        </span>
      ),
    },
    { key: 'target', header: 'Target' },
  ];

  const referralData = [
    { code: 'REF-BUDI01', referrer: 'Budi Santoso', totalReferrals: 8, totalRewards: 800000 },
    { code: 'REF-AGUS01', referrer: 'Agus Pratama', totalReferrals: 12, totalRewards: 1200000 },
    { code: 'REF-MAYA01', referrer: 'Maya Sari', totalReferrals: 5, totalRewards: 500000 },
    { code: 'REF-HEND01', referrer: 'Hendra Wijaya', totalReferrals: 3, totalRewards: 300000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Promo & Marketing</h1>
          <p className="text-muted-foreground">Kelola kode promo dan program referral</p>
        </div>
        <Button className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" /> Tambah Promo
        </Button>
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        <Button variant={showActive ? 'default' : 'ghost'} size="sm" onClick={() => setShowActive(true)}>Aktif</Button>
        <Button variant={!showActive ? 'default' : 'ghost'} size="sm" onClick={() => setShowActive(false)}>Expired</Button>
      </div>

      <AdminDataTable
        columns={columns}
        data={filtered}
        page={1}
        pageSize={10}
        totalItems={filtered.length}
        getRowId={(item) => item.id}
      />

      {/* Referral section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Program Referral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium text-muted-foreground">Kode</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Referrer</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Total Referral</th>
                  <th className="pb-2 text-left font-medium text-muted-foreground">Total Reward</th>
                </tr>
              </thead>
              <tbody>
                {referralData.map((ref) => (
                  <tr key={ref.code} className="border-b last:border-0">
                    <td className="py-2 font-mono">{ref.code}</td>
                    <td className="py-2">{ref.referrer}</td>
                    <td className="py-2">{ref.totalReferrals}</td>
                    <td className="py-2">{formatCurrency(ref.totalRewards)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add promo dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Promo Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Kode Promo</label>
              <div className="flex gap-2">
                <Input placeholder="PROMO2025" />
                <Button variant="outline" size="sm" className="shrink-0">Auto</Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Tipe</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="percentage">Persentase</option>
                  <option value="fixed">Nominal</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Nilai</label>
                <Input type="number" placeholder="20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Valid Dari</label>
                <Input type="date" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Valid Sampai</label>
                <Input type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Min. Hari Sewa</label>
                <Input type="number" placeholder="7" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Maks. Penggunaan</label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Target</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="all">Semua</option>
                <option value="mobil">Mobil saja</option>
                <option value="motor">Motor saja</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={() => setDialogOpen(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
