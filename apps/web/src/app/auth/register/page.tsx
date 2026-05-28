'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Car, Zap, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth-store';

const step1Schema = z.object({
  firstName: z.string().min(1, 'Nama depan wajib diisi'),
  lastName: z.string().min(1, 'Nama belakang wajib diisi'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
});

const step2Schema = z.object({
  platform: z.string().min(1, 'Pilih platform'),
  experienceYears: z.string().min(1, 'Pengalaman wajib diisi'),
});

const step3Schema = z.object({
  password: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  terms: z.boolean().refine((val) => val === true, 'Anda harus menyetujui syarat dan ketentuan'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak sama',
  path: ['confirmPassword'],
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

const platforms = [
  { id: 'gojek', name: 'Gojek', color: 'bg-green-500' },
  { id: 'grab', name: 'Grab', color: 'bg-green-600' },
  { id: 'maxim', name: 'Maxim', color: 'bg-orange-500' },
  { id: 'indrive', name: 'InDrive', color: 'bg-purple-500' },
  { id: 'lainnya', name: 'Lainnya', color: 'bg-gray-500' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Partial<Step1Data & Step2Data & Step3Data>>({});

  const step1Form = useForm<Step1Data>({ resolver: zodResolver(step1Schema) });
  const step2Form = useForm<Step2Data>({ resolver: zodResolver(step2Schema) });
  const step3Form = useForm<Step3Data>({ resolver: zodResolver(step3Schema) });

  const handleStep1 = (data: Step1Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2 = (data: Step2Data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const handleStep3 = async (data: Step3Data) => {
    setIsLoading(true);
    setError('');
    const allData = { ...formData, ...data };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: allData.firstName,
          lastName: allData.lastName,
          email: allData.email,
          phone: allData.phone,
          password: allData.password,
          platform: allData.platform,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || 'Registrasi gagal');
        return;
      }

      login({
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        email: result.user.email,
        phone: result.user.phone,
        role: 'user',
        isVerified: false,
      });

      router.push('/dashboard');
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/70 items-center justify-center p-12">
        <div className="text-white max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Car className="h-12 w-12" />
            <Zap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Bergabung Bersama Kami</h1>
          <p className="text-lg text-white/80 mb-6">
            Mulai perjalanan Anda sebagai mitra driver dengan kendaraan listrik berkualitas
          </p>
          <div className="space-y-3 text-left text-white/80">
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-white" />
              <span>Proses pendaftaran cepat dan mudah</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-white" />
              <span>Kendaraan berkualitas untuk semua platform</span>
            </div>
            <div className="flex items-center gap-3">
              <Check className="h-5 w-5 text-white" />
              <span>Dukungan 24/7 untuk mitra driver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - registration form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Car className="h-8 w-8 text-primary" />
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Karya Kreatif Andalan</h1>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Daftar Akun Baru</h2>
            <p className="text-muted-foreground mt-1">
              Lengkapi data Anda untuk memulai
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    s <= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-0.5 ${s < step ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          {/* Step 1: Data Pribadi */}
          {step === 1 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1)} className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Langkah 1: Data Pribadi
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nama Depan</Label>
                  <Input id="firstName" placeholder="Budi" {...step1Form.register('firstName')} />
                  {step1Form.formState.errors.firstName && (
                    <p className="text-destructive text-xs">{step1Form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input id="lastName" placeholder="Santoso" {...step1Form.register('lastName')} />
                  {step1Form.formState.errors.lastName && (
                    <p className="text-destructive text-xs">{step1Form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-md text-sm text-muted-foreground">
                    +62
                  </div>
                  <Input id="phone" placeholder="812345678" {...step1Form.register('phone')} className="flex-1" />
                </div>
                {step1Form.formState.errors.phone && (
                  <p className="text-destructive text-xs">{step1Form.formState.errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="budi@email.com" {...step1Form.register('email')} />
                {step1Form.formState.errors.email && (
                  <p className="text-destructive text-xs">{step1Form.formState.errors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Lanjutkan <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          )}

          {/* Step 2: Platform Driver */}
          {step === 2 && (
            <form onSubmit={step2Form.handleSubmit(handleStep2)} className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Langkah 2: Platform Driver
              </p>
              <div className="space-y-2">
                <Label>Pilih Platform</Label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        step2Form.watch('platform') === p.id
                          ? 'border-primary bg-primary/5'
                          : 'border-input hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        value={p.id}
                        {...step2Form.register('platform')}
                        className="sr-only"
                      />
                      <div className={`h-3 w-3 rounded-full ${p.color}`} />
                      <span className="text-sm font-medium">{p.name}</span>
                    </label>
                  ))}
                </div>
                {step2Form.formState.errors.platform && (
                  <p className="text-destructive text-xs">{step2Form.formState.errors.platform.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Pengalaman (tahun)</Label>
                <Input
                  id="experienceYears"
                  type="number"
                  placeholder="Contoh: 2"
                  {...step2Form.register('experienceYears')}
                />
                {step2Form.formState.errors.experienceYears && (
                  <p className="text-destructive text-xs">{step2Form.formState.errors.experienceYears.message}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
                </Button>
                <Button type="submit" className="flex-1">
                  Lanjutkan <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Buat Akun */}
          {step === 3 && (
            <form onSubmit={step3Form.handleSubmit(handleStep3)} className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Langkah 3: Buat Akun
              </p>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  {...step3Form.register('password')}
                />
                {step3Form.formState.errors.password && (
                  <p className="text-destructive text-xs">{step3Form.formState.errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  {...step3Form.register('confirmPassword')}
                />
                {step3Form.formState.errors.confirmPassword && (
                  <p className="text-destructive text-xs">{step3Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" {...step3Form.register('terms')} className="mt-0.5 rounded border-input" />
                <span className="text-muted-foreground">
                  Saya menyetujui{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Syarat dan Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>
              {step3Form.formState.errors.terms && (
                <p className="text-destructive text-xs">{step3Form.formState.errors.terms.message}</p>
              )}
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
