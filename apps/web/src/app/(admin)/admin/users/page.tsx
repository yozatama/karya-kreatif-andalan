'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { allUsers, type AdminUser } from '@/lib/mock-admin-data';
import { Search, AlertTriangle } from 'lucide-react';

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const filtered = allUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchVerification = verificationFilter === 'all' || u.verificationStatus === verificationFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchVerification && matchStatus;
  });

  const verificationBadge = (status: string) => {
    const styles: Record<string, string> = {
      verified: 'bg-emerald-100 text-emerald-800',
      pending: 'bg-amber-100 text-amber-800',
      rejected: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      verified: 'Terverifikasi',
      pending: 'Pending',
      rejected: 'Ditolak',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const columns: AdminColumn<AdminUser>[] = [
    {
      key: 'name',
      header: 'Nama',
      render: (item) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.name}</span>
          {item.fraudFlag && <AlertTriangle className="h-3.5 w-3.5 text-red-500" />}
        </div>
      ),
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Telepon' },
    { key: 'verificationStatus', header: 'Verifikasi', render: (item) => verificationBadge(item.verificationStatus) },
    { key: 'totalRentals', header: 'Total Rental' },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === 'active' ? 'bg-emerald-100 text-emerald-800' : item.status === 'suspended' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
          {item.status === 'active' ? 'Aktif' : item.status === 'suspended' ? 'Suspended' : 'Banned'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">Kelola semua pengguna terdaftar</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari pengguna..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)}>
          <option value="all">Semua Verifikasi</option>
          <option value="verified">Terverifikasi</option>
          <option value="pending">Pending</option>
          <option value="rejected">Ditolak</option>
        </select>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Semua Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
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
          <Link href={`/admin/users/${item.id}`}>
            <Button variant="ghost" size="sm" className="text-xs">Detail</Button>
          </Link>
        )}
      />
    </div>
  );
}
