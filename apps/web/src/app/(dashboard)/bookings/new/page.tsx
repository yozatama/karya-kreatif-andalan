'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StepProgress } from '@/components/dashboard/StepProgress';
import { PaymentMethodCard } from '@/components/dashboard/PaymentMethodCard';
import { formatCurrency } from '@/lib/format';
import { vehicles } from '@/lib/mock-data';
import { Car, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = ['Pilih Kendaraan', 'Detail Sewa', 'Review', 'Pembayaran'];

type DurationType = 'harian' | 'mingguan' | 'bulanan';
type PaymentMethod = 'va' | 'ewallet' | 'qris';

export default function NewBookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [duration, setDuration] = useState<DurationType>('bulanan');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedVehicleData = vehicles.find((v) => v.id === selectedVehicle);
  const availableVehicles = vehicles.filter((v) => v.status === 'tersedia');

  const getPrice = () => {
    if (!selectedVehicleData) return 0;
    switch (duration) {
      case 'harian': return selectedVehicleData.priceDaily;
      case 'mingguan': return selectedVehicleData.priceWeekly;
      case 'bulanan': return selectedVehicleData.priceMonthly;
    }
  };

  const deposit = selectedVehicleData?.category === 'motor-listrik' ? 500000 : 1000000;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold">Booking Berhasil!</h2>
        <p className="text-muted-foreground max-w-md">
          Menunggu konfirmasi admin. Anda akan menerima notifikasi setelah booking dikonfirmasi.
        </p>
        <Button onClick={() => { setSubmitted(false); setCurrentStep(0); setSelectedVehicle(null); }}>
          Booking Lagi
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Baru</h1>

      <StepProgress steps={steps} currentStep={currentStep} />

      {/* Step 1: Pilih Kendaraan */}
      {currentStep === 0 && (
        <div className="space-y-4">
          <p className="text-muted-foreground">Pilih kendaraan yang ingin Anda sewa:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableVehicles.map((vehicle) => (
              <Card
                key={vehicle.id}
                className={`cursor-pointer transition-all ${selectedVehicle === vehicle.id ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
                onClick={() => setSelectedVehicle(vehicle.id)}
              >
                <CardContent className="p-4">
                  <div className="flex h-24 items-center justify-center rounded-lg bg-muted mb-3">
                    <Car className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{vehicle.name}</h3>
                  <p className="text-xs text-muted-foreground">{vehicle.model} | {vehicle.transmission}</p>
                  <div className="mt-2 space-y-0.5">
                    <p className="text-xs text-muted-foreground">{formatCurrency(vehicle.priceDaily)}/hari</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(vehicle.priceWeekly)}/minggu</p>
                    <p className="text-sm font-semibold text-primary">{formatCurrency(vehicle.priceMonthly)}/bulan</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Detail Sewa */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Detail Sewa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Durasi Sewa</Label>
              <div className="flex gap-2 mt-2">
                {(['harian', 'mingguan', 'bulanan'] as DurationType[]).map((d) => (
                  <Button
                    key={d}
                    variant={duration === d ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDuration(d)}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="pickup">Lokasi Pickup</Label>
              <Input
                id="pickup"
                placeholder="Pilih lokasi pickup"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notes">Catatan (opsional)</Label>
              <textarea
                id="notes"
                placeholder="Tambahkan catatan untuk admin..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {currentStep === 2 && selectedVehicleData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Review Booking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Kendaraan</span>
                <span className="text-sm font-medium">{selectedVehicleData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Durasi</span>
                <span className="text-sm font-medium">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Periode</span>
                <span className="text-sm font-medium">{startDate || '-'} s/d {endDate || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lokasi Pickup</span>
                <span className="text-sm font-medium">{pickupLocation || '-'}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Biaya sewa</span>
                  <span className="text-sm font-medium">{formatCurrency(getPrice())}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-muted-foreground">Deposit</span>
                  <span className="text-sm font-medium">{formatCurrency(deposit)}</span>
                </div>
                <div className="flex justify-between mt-2 border-t pt-2">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-sm font-bold text-primary">{formatCurrency(getPrice() + deposit)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded"
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                Saya menyetujui{' '}
                <span className="text-primary cursor-pointer hover:underline">
                  syarat dan ketentuan
                </span>{' '}
                rental kendaraan dari Karya Kreatif Andalan.
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Pembayaran */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pilih Metode Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <PaymentMethodCard method="va" selected={paymentMethod === 'va'} onClick={() => setPaymentMethod('va')} />
            <PaymentMethodCard method="ewallet" selected={paymentMethod === 'ewallet'} onClick={() => setPaymentMethod('ewallet')} />
            <PaymentMethodCard method="qris" selected={paymentMethod === 'qris'} onClick={() => setPaymentMethod('qris')} />

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total Pembayaran</span>
                <span className="font-bold text-primary text-lg">{formatCurrency(getPrice() + deposit)}</span>
              </div>
              <Button className="w-full" disabled={!paymentMethod} onClick={handleSubmit}>
                Bayar Sekarang
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
        </Button>
        {currentStep < 3 && (
          <Button
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={
              (currentStep === 0 && !selectedVehicle) ||
              (currentStep === 2 && !agreedToTerms)
            }
          >
            Lanjut <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
