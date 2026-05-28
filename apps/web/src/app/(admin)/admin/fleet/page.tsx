'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { formatCurrency } from '@/lib/format';
import { allVehicles, type AdminVehicle } from '@/lib/mock-admin-data';
import { Plus, Search } from 'lucide-react';

export default function FleetManagementPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = allVehicles.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === 'all' || v.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const statusColors: Record<string, string> = {
    tersedia: 'bg-emerald-100 text-emerald-800',
    disewa: 'bg-blue-100 text-blue-800',
    maintenance: 'bg-amber-100 text-amber-800',
    nonaktif: 'bg-gray-100 text-gray-800',
  };

  const columns: AdminColumn<AdminVehicle>[] = [
    {
      key: 'name',
      header: 'Nama',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500">
            Foto
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.plateNumber}</p>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Kategori', render: (item) => <span className="capitalize">{item.category}</span> },
    { key: 'priceDaily', header: 'Harga/Hari', sortable: true, render: (item) => formatCurrency(item.priceDaily) },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColors[item.status]}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    {
      key: 'utilization',
      header: 'Utilisasi',
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.utilization}%` }} />
          </div>
          <span className="text-xs">{item.utilization}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Armada</h1>
          <p className="text-muted-foreground">Kelola semua kendaraan dalam armada</p>
        </div>
        <Link href="/admin/fleet/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Kendaraan
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari kendaraan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          <option value="mobil">Mobil</option>
          <option value="motor-listrik">Motor Listrik</option>
        </select>
        <select
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="tersedia">Tersedia</option>
          <option value="disewa">Disewa</option>
          <option value="maintenance">Maintenance</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      <AdminDataTable
        columns={columns}
        data={filtered}
        page={page}
        pageSize={10}
        totalItems={filtered.length}
        onPageChange={setPage}
        selectable
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        getRowId={(item) => item.id}
        bulkActions={
          <Button variant="outline" size="sm" className="text-xs">
            Nonaktifkan Terpilih
          </Button>
        }
        actions={(item) => (
          <div className="flex items-center gap-1">
            <Link href={`/admin/fleet/${item.id}`}>
              <Button variant="ghost" size="sm" className="text-xs">Edit</Button>
            </Link>
            <Link href={`/admin/fleet/${item.id}/detail`}>
              <Button variant="ghost" size="sm" className="text-xs">Detail</Button>
            </Link>
          </div>
        )}
      />
    </div>
  );
}
