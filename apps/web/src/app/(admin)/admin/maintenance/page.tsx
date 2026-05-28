'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdminStatCard } from '@/components/admin/AdminStatCard';
import { AdminDataTable, type AdminColumn } from '@/components/admin/AdminDataTable';
import { formatCurrency, formatDate } from '@/lib/format';
import { maintenanceRecords, type MaintenanceRecord } from '@/lib/mock-admin-data';
import { Wrench, AlertTriangle, DollarSign, Plus } from 'lucide-react';

type MaintenanceTab = 'jadwal' | 'riwayat';

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState<MaintenanceTab>('jadwal');

  const totalCost = maintenanceRecords.reduce((sum, m) => sum + m.cost, 0);
  const needService = maintenanceRecords.filter((m) => new Date(m.nextService) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)).length;
  const avgCost = Math.round(totalCost / maintenanceRecords.length);

  const upcoming = maintenanceRecords
    .sort((a, b) => new Date(a.nextService).getTime() - new Date(b.nextService).getTime())
    .slice(0, 8);

  const historyColumns: AdminColumn<MaintenanceRecord>[] = [
    { key: 'vehicleName', header: 'Kendaraan' },
    { key: 'type', header: 'Jenis' },
    { key: 'description', header: 'Deskripsi' },
    { key: 'cost', header: 'Biaya', render: (item) => formatCurrency(item.cost) },
    { key: 'date', header: 'Tanggal', render: (item) => formatDate(item.date) },
    { key: 'technician', header: 'Teknisi' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Maintenance</h1>
          <p className="text-muted-foreground">Kelola jadwal servis dan perbaikan kendaraan</p>
        </div>
        <Link href="/admin/maintenance/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Tambah Record
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminStatCard icon={DollarSign} label="Total Biaya Bulan Ini" value={formatCurrency(totalCost)} />
        <AdminStatCard icon={AlertTriangle} label="Kendaraan Perlu Servis" value={String(needService)} trend={{ value: '2 minggu ke depan', positive: false }} />
        <AdminStatCard icon={Wrench} label="Rata-rata Biaya/Kendaraan" value={formatCurrency(avgCost)} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-3">
        <Button variant={activeTab === 'jadwal' ? 'default' : 'ghost'} size="sm" className="text-xs" onClick={() => setActiveTab('jadwal')}>
          Jadwal Servis
        </Button>
        <Button variant={activeTab === 'riwayat' ? 'default' : 'ghost'} size="sm" className="text-xs" onClick={() => setActiveTab('riwayat')}>
          Riwayat Perbaikan
        </Button>
      </div>

      {activeTab === 'jadwal' && (
        <div className="space-y-3">
          {upcoming.map((record) => {
            const isUrgent = new Date(record.nextService) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            return (
              <Card key={record.id} className={isUrgent ? 'border-amber-300' : ''}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isUrgent ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{record.vehicleName}</p>
                      <p className="text-xs text-muted-foreground">{record.type} - {record.technician}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(record.nextService)}</p>
                    {isUrgent && <p className="text-xs text-amber-600 font-medium">Segera</p>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'riwayat' && (
        <AdminDataTable
          columns={historyColumns}
          data={maintenanceRecords}
          page={1}
          pageSize={10}
          totalItems={maintenanceRecords.length}
          getRowId={(item) => item.id}
        />
      )}
    </div>
  );
}
