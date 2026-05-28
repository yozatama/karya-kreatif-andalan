'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { recentBookings, type AdminBooking } from '@/lib/mock-admin-data';
import { Check, X } from 'lucide-react';

const statusTabs = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Dikonfirmasi' },
  { key: 'active', label: 'Aktif' },
  { key: 'completed', label: 'Selesai' },
  { key: 'cancelled', label: 'Dibatalkan' },
] as const;

export default function BookingManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filtered = activeTab === 'all'
    ? recentBookings
    : recentBookings.filter((b) => b.status === activeTab);

  const getCount = (status: string) =>
    status === 'all' ? recentBookings.length : recentBookings.filter((b) => b.status === status).length;

  const columns: AdminColumn<AdminBooking>[] = [
    { key: 'driverName', header: 'Driver' },
    { key: 'vehicleName', header: 'Kendaraan' },
    { key: 'startDate', header: 'Tanggal Mulai', render: (item) => formatDate(item.startDate) },
    { key: 'endDate', header: 'Tanggal Selesai', render: (item) => formatDate(item.endDate) },
    { key: 'amount', header: 'Total', render: (item) => formatCurrency(item.amount) },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Booking</h1>
        <p className="text-muted-foreground">Kelola semua pesanan booking kendaraan</p>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {statusTabs.map((tab) => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'ghost'}
            size="sm"
            className="text-xs"
            onClick={() => { setActiveTab(tab.key); setPage(1); }}
          >
            {tab.label} ({getCount(tab.key)})
          </Button>
        ))}
      </div>

      <AdminDataTable
        columns={columns}
        data={filtered}
        page={page}
        pageSize={10}
        totalItems={filtered.length}
        onPageChange={setPage}
        getRowId={(item) => item.id}
        actions={(item) => (
          <div className="flex items-center gap-1">
            {item.status === 'pending' && (
              <>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-emerald-600">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600">
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
            <Link href={`/admin/bookings/${item.id}`}>
              <Button variant="ghost" size="sm" className="text-xs">Detail</Button>
            </Link>
          </div>
        )}
      />
    </div>
  );
}
