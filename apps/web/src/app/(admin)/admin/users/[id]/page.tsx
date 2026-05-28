'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentViewer } from '@/components/admin/DocumentViewer';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/format';
import { allUsers, recentBookings, paymentRecords } from '@/lib/mock-admin-data';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = allUsers.find((u) => u.id === id) ?? allUsers[0];
  const [activeTab, setActiveTab] = useState<'profil' | 'dokumen' | 'rental' | 'pembayaran'>('profil');

  const userBookings = recentBookings.slice(0, 5);
  const userPayments = paymentRecords.slice(0, 5);

  const tabs = [
    { key: 'profil' as const, label: 'Profil' },
    { key: 'dokumen' as const, label: 'Dokumen' },
    { key: 'rental' as const, label: 'Riwayat Rental' },
    { key: 'pembayaran' as const, label: 'Pembayaran' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        <Link href="/admin/users">
          <Button variant="outline">Kembali</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b pb-3">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant={activeTab === tab.key ? 'default' : 'ghost'}
                size="sm"
                className="text-xs"
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Profil tab */}
          {activeTab === 'profil' && (
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><p className="text-muted-foreground">Nama</p><p className="font-medium">{user.name}</p></div>
                  <div><p className="text-muted-foreground">Email</p><p className="font-medium">{user.email}</p></div>
                  <div><p className="text-muted-foreground">Telepon</p><p className="font-medium">{user.phone}</p></div>
                  <div><p className="text-muted-foreground">Bergabung</p><p className="font-medium">{formatDate(user.joinDate)}</p></div>
                  <div><p className="text-muted-foreground">Total Rental</p><p className="font-medium">{user.totalRentals}</p></div>
                  <div><p className="text-muted-foreground">Status</p><p className="font-medium capitalize">{user.status}</p></div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dokumen tab */}
          {activeTab === 'dokumen' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DocumentViewer label="KTP" type="KTP" status={user.verificationStatus === 'verified' ? 'approved' : 'pending'} />
              <DocumentViewer label="SIM" type="SIM" status={user.verificationStatus === 'verified' ? 'approved' : 'pending'} />
              <DocumentViewer label="Selfie dengan KTP" type="Selfie" status={user.verificationStatus === 'verified' ? 'approved' : 'pending'} />
            </div>
          )}

          {/* Rental history tab */}
          {activeTab === 'rental' && (
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium text-muted-foreground">Kendaraan</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Total</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookings.map((b) => (
                        <tr key={b.id} className="border-b last:border-0">
                          <td className="py-2">{b.vehicleName}</td>
                          <td className="py-2">{formatDate(b.startDate)}</td>
                          <td className="py-2">{formatCurrency(b.amount)}</td>
                          <td className="py-2"><StatusBadge status={b.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pembayaran tab */}
          {activeTab === 'pembayaran' && (
            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Jumlah</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Metode</th>
                        <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPayments.map((p) => (
                        <tr key={p.id} className="border-b last:border-0">
                          <td className="py-2">{formatDate(p.date)}</td>
                          <td className="py-2">{formatCurrency(p.amount)}</td>
                          <td className="py-2">{p.method}</td>
                          <td className="py-2"><StatusBadge status={p.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Actions sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Aksi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.status === 'active' && (
                <Button variant="outline" className="w-full text-amber-600 border-amber-300 hover:bg-amber-50">
                  Suspend Akun
                </Button>
              )}
              {user.status === 'active' && (
                <Button variant="destructive" className="w-full">
                  Ban Akun
                </Button>
              )}
              {user.status === 'suspended' && (
                <Button className="w-full">
                  Aktifkan Kembali
                </Button>
              )}
              <Button variant="outline" className="w-full">
                Reset Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
