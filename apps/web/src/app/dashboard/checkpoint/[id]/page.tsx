"use client";

import React from "react";
import { Camera, CheckCircle, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const photoSections = [
  { id: "front", label: "Depan" },
  { id: "back", label: "Belakang" },
  { id: "left", label: "Kiri" },
  { id: "right", label: "Kanan" },
  { id: "interior", label: "Interior" },
  { id: "dashboard", label: "Dashboard" },
];

const checklistItems = [
  "Bodi kendaraan",
  "Ban & Velg",
  "Lampu depan & belakang",
  "Spion kiri & kanan",
  "AC & Ventilasi",
  "Audio & Elektronik",
  "Jok & Interior",
  "Kaca depan & belakang",
  "Wiper",
  "Klakson",
];

export default function CheckpointPage() {
  const [photos, setPhotos] = React.useState<Record<string, boolean>>({});
  const [checklist, setChecklist] = React.useState<Record<string, string>>({});
  const [odometer, setOdometer] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const completedPhotos = Object.values(photos).filter(Boolean).length;
  const completedChecklist = Object.values(checklist).filter(Boolean).length;
  const totalSteps = photoSections.length + checklistItems.length + 2; // +2 for odometer & notes
  const completedSteps = completedPhotos + completedChecklist + (odometer ? 1 : 0) + (notes ? 1 : 0);
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);

  const togglePhoto = (id: string) => {
    setPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setConfirmDialog(false);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold">Checkpoint Berhasil!</h3>
            <p className="text-gray-500">
              Data checkpoint kendaraan telah berhasil disimpan. Dokumen ini akan menjadi bukti kondisi kendaraan saat serah terima.
            </p>
            <Button asChild>
              <a href="/dashboard/rentals">Kembali ke Rental</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Checkpoint Kendaraan Digital</h2>
        <p className="text-sm text-gray-500 mt-1">
          Dokumentasikan kondisi kendaraan sebelum/sesudah serah terima
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress Checkpoint</span>
            <span className="text-sm text-gray-500">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Foto Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {photoSections.map((section) => (
              <button
                key={section.id}
                onClick={() => togglePhoto(section.id)}
                className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors ${
                  photos[section.id]
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {photos[section.id] ? (
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                ) : (
                  <Camera className="h-8 w-8 text-gray-400" />
                )}
                <span className="text-xs font-medium">
                  {section.label}
                </span>
                <span className="text-[10px] text-gray-500">
                  {photos[section.id] ? "Terupload" : "Tap untuk upload"}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condition Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Kondisi Kendaraan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                <span className="text-sm">{item}</span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-1.5 text-sm">
                    <input
                      type="radio"
                      name={`check-${idx}`}
                      value="baik"
                      checked={checklist[`check-${idx}`] === "baik"}
                      onChange={() => setChecklist((prev) => ({ ...prev, [`check-${idx}`]: "baik" }))}
                      className="accent-emerald-500"
                    />
                    <span className="text-emerald-600">Baik</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-sm">
                    <input
                      type="radio"
                      name={`check-${idx}`}
                      value="rusak"
                      checked={checklist[`check-${idx}`] === "rusak"}
                      onChange={() => setChecklist((prev) => ({ ...prev, [`check-${idx}`]: "rusak" }))}
                      className="accent-red-500"
                    />
                    <span className="text-red-600">Rusak</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Odometer & Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informasi Tambahan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Angka Odometer (km)</Label>
            <Input
              type="number"
              placeholder="Contoh: 45000"
              value={odometer}
              onChange={(e) => setOdometer(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Catatan</Label>
            <Textarea
              placeholder="Catatan tambahan tentang kondisi kendaraan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tanda Tangan Digital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-sm text-gray-400">Area tanda tangan digital</p>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <Button className="w-full" size="lg" onClick={() => setConfirmDialog(true)}>
        Submit Checkpoint
      </Button>

      <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Checkpoint</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Pastikan semua data yang diisi sudah benar. Data checkpoint tidak dapat diubah setelah disubmit.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmDialog(false)}>
              Batal
            </Button>
            <Button className="flex-1" onClick={handleSubmit}>
              Ya, Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
