"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Car, CheckCircle, MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useBookingStore } from "@/stores/booking-store";
import { vehicles } from "@/lib/mock-data";

const rentalSchema = z.object({
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().min(1, "Tanggal selesai wajib diisi"),
  pickupLocation: z.string().min(1, "Lokasi pengambilan wajib diisi"),
  notes: z.string().optional(),
});

type RentalFormData = z.infer<typeof rentalSchema>;

export default function BookingPage() {
  const { bookingStep, setBookingStep, currentBooking, setCurrentBooking, resetBooking } = useBookingStore();
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [bookingRef, setBookingRef] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RentalFormData>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      startDate: currentBooking.startDate,
      endDate: currentBooking.endDate,
      pickupLocation: currentBooking.pickupLocation,
      notes: currentBooking.notes,
    },
  });

  const filteredVehicles = vehicles.filter((v) => {
    if (typeFilter !== "all" && v.type !== typeFilter) return false;
    return v.isAvailable;
  });

  const selectedVehicle = vehicles.find((v) => v.id === currentBooking.vehicleId);

  const calculateDuration = () => {
    if (currentBooking.startDate && currentBooking.endDate) {
      const start = new Date(currentBooking.startDate);
      const end = new Date(currentBooking.endDate);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    }
    return 0;
  };

  const duration = calculateDuration();
  const totalPrice = selectedVehicle ? selectedVehicle.pricePerDay * duration : 0;
  const deposit = selectedVehicle?.type === "car" ? 3000000 : 500000;

  const onStep2Submit = (data: RentalFormData) => {
    setCurrentBooking(data);
    setBookingStep(3);
  };

  const handleConfirmBooking = () => {
    setBookingRef(`BK-${Date.now().toString(36).toUpperCase()}`);
    setBookingStep(4);
  };

  const steps = ["Pilih Kendaraan", "Detail Rental", "Review", "Konfirmasi"];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  bookingStep > i + 1
                    ? "bg-emerald-500 text-white"
                    : bookingStep === i + 1
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {bookingStep > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden text-xs sm:inline">{step}</span>
              {i < steps.length - 1 && (
                <div className="mx-2 hidden h-px w-8 bg-gray-200 sm:block" />
              )}
            </div>
          ))}
        </div>
        <Progress value={(bookingStep / 4) * 100} className="h-1" />
      </div>

      {/* Step 1: Vehicle Selection */}
      {bookingStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("all")}
            >
              Semua
            </Button>
            <Button
              variant={typeFilter === "car" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("car")}
            >
              Mobil
            </Button>
            <Button
              variant={typeFilter === "motorcycle" ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter("motorcycle")}
            >
              Motor
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`cursor-pointer transition-all ${
                  currentBooking.vehicleId === vehicle.id
                    ? "ring-2 ring-emerald-500"
                    : "hover:shadow-md"
                }`}
                onClick={() => setCurrentBooking({ vehicleId: vehicle.id })}
              >
                <CardContent className="p-4">
                  <div className="mb-3 h-32 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Car className="h-10 w-10 text-gray-400" />
                  </div>
                  <h4 className="font-semibold text-sm">{vehicle.name}</h4>
                  <p className="text-xs text-gray-500">{vehicle.category} - {vehicle.transmission}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-emerald-600">
                      Rp {vehicle.pricePerDay.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-gray-500">/hari</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => setBookingStep(2)}
              disabled={!currentBooking.vehicleId}
            >
              Selanjutnya <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Rental Details */}
      {bookingStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Detail Rental</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onStep2Submit)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal Mulai</Label>
                  <Input type="date" {...register("startDate")} onChange={(e) => setCurrentBooking({ startDate: e.target.value })} />
                  {errors.startDate && (
                    <p className="text-xs text-red-500">{errors.startDate.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tanggal Selesai</Label>
                  <Input type="date" {...register("endDate")} onChange={(e) => setCurrentBooking({ endDate: e.target.value })} />
                  {errors.endDate && (
                    <p className="text-xs text-red-500">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {duration > 0 && (
                <div className="rounded-md bg-emerald-50 dark:bg-emerald-900/10 p-3">
                  <p className="text-sm">
                    Durasi rental: <span className="font-semibold">{duration} hari</span>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Lokasi Pengambilan</Label>
                <Input
                  placeholder="Masukkan alamat pengambilan"
                  {...register("pickupLocation")}
                />
                {errors.pickupLocation && (
                  <p className="text-xs text-red-500">{errors.pickupLocation.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Catatan (opsional)</Label>
                <Textarea
                  placeholder="Catatan tambahan..."
                  {...register("notes")}
                />
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setBookingStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
                </Button>
                <Button type="submit">
                  Selanjutnya <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {bookingStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedVehicle && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-20 rounded-md bg-gray-100 flex items-center justify-center">
                    <Car className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedVehicle.name}</h4>
                    <p className="text-sm text-gray-500">{selectedVehicle.category}</p>
                  </div>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal Mulai</span>
                    <span className="font-medium">{currentBooking.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal Selesai</span>
                    <span className="font-medium">{currentBooking.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Durasi</span>
                    <span className="font-medium">{duration} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lokasi</span>
                    <span className="font-medium">{currentBooking.pickupLocation}</span>
                  </div>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rp {selectedVehicle.pricePerDay.toLocaleString("id-ID")} x {duration} hari</span>
                    <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Deposit</span>
                    <span>Rp {deposit.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span className="text-emerald-600">Rp {(totalPrice + deposit).toLocaleString("id-ID")}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Kode Promo</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Masukkan kode promo"
                      value={currentBooking.promoCode}
                      onChange={(e) => setCurrentBooking({ promoCode: e.target.value })}
                    />
                    <Button variant="outline" size="sm">Gunakan</Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setBookingStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Kembali
              </Button>
              <Button onClick={handleConfirmBooking}>
                Konfirmasi Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Confirmation */}
      {bookingStep === 4 && (
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Booking Berhasil!</h3>
            <p className="text-gray-500">
              Booking Anda telah berhasil dibuat. Tim kami akan segera memproses permintaan Anda.
            </p>
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-sm text-gray-500">Nomor Referensi</p>
              <p className="text-lg font-bold font-mono">{bookingRef}</p>
            </div>
            <div className="rounded-lg border p-4 text-left space-y-2">
              <h4 className="font-semibold text-sm">Langkah Selanjutnya:</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                <li>Tunggu konfirmasi dari admin (1-2 jam kerja)</li>
                <li>Lakukan pembayaran deposit setelah disetujui</li>
                <li>Ambil kendaraan sesuai jadwal</li>
                <li>Lakukan checkpoint digital bersama petugas</li>
              </ul>
            </div>
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={resetBooking}>
                Booking Lagi
              </Button>
              <Button asChild>
                <a href="/dashboard">Kembali ke Dashboard</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
