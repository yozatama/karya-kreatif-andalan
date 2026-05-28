"use client";

import Link from "next/link";
import { Car, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { rentals } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  aktif: { label: "Aktif", variant: "success" },
  selesai: { label: "Selesai", variant: "default" },
  menunggu_kembali: { label: "Menunggu Kembali", variant: "warning" },
};

export default function RentalsPage() {
  const activeRentals = rentals.filter((r) => r.status === "aktif");
  const pastRentals = rentals.filter((r) => r.status !== "aktif");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Rental Saya</h1>
        <p className="text-navy-500 mt-1">Kelola rental kendaraan aktif dan riwayat Anda</p>
      </div>

      {/* Active Rentals */}
      {activeRentals.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-navy-800">Rental Aktif</h2>
          {activeRentals.map((rental) => (
            <Link key={rental.id} href={`/rentals/${rental.id}`}>
              <Card className="hover:border-emerald-200 transition-colors cursor-pointer mb-3">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Car className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy-800">{rental.vehicleName}</p>
                          <Badge variant={statusConfig[rental.status]?.variant}>
                            {statusConfig[rental.status]?.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-navy-500">Plat: {rental.plate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:text-right">
                      <div className="flex items-center gap-1.5 text-sm text-navy-600">
                        <Clock className="h-4 w-4" />
                        <span>{rental.remainingDays} hari tersisa</span>
                      </div>
                      <p className="font-semibold text-emerald-600">{formatCurrency(rental.monthlyRate)}/bln</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full"
                        style={{ width: `${((30 - rental.remainingDays) / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Past Rentals */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-navy-800">Riwayat Rental</h2>
        {pastRentals.map((rental) => (
          <Link key={rental.id} href={`/rentals/${rental.id}`}>
            <Card className="hover:border-gray-300 transition-colors cursor-pointer mb-3">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Car className="h-5 w-5 text-navy-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-navy-800">{rental.vehicleName}</p>
                        <Badge variant={statusConfig[rental.status]?.variant}>
                          {statusConfig[rental.status]?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-navy-500">{rental.startDate} - {rental.endDate}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-navy-600">{formatCurrency(rental.monthlyRate)}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
