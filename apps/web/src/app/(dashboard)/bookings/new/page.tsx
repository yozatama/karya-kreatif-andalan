"use client";

import { useState } from "react";
import { Car, Calendar, FileText, CreditCard, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { vehicles } from "@/lib/mock-data";

const steps = [
  { id: 1, label: "Pilih Kendaraan", icon: Car },
  { id: 2, label: "Durasi", icon: Calendar },
  { id: 3, label: "Ringkasan", icon: FileText },
  { id: 4, label: "Pembayaran", icon: CreditCard },
];

export default function NewBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [duration, setDuration] = useState<"harian" | "mingguan" | "bulanan">("bulanan");
  const [startDate, setStartDate] = useState("");
  const [agreement, setAgreement] = useState(false);

  const availableVehicles = vehicles.filter((v) => v.available);
  const selected = vehicles.find((v) => v.id === selectedVehicle);

  const getRate = () => {
    if (!selected) return 0;
    if (duration === "harian") return selected.dailyRate;
    if (duration === "mingguan") return selected.weeklyRate;
    return selected.monthlyRate;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Booking Baru</h1>
        <p className="text-navy-500 mt-1">Pilih kendaraan dan atur durasi rental Anda</p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between max-w-2xl">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? "bg-emerald-500 text-white" : "bg-gray-200 text-navy-400"
                }`}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
              </div>
              <span className="text-xs mt-1 text-navy-500 hidden sm:block">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-2 ${currentStep > step.id ? "bg-emerald-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-navy-800">Pilih Kendaraan</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`cursor-pointer transition-all ${
                  selectedVehicle === vehicle.id ? "border-emerald-500 ring-2 ring-emerald-200" : "hover:border-gray-300"
                }`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${vehicle.color} rounded-lg`} />
                    <div>
                      <p className="font-semibold text-navy-800 text-sm">{vehicle.name}</p>
                      <p className="text-xs text-navy-400">{vehicle.brand} - {vehicle.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">{vehicle.category}</Badge>
                    <p className="text-sm font-semibold text-emerald-600">{formatCurrency(vehicle.dailyRate)}/hari</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4 max-w-md">
          <h2 className="text-lg font-semibold text-navy-800">Pilih Durasi Rental</h2>
          <div className="space-y-3">
            <Input
              id="startDate"
              type="date"
              label="Tanggal Mulai"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Periode Rental</label>
              <div className="grid grid-cols-3 gap-2">
                {(["harian", "mingguan", "bulanan"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                      duration === d ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-navy-600 hover:border-gray-300"
                    }`}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            {selected && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-navy-500">Estimasi Biaya:</p>
                <p className="text-xl font-bold text-navy-800">{formatCurrency(getRate())}</p>
                <p className="text-xs text-navy-400">per {duration === "harian" ? "hari" : duration === "mingguan" ? "minggu" : "bulan"}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === 3 && selected && (
        <div className="space-y-4 max-w-lg">
          <h2 className="text-lg font-semibold text-navy-800">Ringkasan Booking</h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-navy-500">Kendaraan</span>
                <span className="font-medium text-navy-800">{selected.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Periode</span>
                <span className="font-medium text-navy-800">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Tanggal Mulai</span>
                <span className="font-medium text-navy-800">{startDate || "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Biaya Rental</span>
                <span className="font-medium text-navy-800">{formatCurrency(getRate())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-500">Deposit</span>
                <span className="font-medium text-navy-800">{formatCurrency(selected.deposit)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-navy-800">Total</span>
                <span className="font-bold text-emerald-600">{formatCurrency(getRate() + selected.deposit)}</span>
              </div>
            </CardContent>
          </Card>
          <label className="flex items-start gap-2 text-sm text-navy-600">
            <input
              type="checkbox"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              className="mt-0.5 rounded border-gray-300"
            />
            <span>Saya telah membaca dan menyetujui perjanjian rental digital serta syarat dan ketentuan yang berlaku.</span>
          </label>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4 max-w-md">
          <h2 className="text-lg font-semibold text-navy-800">Metode Pembayaran</h2>
          <div className="space-y-2">
            {["Transfer Bank (BCA)", "Transfer Bank (Mandiri)", "GoPay", "OVO", "Dana"].map((method) => (
              <button
                key={method}
                className="w-full p-4 border border-gray-200 rounded-lg text-left hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <p className="font-medium text-navy-800">{method}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
        >
          Kembali
        </Button>
        <Button
          onClick={() => {
            if (currentStep < 4) setCurrentStep((s) => s + 1);
          }}
          disabled={(currentStep === 1 && !selectedVehicle) || (currentStep === 3 && !agreement)}
        >
          {currentStep === 4 ? "Konfirmasi Booking" : "Lanjutkan"}
        </Button>
      </div>
    </div>
  );
}
