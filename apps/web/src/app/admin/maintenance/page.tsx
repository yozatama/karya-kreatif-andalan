"use client";

import React from "react";
import { Plus, Wrench, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { maintenanceSchedule } from "@/lib/dashboard-mock-data";

const maintenanceLog = [
  { id: "ml1", vehicle: "Toyota Avanza 2023", type: "Service Berkala", description: "Ganti oli + filter", cost: 650000, date: "2024-11-20", status: "completed" },
  { id: "ml2", vehicle: "Honda Brio 2024", type: "Perbaikan", description: "Ganti kampas rem", cost: 400000, date: "2024-11-15", status: "completed" },
  { id: "ml3", vehicle: "Gesits G1 2024", type: "Inspeksi", description: "Cek baterai", cost: 250000, date: "2024-11-10", status: "completed" },
  { id: "ml4", vehicle: "Daihatsu Xenia 2023", type: "Service Berkala", description: "Service 10.000 km", cost: 800000, date: "2024-11-05", status: "completed" },
];

export default function MaintenancePage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const totalCostMonth = maintenanceSchedule.reduce((s, m) => s + m.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Modul Perawatan</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Tambah Jadwal
        </Button>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg p-2 bg-orange-100 text-orange-600"><Wrench className="h-4 w-4" /></div>
            </div>
            <p className="mt-2 text-lg font-bold">Rp {totalCostMonth.toLocaleString("id-ID")}</p>
            <p className="text-xs text-gray-500">Biaya Perawatan Bulan Ini</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg p-2 bg-blue-100 text-blue-600"><Calendar className="h-4 w-4" /></div>
            </div>
            <p className="mt-2 text-lg font-bold">{maintenanceSchedule.length}</p>
            <p className="text-xs text-gray-500">Jadwal Mendatang</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg p-2 bg-red-100 text-red-600"><AlertTriangle className="h-4 w-4" /></div>
            </div>
            <p className="mt-2 text-lg font-bold">2</p>
            <p className="text-xs text-gray-500">Perlu Segera</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Maintenance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Jadwal Perawatan Mendatang</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {maintenanceSchedule.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 p-2">
                  <Wrench className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.vehicleName}</p>
                  <p className="text-xs text-gray-500">{item.type} - {item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{item.scheduledDate}</p>
                <p className="text-xs text-gray-500">Rp {item.cost.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Maintenance Log */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Riwayat Perawatan</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kendaraan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Biaya</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceLog.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm">{item.vehicle}</TableCell>
                  <TableCell className="text-sm">{item.type}</TableCell>
                  <TableCell className="text-sm">{item.description}</TableCell>
                  <TableCell className="text-sm font-medium">Rp {item.cost.toLocaleString("id-ID")}</TableCell>
                  <TableCell className="text-sm">{item.date}</TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-700">Selesai</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Maintenance Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Perawatan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Kendaraan</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option>Pilih kendaraan</option>
                <option>Toyota Avanza 2023</option>
                <option>Honda Brio 2024</option>
                <option>Gesits G1 2024</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tipe Perawatan</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option>Service Berkala</option>
                <option>Perbaikan</option>
                <option>Inspeksi</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea placeholder="Detail perawatan..." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Biaya (Rp)</Label>
                <Input type="number" placeholder="850000" />
              </div>
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option value="scheduled">Dijadwalkan</option>
                <option value="in_progress">Sedang Dikerjakan</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
            <Button className="w-full" onClick={() => setDialogOpen(false)}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
