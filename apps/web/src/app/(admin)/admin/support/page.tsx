'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatDate } from '@/lib/format';
import { supportTicketsList, type SupportTicket } from '@/lib/mock-admin-data';

export default function AdminSupportPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = statusFilter === 'all'
    ? supportTicketsList
    : supportTicketsList.filter((t) => t.status === statusFilter);

  const priorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-amber-100 text-amber-800',
      low: 'bg-blue-100 text-blue-800',
    };
    const labels: Record<string, string> = { high: 'Tinggi', medium: 'Sedang', low: 'Rendah' };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  const columns: AdminColumn<SupportTicket>[] = [
    { key: 'id', header: 'Tiket#' },
    { key: 'userName', header: 'Pengguna' },
    { key: 'subject', header: 'Subjek' },
    { key: 'category', header: 'Kategori' },
    { key: 'priority', header: 'Prioritas', render: (item) => priorityBadge(item.priority) },
    { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
    { key: 'createdAt', header: 'Tanggal', render: (item) => formatDate(item.createdAt) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Tiket Support</h1>
        <p className="text-muted-foreground">Kelola tiket bantuan dari pengguna</p>
      </div>

      <div className="flex gap-2">
        {['all', 'open', 'in_progress', 'closed'].map((status) => (
          <Button
            key={status}
            variant={statusFilter === status ? 'default' : 'ghost'}
            size="sm"
            className="text-xs"
            onClick={() => setStatusFilter(status)}
          >
            {status === 'all' ? 'Semua' : status === 'open' ? 'Buka' : status === 'in_progress' ? 'Proses' : 'Selesai'}
            {' '}({status === 'all' ? supportTicketsList.length : supportTicketsList.filter((t) => t.status === status).length})
          </Button>
        ))}
      </div>

      <AdminDataTable
        columns={columns}
        data={filtered}
        page={1}
        pageSize={10}
        totalItems={filtered.length}
        getRowId={(item) => item.id}
        actions={() => (
          <Button variant="ghost" size="sm" className="text-xs">Lihat</Button>
        )}
      />
    </div>
  );
}
