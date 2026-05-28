'use client';

import { use } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/format';
import { allVehicles, recentBookings, maintenanceRecords } from '@/lib/mock-admin-data';

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const vehicle = allVehicles.find((v) => v.id === id) ?? allVehicles[0];

  const vehicleBookings = recentBookings.filter((b) => b.vehicleName === vehicle.name).slice(0, 5);
  const vehicleMaintenance = maintenanceRecords.filter((m) => m.vehicleName === vehicle.name);

  const utilizationData = [
    { month: 'Okt', persen: 72 },
    { month: 'Nov', persen: 78 },
    { month: 'Des', persen: 85 },
    { month: 'Jan', persen: vehicle.utilization },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{vehicle.name}</h1>
          <p className="text-muted-foreground">{vehicle.brand} {vehicle.model} - {vehicle.plateNumber}</p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/fleet/${id}`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/admin/fleet">
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informasi Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Kategori</span><span className="capitalize">{vehicle.category}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Transmisi</span><span className="capitalize">{vehicle.transmission}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Bahan Bakar</span><span>{vehicle.fuelType}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tahun</span><span>{vehicle.year}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Warna</span><span>{vehicle.color}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Kursi</span><span>{vehicle.seats}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge variant="secondary" className="capitalize">{vehicle.status}</Badge></div>
          </CardContent>
        </Card>

        {/* Revenue & utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Performa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Revenue Total</span><span className="font-medium">{formatCurrency(vehicle.revenueEarned)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Utilisasi</span><span className="font-medium">{vehicle.utilization}%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Harga/Hari</span><span>{formatCurrency(vehicle.priceDaily)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Harga/Minggu</span><span>{formatCurrency(vehicle.priceWeekly)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Harga/Bulan</span><span>{formatCurrency(vehicle.priceMonthly)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Maintenance Terakhir</span><span>{formatDate(vehicle.lastMaintenance)}</span></div>
          </CardContent>
        </Card>

        {/* Utilization chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Utilisasi Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="persen" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Booking history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Booking</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleBookings.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Belum ada booking</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Driver</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Total</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleBookings.map((b) => (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-2">{b.driverName}</td>
                      <td className="py-2">{formatDate(b.startDate)}</td>
                      <td className="py-2">{formatCurrency(b.amount)}</td>
                      <td className="py-2"><Badge variant="secondary" className="capitalize">{b.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Maintenance history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riwayat Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleMaintenance.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">Belum ada catatan maintenance</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium text-muted-foreground">Jenis</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Deskripsi</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Biaya</th>
                    <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleMaintenance.map((m) => (
                    <tr key={m.id} className="border-b last:border-0">
                      <td className="py-2">{m.type}</td>
                      <td className="py-2">{m.description}</td>
                      <td className="py-2">{formatCurrency(m.cost)}</td>
                      <td className="py-2">{formatDate(m.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
