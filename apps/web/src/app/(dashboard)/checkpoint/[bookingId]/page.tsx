'use client';

import { use } from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepProgress } from '@/components/dashboard/StepProgress';
import { FileUpload } from '@/components/dashboard/FileUpload';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = ['Eksterior', 'Interior', 'Kondisi', 'Odometer', 'Review'];

type ConditionStatus = 'baik' | 'rusak';

interface VehicleCondition {
  ban: ConditionStatus;
  lampu: ConditionStatus;
  ac: ConditionStatus;
  mesin: ConditionStatus;
  body: ConditionStatus;
  kaca: ConditionStatus;
}

export default function CheckpointPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = use(params);
  const [currentStep, setCurrentStep] = useState(0);
  const [odometer, setOdometer] = useState('');
  const [fuelLevel, setFuelLevel] = useState<string>('full');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [condition, setCondition] = useState<VehicleCondition>({
    ban: 'baik',
    lampu: 'baik',
    ac: 'baik',
    mesin: 'baik',
    body: 'baik',
    kaca: 'baik',
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Checkpoint Berhasil!</h2>
        <p className="text-muted-foreground">Data checkpoint kendaraan telah dicatat.</p>
        <Button onClick={() => { setSubmitted(false); setCurrentStep(0); }}>Kembali</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Checkpoint Kendaraan</h1>
      <p className="text-sm text-muted-foreground">Booking ID: {bookingId}</p>

      <StepProgress steps={steps} currentStep={currentStep} />

      {/* Step 1: Eksterior */}
      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Foto Eksterior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload label="Foto Depan" />
              <FileUpload label="Foto Belakang" />
              <FileUpload label="Foto Kiri" />
              <FileUpload label="Foto Kanan" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Interior */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Foto Interior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUpload label="Dashboard" />
              <FileUpload label="Kursi Belakang" />
              <FileUpload label="Odometer" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Kondisi Kendaraan */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Kondisi Kendaraan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(Object.keys(condition) as Array<keyof VehicleCondition>).map((key) => (
                <div key={key} className="flex items-center justify-between py-2 border-b last:border-0">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={condition[key] === 'baik' ? 'default' : 'outline'}
                      onClick={() => setCondition({ ...condition, [key]: 'baik' })}
                      className={condition[key] === 'baik' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                    >
                      Baik
                    </Button>
                    <Button
                      size="sm"
                      variant={condition[key] === 'rusak' ? 'destructive' : 'outline'}
                      onClick={() => setCondition({ ...condition, [key]: 'rusak' })}
                    >
                      Rusak
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Odometer */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Data Odometer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="odometer">Pembacaan Odometer (km)</Label>
              <Input
                id="odometer"
                type="number"
                placeholder="Contoh: 35000"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Level BBM/Baterai</Label>
              <div className="flex gap-2 mt-2">
                {['1/4', '1/2', '3/4', 'full'].map((level) => (
                  <Button
                    key={level}
                    size="sm"
                    variant={fuelLevel === level ? 'default' : 'outline'}
                    onClick={() => setFuelLevel(level)}
                  >
                    {level === 'full' ? 'Full' : level}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <textarea
                id="notes"
                placeholder="Catatan kondisi kendaraan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review */}
      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review Checkpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Odometer</span>
                <span className="text-sm font-medium">{odometer || '-'} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Level BBM</span>
                <span className="text-sm font-medium">{fuelLevel}</span>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm font-medium mb-2">Kondisi Kendaraan:</p>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(condition) as [string, ConditionStatus][]).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${value === 'baik' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      <span className="text-sm capitalize">{key}: {value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {notes && (
                <div className="border-t pt-3">
                  <p className="text-sm text-muted-foreground">Catatan:</p>
                  <p className="text-sm">{notes}</p>
                </div>
              )}
            </div>
            <Button className="w-full" onClick={() => setSubmitted(true)}>
              Submit Checkpoint
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {currentStep < 4 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((s) => s - 1)}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
          </Button>
          <Button onClick={() => setCurrentStep((s) => s + 1)}>
            Lanjut <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
