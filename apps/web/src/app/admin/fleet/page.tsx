"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { adminVehicles } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  tersedia: { label: "Tersedia", variant: "info" },
  disewakan: { label: "Disewakan", variant: "success" },
  maintenance: { label: "Maintenance", variant: "warning" },
};

export default function AdminFleetPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");

  const filtered = adminVehicles.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.plate.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "semua" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Manajemen Armada</h1>
          <p className="text-navy-500 mt-1">Kelola seluruh kendaraan dalam armada</p>
        </div>
        <Link href="/admin/fleet/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Armada
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input
            type="text"
            placeholder="Cari nama atau plat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="flex gap-2">
          {["semua", "tersedia", "disewakan", "maintenance"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === status ? "bg-navy-800 text-white" : "bg-gray-100 text-navy-600 hover:bg-gray-200"
              }`}
            >
              {status === "semua" ? "Semua" : statusConfig[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="hidden md:block">
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Nama</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Kategori</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Plat</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Harga/Hari</th>
                  <th className="text-left text-xs font-medium text-navy-500 p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-navy-800">{vehicle.name}</p>
                        {vehicle.driver && <p className="text-xs text-navy-400">Driver: {vehicle.driver}</p>}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-navy-600">{vehicle.category}</td>
                    <td className="p-4 text-sm font-mono text-navy-600">{vehicle.plate}</td>
                    <td className="p-4">
                      <Badge variant={statusConfig[vehicle.status]?.variant}>
                        {statusConfig[vehicle.status]?.label}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm font-medium text-navy-800">{formatCurrency(vehicle.dailyRate)}</td>
                    <td className="p-4">
                      <Link href={`/admin/fleet/${vehicle.id}`}>
                        <Button variant="ghost" size="sm">Detail</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((vehicle) => (
          <Link key={vehicle.id} href={`/admin/fleet/${vehicle.id}`}>
            <Card className="mb-3">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-navy-800">{vehicle.name}</p>
                  <Badge variant={statusConfig[vehicle.status]?.variant}>
                    {statusConfig[vehicle.status]?.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-navy-500">
                  <span>{vehicle.plate}</span>
                  <span className="font-medium text-navy-800">{formatCurrency(vehicle.dailyRate)}/hari</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
