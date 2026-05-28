'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/dashboard/FileUpload';
import { CheckCircle, Clock, AlertTriangle, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

type VerificationStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

export default function VerificationPage() {
  // Mock: current user is verified
  const [status] = useState<VerificationStatus>('approved');
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [simFile, setSimFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);

  const statusBanners: Record<VerificationStatus, { icon: typeof CheckCircle; text: string; className: string }> = {
    not_started: { icon: AlertTriangle, text: 'Lengkapi verifikasi untuk mulai menyewa', className: 'bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400' },
    pending: { icon: Clock, text: 'Dokumen sedang diverifikasi (1-2 hari kerja)', className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400' },
    approved: { icon: CheckCircle, text: 'Verifikasi berhasil!', className: 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' },
    rejected: { icon: AlertTriangle, text: 'Verifikasi ditolak - Dokumen tidak jelas. Silakan upload ulang.', className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' },
  };

  const banner = statusBanners[status];
  const BannerIcon = banner.icon;

  const allUploaded = ktpFile && simFile && selfieFile;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Verifikasi Driver</h1>

      {/* Status Banner */}
      <div className={cn('flex items-center gap-3 rounded-lg border p-4', banner.className)}>
        <BannerIcon className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{banner.text}</p>
        {status === 'rejected' && (
          <Button size="sm" variant="outline" className="ml-auto">
            Upload Ulang
          </Button>
        )}
      </div>

      {/* Document Upload Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">KTP (Depan)</CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'approved' ? (
              <div className="flex flex-col items-center py-6 text-emerald-600">
                <CheckCircle className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Terverifikasi</p>
              </div>
            ) : (
              <FileUpload
                label=""
                accept="image/*"
                maxSize={5}
                onFileSelect={setKtpFile}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">SIM (A atau C)</CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'approved' ? (
              <div className="flex flex-col items-center py-6 text-emerald-600">
                <CheckCircle className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Terverifikasi</p>
              </div>
            ) : (
              <FileUpload
                label=""
                accept="image/*"
                maxSize={5}
                onFileSelect={setSimFile}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Selfie dengan KTP</CardTitle>
          </CardHeader>
          <CardContent>
            {status === 'approved' ? (
              <div className="flex flex-col items-center py-6 text-emerald-600">
                <CheckCircle className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Terverifikasi</p>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-3">Pegang KTP di samping wajah</p>
                <FileUpload
                  label=""
                  accept="image/*"
                  maxSize={5}
                  onFileSelect={setSelfieFile}
                />
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Submit button (only for non-approved) */}
      {status !== 'approved' && status !== 'pending' && (
        <Button className="w-full" disabled={!allUploaded}>
          <Upload className="h-4 w-4 mr-2" /> Submit Dokumen
        </Button>
      )}

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline Verifikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: 'Dokumen Diunggah', completed: true, date: '28 Okt 2024' },
              { label: 'Dalam Review', completed: true, date: '28 Okt 2024' },
              { label: 'Disetujui', completed: status === 'approved', date: status === 'approved' ? '29 Okt 2024' : '-' },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    {step.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-3 w-3" />}
                  </div>
                  {index < 2 && (
                    <div className={`w-0.5 h-6 ${step.completed ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
                <div>
                  <p className={`text-sm ${step.completed ? 'font-medium' : 'text-muted-foreground'}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
