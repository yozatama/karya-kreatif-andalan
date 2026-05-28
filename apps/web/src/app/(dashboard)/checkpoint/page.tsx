'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatDate } from '@/lib/format';
import { checkpointRecords, activeRental } from '@/lib/mock-dashboard-data';
import { ClipboardCheck, Plus } from 'lucide-react';

export default function CheckpointListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Checkpoint Kendaraan</h1>
        {activeRental && (
          <Link href={`/checkpoint/${activeRental.id}`}>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Buat Checkpoint
            </Button>
          </Link>
        )}
      </div>

      {checkpointRecords.length === 0 ? (
        <div className="py-12 text-center">
          <ClipboardCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Belum ada catatan checkpoint</p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkpointRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{record.vehicle}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.type === 'pickup' ? 'Pickup' : record.type === 'return' ? 'Pengembalian' : 'Periodik'} - {formatDate(record.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={record.status === 'completed' ? 'completed' : 'pending'} />
                    <p className="text-xs text-muted-foreground mt-1">{record.odometerReading.toLocaleString()} km</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
