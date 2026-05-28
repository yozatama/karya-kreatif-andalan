"use client";

import React from "react";
import { Car, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { activeRentals } from "@/lib/dashboard-mock-data";

const rentalHistory = [
  { id: "rh1", vehicle: "Honda Brio 2024", period: "1 Sep - 30 Sep 2024", duration: "30 hari", total: "Rp 6.000.000", status: "COMPLETED" },
  { id: "rh2", vehicle: "Toyota Calya 2023", period: "1 Jul - 31 Jul 2024", duration: "31 hari", total: "Rp 6.200.000", status: "COMPLETED" },
  { id: "rh3", vehicle: "Daihatsu Sigra 2023", period: "1 Mei - 30 Jun 2024", duration: "61 hari", total: "Rp 11.590.000", status: "COMPLETED" },
  { id: "rh4", vehicle: "Gesits G1 2024", period: "1 Mar - 31 Mar 2024", duration: "31 hari", total: "Rp 2.325.000", status: "COMPLETED" },
];

export default function RentalsPage() {
  const [returnDialogOpen, setReturnDialogOpen] = React.useState(false);
  const [returnReason, setReturnReason] = React.useState("");
  const [returnNotes, setReturnNotes] = React.useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Rental Saya</h2>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Aktif ({activeRentals.length})</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {activeRentals.map((rental) => (
            <Card key={rental.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-24 w-32 shrink-0 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Car className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{rental.vehicleName}</h4>
                      <Badge variant={rental.status === "ACTIVE" ? "default" : "secondary"}>
                        {rental.status === "ACTIVE" ? "Aktif" : "Disetujui"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{rental.licensePlate}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Sisa {rental.remainingDays} dari {rental.totalDays} hari</span>
                        <span>{Math.round(((rental.totalDays - rental.remainingDays) / rental.totalDays) * 100)}%</span>
                      </div>
                      <Progress
                        value={((rental.totalDays - rental.remainingDays) / rental.totalDays) * 100}
                        className="h-2"
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Tarif: Rp {rental.dailyRate.toLocaleString("id-ID")}/hari
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
                        <DialogTrigger>
                          <Button variant="outline" size="sm">Request Pengembalian</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Pengembalian Kendaraan</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Alasan Pengembalian</Label>
                              <select
                                className="w-full rounded-md border p-2 text-sm"
                                value={returnReason}
                                onChange={(e) => setReturnReason(e.target.value)}
                              >
                                <option value="">Pilih alasan</option>
                                <option value="selesai">Masa rental selesai</option>
                                <option value="pindah">Pindah kendaraan</option>
                                <option value="berhenti">Berhenti rental</option>
                                <option value="lainnya">Lainnya</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <Label>Catatan</Label>
                              <Textarea
                                placeholder="Catatan tambahan..."
                                value={returnNotes}
                                onChange={(e) => setReturnNotes(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Kondisi Kendaraan</Label>
                              <div className="flex gap-3">
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="radio" name="condition" value="baik" defaultChecked />
                                  Baik
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="radio" name="condition" value="rusak-ringan" />
                                  Rusak Ringan
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="radio" name="condition" value="rusak-berat" />
                                  Rusak Berat
                                </label>
                              </div>
                            </div>
                            <Button
                              className="w-full"
                              onClick={() => setReturnDialogOpen(false)}
                            >
                              Konfirmasi Pengembalian
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/dashboard/checkpoint/${rental.id}`}>
                          Lihat Checkpoint <ArrowRight className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kendaraan</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Durasi</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rentalHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.vehicle}</TableCell>
                      <TableCell>{item.period}</TableCell>
                      <TableCell>{item.duration}</TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Selesai</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
