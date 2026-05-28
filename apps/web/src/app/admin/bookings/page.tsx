"use client";

import React from "react";
import { Search, CheckCircle, XCircle, Play, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const bookings = [
  { id: "BK-001", driver: "Budi Santoso", vehicle: "Toyota Avanza 2023", startDate: "2024-12-01", endDate: "2025-01-01", duration: "31 hari", amount: "Rp 7.750.000", status: "ACTIVE" },
  { id: "BK-002", driver: "Siti Nurhaliza", vehicle: "Honda Brio 2024", startDate: "2024-12-15", endDate: "2025-01-15", duration: "31 hari", amount: "Rp 6.200.000", status: "PENDING" },
  { id: "BK-003", driver: "Ahmad Fauzi", vehicle: "Gesits G1 2024", startDate: "2024-12-10", endDate: "2025-01-10", duration: "31 hari", amount: "Rp 2.325.000", status: "APPROVED" },
  { id: "BK-004", driver: "Dewi Rahayu", vehicle: "Daihatsu Xenia 2023", startDate: "2024-12-18", endDate: "2025-01-18", duration: "31 hari", amount: "Rp 6.820.000", status: "PENDING" },
  { id: "BK-005", driver: "Riko Pratama", vehicle: "Viar Q1 2024", startDate: "2024-11-01", endDate: "2024-12-01", duration: "30 hari", amount: "Rp 1.950.000", status: "COMPLETED" },
  { id: "BK-006", driver: "Joko Widodo", vehicle: "Suzuki Ertiga 2023", startDate: "2024-12-05", endDate: "2025-01-05", duration: "31 hari", amount: "Rp 8.060.000", status: "ACTIVE" },
  { id: "BK-007", driver: "Maya Putri", vehicle: "Honda PCX Electric 2024", startDate: "2024-12-20", endDate: "2025-01-20", duration: "31 hari", amount: "Rp 2.790.000", status: "PENDING" },
];

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [detailOpen, setDetailOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<typeof bookings[0] | null>(null);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (search && !b.driver.toLowerCase().includes(search.toLowerCase()) && !b.vehicle.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return <Badge>Aktif</Badge>;
      case "PENDING": return <Badge variant="secondary">Pending</Badge>;
      case "APPROVED": return <Badge className="bg-blue-100 text-blue-700">Disetujui</Badge>;
      case "COMPLETED": return <Badge className="bg-green-100 text-green-700">Selesai</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Manajemen Booking</h2>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Cari driver atau kendaraan..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "PENDING", "APPROVED", "ACTIVE", "COMPLETED"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" ? "Semua" : status === "PENDING" ? "Pending" : status === "APPROVED" ? "Disetujui" : status === "ACTIVE" ? "Aktif" : "Selesai"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Kendaraan</TableHead>
                <TableHead>Mulai</TableHead>
                <TableHead>Selesai</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="text-sm font-mono">{booking.id}</TableCell>
                  <TableCell className="text-sm">{booking.driver}</TableCell>
                  <TableCell className="text-sm">{booking.vehicle}</TableCell>
                  <TableCell className="text-sm">{booking.startDate}</TableCell>
                  <TableCell className="text-sm">{booking.endDate}</TableCell>
                  <TableCell className="text-sm font-medium">{booking.amount}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {booking.status === "PENDING" && (
                        <>
                          <Button variant="ghost" size="sm" title="Approve">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Reject">
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </>
                      )}
                      {booking.status === "APPROVED" && (
                        <Button variant="ghost" size="sm" title="Aktivasi">
                          <Play className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setSelectedBooking(booking); setDetailOpen(true); }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Booking {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Driver</span><span className="font-medium">{selectedBooking.driver}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Kendaraan</span><span className="font-medium">{selectedBooking.vehicle}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Periode</span><span className="font-medium">{selectedBooking.startDate} - {selectedBooking.endDate}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Durasi</span><span className="font-medium">{selectedBooking.duration}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Total</span><span className="font-bold text-emerald-600">{selectedBooking.amount}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status</span>{getStatusBadge(selectedBooking.status)}</div>
              </div>
              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Timeline</h4>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>Booking dibuat: {selectedBooking.startDate}</p>
                  {selectedBooking.status !== "PENDING" && <p>Disetujui: {selectedBooking.startDate}</p>}
                  {selectedBooking.status === "ACTIVE" && <p>Diaktifkan: {selectedBooking.startDate}</p>}
                  {selectedBooking.status === "COMPLETED" && <p>Selesai: {selectedBooking.endDate}</p>}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
