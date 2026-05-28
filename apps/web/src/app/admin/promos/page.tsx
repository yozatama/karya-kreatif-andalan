"use client";

import React from "react";
import { Plus, Edit, XCircle, Tag, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const promos = [
  { id: "P-001", code: "NEWDRIVER10", type: "percentage", value: 10, usageCount: 45, usageLimit: 100, validFrom: "2024-12-01", validTo: "2025-01-31", status: "active" },
  { id: "P-002", code: "LOYAL50K", type: "fixed", value: 50000, usageCount: 20, usageLimit: 50, validFrom: "2024-12-01", validTo: "2024-12-31", status: "active" },
  { id: "P-003", code: "WEEKEND15", type: "percentage", value: 15, usageCount: 30, usageLimit: 30, validFrom: "2024-11-01", validTo: "2024-11-30", status: "expired" },
  { id: "P-004", code: "MOTOR25K", type: "fixed", value: 25000, usageCount: 12, usageLimit: 200, validFrom: "2024-12-10", validTo: "2025-02-28", status: "active" },
];

const referralStats = {
  total: 85,
  successful: 62,
  pending: 23,
  totalBonus: 31000000,
};

export default function PromosPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [promoActive, setPromoActive] = React.useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Modul Promo</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Buat Promo
        </Button>
      </div>

      {/* Promos Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Daftar Promo</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Penggunaan</TableHead>
                <TableHead>Periode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promos.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="text-sm font-mono font-medium">{promo.code}</TableCell>
                  <TableCell className="text-sm">{promo.type === "percentage" ? "Persentase" : "Nominal"}</TableCell>
                  <TableCell className="text-sm">{promo.type === "percentage" ? `${promo.value}%` : `Rp ${promo.value.toLocaleString("id-ID")}`}</TableCell>
                  <TableCell className="text-sm">{promo.usageCount}/{promo.usageLimit}</TableCell>
                  <TableCell className="text-sm">{promo.validFrom} - {promo.validTo}</TableCell>
                  <TableCell>
                    <Badge variant={promo.status === "active" ? "default" : "secondary"}>
                      {promo.status === "active" ? "Aktif" : "Kedaluwarsa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm"><XCircle className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Referral Stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Statistik Referral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border p-3 text-center">
              <Users className="h-5 w-5 mx-auto text-blue-600" />
              <p className="text-lg font-bold mt-1">{referralStats.total}</p>
              <p className="text-xs text-gray-500">Total Referral</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <TrendingUp className="h-5 w-5 mx-auto text-emerald-600" />
              <p className="text-lg font-bold mt-1">{referralStats.successful}</p>
              <p className="text-xs text-gray-500">Berhasil</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <Tag className="h-5 w-5 mx-auto text-orange-600" />
              <p className="text-lg font-bold mt-1">{referralStats.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <Tag className="h-5 w-5 mx-auto text-purple-600" />
              <p className="text-lg font-bold mt-1">Rp {(referralStats.totalBonus / 1000000).toFixed(0)}jt</p>
              <p className="text-xs text-gray-500">Total Bonus</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Promo Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Promo Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label>Kode Promo</Label>
              <Input placeholder="PROMO2024" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tipe</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="percentage">Persentase (%)</option>
                  <option value="fixed">Nominal (Rp)</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Nilai</Label>
                <Input type="number" placeholder="10" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Min. Hari Rental</Label>
                <Input type="number" placeholder="7" />
              </div>
              <div className="space-y-2">
                <Label>Max. Diskon (Rp)</Label>
                <Input type="number" placeholder="500000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Batas Penggunaan</Label>
              <Input type="number" placeholder="100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Mulai</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Selesai</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label>Aktif</Label>
              <Switch checked={promoActive} onCheckedChange={setPromoActive} />
            </div>
            <Button className="w-full" onClick={() => setDialogOpen(false)}>Simpan Promo</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
