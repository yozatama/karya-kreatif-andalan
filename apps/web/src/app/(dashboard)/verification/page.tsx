"use client";

import { useState } from "react";
import { Upload, Check, X, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type VerificationStatus = "belum" | "proses" | "terverifikasi" | "ditolak";

interface DocumentStatus {
  uploaded: boolean;
  status: VerificationStatus;
  rejectedReason?: string;
}

const statusConfig: Record<VerificationStatus, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  belum: { label: "Belum Verifikasi", icon: AlertCircle, color: "text-gray-600", bgColor: "bg-gray-100" },
  proses: { label: "Dalam Proses", icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
  terverifikasi: { label: "Terverifikasi", icon: Check, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  ditolak: { label: "Ditolak", icon: X, color: "text-red-600", bgColor: "bg-red-50" },
};

const progressSteps = ["Upload KTP", "Upload SIM", "Selfie", "Review"];

export default function VerificationPage() {
  const [overallStatus] = useState<VerificationStatus>("proses");
  const [documents] = useState<Record<string, DocumentStatus>>({
    ktp: { uploaded: true, status: "terverifikasi" },
    sim: { uploaded: true, status: "proses" },
    selfie: { uploaded: false, status: "belum" },
  });

  const currentProgress = Object.values(documents).filter((d) => d.uploaded).length;
  const StatusIcon = statusConfig[overallStatus].icon;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Verifikasi Dokumen</h1>
        <p className="text-navy-500 mt-1">Upload dokumen untuk verifikasi identitas Anda</p>
      </div>

      {/* Status Banner */}
      <div className={`p-4 rounded-lg ${statusConfig[overallStatus].bgColor} flex items-center gap-3`}>
        <StatusIcon className={`h-6 w-6 ${statusConfig[overallStatus].color}`} />
        <div>
          <p className={`font-medium ${statusConfig[overallStatus].color}`}>
            Status: {statusConfig[overallStatus].label}
          </p>
          <p className="text-sm text-navy-500">
            {overallStatus === "proses" && "Dokumen Anda sedang dalam tahap review oleh tim kami."}
            {overallStatus === "belum" && "Silakan upload semua dokumen yang diperlukan."}
            {overallStatus === "terverifikasi" && "Semua dokumen telah diverifikasi. Anda dapat melakukan booking."}
            {overallStatus === "ditolak" && "Dokumen Anda ditolak. Silakan upload ulang."}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Progress Verifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between max-w-lg">
            {progressSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      index < currentProgress
                        ? "bg-emerald-500 text-white"
                        : index === currentProgress
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-200 text-navy-400"
                    }`}
                  >
                    {index < currentProgress ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="text-[10px] mt-1 text-navy-500 text-center">{step}</span>
                </div>
                {index < progressSteps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-1 ${index < currentProgress ? "bg-emerald-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Upload Sections */}
      <div className="grid gap-4">
        {/* KTP */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-700">KTP</span>
                </div>
                <div>
                  <p className="font-medium text-navy-800">Kartu Tanda Penduduk</p>
                  <p className="text-sm text-navy-500">Upload foto KTP yang jelas dan valid</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {documents.ktp.uploaded && (
                  <Badge variant={documents.ktp.status === "terverifikasi" ? "success" : "warning"}>
                    {documents.ktp.status === "terverifikasi" ? "Terverifikasi" : "Dalam Proses"}
                  </Badge>
                )}
              </div>
            </div>
            {!documents.ktp.uploaded && (
              <div className="mt-3">
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                  <Upload className="h-5 w-5 text-navy-400" />
                  <span className="text-sm text-navy-500">Pilih file atau drag & drop</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SIM */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-green-700">SIM</span>
                </div>
                <div>
                  <p className="font-medium text-navy-800">Surat Izin Mengemudi</p>
                  <p className="text-sm text-navy-500">Upload SIM A atau SIM C sesuai kendaraan</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {documents.sim.uploaded && (
                  <Badge variant="warning">Dalam Proses</Badge>
                )}
              </div>
            </div>
            {!documents.sim.uploaded && (
              <div className="mt-3">
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                  <Upload className="h-5 w-5 text-navy-400" />
                  <span className="text-sm text-navy-500">Pilih file atau drag & drop</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selfie */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-700">SELFIE</span>
                </div>
                <div>
                  <p className="font-medium text-navy-800">Foto Selfie</p>
                  <p className="text-sm text-navy-500">Foto wajah Anda sambil memegang KTP</p>
                </div>
              </div>
              <Badge variant="info">Belum Upload</Badge>
            </div>
            <div className="mt-3">
              <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-300 transition-colors">
                <Upload className="h-5 w-5 text-navy-400" />
                <span className="text-sm text-navy-500">Pilih file atau drag & drop</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
