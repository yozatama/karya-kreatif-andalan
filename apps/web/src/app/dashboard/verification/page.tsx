"use client";

import React from "react";
import { Upload, CheckCircle, Clock, XCircle, FileText, Camera, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const documents = [
  {
    id: "ktp",
    label: "KTP (Kartu Tanda Penduduk)",
    icon: FileText,
    status: "verified" as const,
    description: "Upload foto KTP yang masih berlaku",
  },
  {
    id: "sim",
    label: "SIM (Surat Izin Mengemudi)",
    icon: FileText,
    status: "verified" as const,
    description: "SIM A untuk mobil, SIM C untuk motor",
  },
  {
    id: "selfie",
    label: "Foto Selfie dengan KTP",
    icon: Camera,
    status: "in_review" as const,
    description: "Selfie dengan KTP terlihat jelas di samping wajah",
  },
];

const timelineSteps = [
  { label: "Dokumen Dikirim", status: "completed" },
  { label: "Sedang Direview", status: "current" },
  { label: "Terverifikasi", status: "pending" },
];

export default function VerificationPage() {
  const [uploadState, setUploadState] = React.useState<Record<string, boolean>>({
    ktp: true,
    sim: true,
    selfie: true,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-emerald-100 text-emerald-700">Terverifikasi</Badge>;
      case "in_review":
        return <Badge className="bg-yellow-100 text-yellow-700">Sedang Direview</Badge>;
      case "rejected":
        return <Badge variant="destructive">Ditolak</Badge>;
      default:
        return <Badge variant="secondary">Belum Upload</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Verifikasi Driver</h2>

      {/* Status Timeline */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {timelineSteps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.status === "completed"
                        ? "bg-emerald-500 text-white"
                        : step.status === "current"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.status === "current" ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{i + 1}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium text-center">{step.label}</span>
                </div>
                {i < timelineSteps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    step.status === "completed" ? "bg-emerald-500" : "bg-gray-200"
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overall Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-yellow-100 p-2">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium">Status: Sedang Direview</p>
              <p className="text-sm text-gray-500">
                Selfie Anda sedang dalam proses verifikasi. Estimasi 1-2 hari kerja.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Sections */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-3">
                    <doc.icon className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-sm">{doc.label}</h4>
                      {getStatusBadge(doc.status)}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {uploadState[doc.id] ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="h-16 w-24 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <doc.icon className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <button
                      className="flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-emerald-500 hover:text-emerald-500 transition-colors"
                      onClick={() => setUploadState((prev) => ({ ...prev, [doc.id]: true }))}
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resubmit (shown if rejected) */}
      <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/10">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-orange-700">
            Jika dokumen ditolak, Anda dapat mengunggah ulang dokumen yang diminta.
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Upload Ulang Dokumen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
