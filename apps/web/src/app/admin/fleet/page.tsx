"use client";

import React from "react";
import { Plus, Search, Edit, Trash2, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { vehicles } from "@/lib/mock-data";

export default function FleetPage() {
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const filteredVehicles = vehicles.filter((v) => {
    if (typeFilter !== "all" && v.type !== typeFilter) return false;
    if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manajemen Armada</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" /> Tambah Kendaraan
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari kendaraan..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["all", "car", "motorcycle"].map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                >
                  {type === "all" ? "Semua" : type === "car" ? "Mobil" : "Motor"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicles Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kendaraan</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Plat Nomor</TableHead>
                <TableHead>Harga/Hari</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-14 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Car className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{vehicle.name}</p>
                        <p className="text-xs text-gray-500">{vehicle.brand} - {vehicle.year}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{vehicle.category}</TableCell>
                  <TableCell className="text-sm font-mono">B {Math.floor(Math.random() * 9000 + 1000)} {["ABC", "DEF", "GHI", "JKL"][Math.floor(Math.random() * 4)]}</TableCell>
                  <TableCell className="text-sm">Rp {vehicle.pricePerDay.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <Badge variant={vehicle.isAvailable ? "default" : "secondary"}>
                      {vehicle.isAvailable ? "Tersedia" : "Disewa"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setDialogOpen(true)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Kendaraan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input placeholder="Nama kendaraan" />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input placeholder="Brand" />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="Model" />
              </div>
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Input type="number" placeholder="2024" />
              </div>
              <div className="space-y-2">
                <Label>Tipe</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="car">Mobil</option>
                  <option value="motorcycle">Motor</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Transmisi</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Harga/Hari</Label>
                <Input type="number" placeholder="250000" />
              </div>
              <div className="space-y-2">
                <Label>Kategori</Label>
                <select className="w-full rounded-md border p-2 text-sm">
                  <option value="MPV">MPV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="SUV">SUV</option>
                  <option value="Motor Listrik">Motor Listrik</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label>Tersedia</Label>
              <Switch checked={true} />
            </div>
            <div className="space-y-2">
              <Label>Upload Foto</Label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-md border-2 border-dashed flex items-center justify-center">
                    <Plus className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full" onClick={() => setDialogOpen(false)}>
              Simpan Kendaraan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
