"use client";

import { useState } from "react";
import { Camera, ClipboardCheck, Gauge, FileCheck, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { id: 1, label: "Pilih Booking", icon: FileCheck },
  { id: 2, label: "Foto Kendaraan", icon: Camera },
  { id: 3, label: "Checklist", icon: ClipboardCheck },
  { id: 4, label: "Odometer", icon: Gauge },
  { id: 5, label: "Review", icon: Check },
];

const photoSlots = ["Depan", "Belakang", "Kiri", "Kanan", "Interior", "Odometer"];

const checklistItems = [
  "Goresan pada body",
  "Penyok/dent",
  "Kebersihan interior",
  "Lampu berfungsi normal",
  "Ban dalam kondisi baik",
  "Spion lengkap",
  "Wiper berfungsi",
  "AC berfungsi",
];

export default function CheckpointPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [checkpointType, setCheckpointType] = useState<"pengambilan" | "pengembalian">("pengambilan");
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [odometer, setOdometer] = useState("");
  const [fuelLevel, setFuelLevel] = useState("penuh");
  const [notes, setNotes] = useState("");

  const toggleChecklist = (item: string) => {
    setChecklist((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Checkpoint Kendaraan</h1>
        <p className="text-navy-500 mt-1">Inspeksi kendaraan untuk pengambilan atau pengembalian</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-between max-w-2xl overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  currentStep >= step.id ? "bg-emerald-500 text-white" : "bg-gray-200 text-navy-400"
                }`}
              >
                {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </div>
              <span className="text-[10px] mt-1 text-navy-500 hidden sm:block whitespace-nowrap">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-12 h-0.5 mx-1 ${currentStep > step.id ? "bg-emerald-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Select Booking */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Pilih Booking & Tipe Checkpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Booking</label>
              <select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                <option value="b1">Toyota Avanza - B 1234 KKA (Aktif)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Tipe Checkpoint</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCheckpointType("pengambilan")}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    checkpointType === "pengambilan" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-navy-800">Pengambilan</p>
                  <p className="text-xs text-navy-500 mt-1">Saat ambil kendaraan</p>
                </button>
                <button
                  onClick={() => setCheckpointType("pengembalian")}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    checkpointType === "pengembalian" ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <p className="font-medium text-navy-800">Pengembalian</p>
                  <p className="text-xs text-navy-500 mt-1">Saat kembalikan kendaraan</p>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Photos */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Foto Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photoSlots.map((slot) => (
                <div key={slot} className="space-y-2">
                  <label className="text-sm font-medium text-navy-700">{slot}</label>
                  <div className="relative aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-emerald-300 transition-colors">
                    {photos[slot] ? (
                      <div className="w-full h-full bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Check className="h-6 w-6 text-emerald-600" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-6 w-6 text-navy-400 mx-auto" />
                        <p className="text-xs text-navy-400 mt-1">Upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={() => setPhotos((prev) => ({ ...prev, [slot]: "uploaded" }))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Checklist */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Checklist Kondisi Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {checklistItems.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checklist[item] || false}
                    onChange={() => toggleChecklist(item)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-navy-700">{item}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Odometer & Fuel */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Odometer & Bahan Bakar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <Input
              id="odometer"
              type="number"
              label="Angka Odometer (km)"
              placeholder="Masukkan angka odometer"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Level Bahan Bakar</label>
              <div className="grid grid-cols-4 gap-2">
                {["kosong", "1/4", "1/2", "penuh"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFuelLevel(level)}
                    className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                      fuelLevel === level ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-navy-600"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Catatan Tambahan</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-24 rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                placeholder="Catatan tambahan (opsional)..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review */}
      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Review Inspeksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-navy-700">Tipe</p>
                <p className="text-sm text-navy-800 capitalize">{checkpointType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-navy-700">Foto Terupload</p>
                <p className="text-sm text-navy-800">{Object.keys(photos).length} dari {photoSlots.length}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-navy-700">Odometer</p>
                <p className="text-sm text-navy-800">{odometer || "-"} km</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-navy-700">Level BBM</p>
                <p className="text-sm text-navy-800 capitalize">{fuelLevel}</p>
              </div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm text-emerald-800 font-medium">Dengan mengirimkan form ini, Anda menyatakan bahwa semua informasi yang diberikan adalah benar dan akurat.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="ghost" onClick={() => setCurrentStep((s) => Math.max(1, s - 1))} disabled={currentStep === 1}>
          Kembali
        </Button>
        <Button onClick={() => setCurrentStep((s) => Math.min(5, s + 1))}>
          {currentStep === 5 ? "Kirim Inspeksi" : "Lanjutkan"}
        </Button>
      </div>
    </div>
  );
}
