'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { TrendingUp, Shield, Clock, Percent } from 'lucide-react';

const partnershipSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  jumlahKendaraan: z.string().min(1, 'Wajib diisi'),
  pesan: z.string().optional(),
});

type PartnershipFormValues = z.infer<typeof partnershipSchema>;

const benefits = [
  {
    icon: TrendingUp,
    title: 'Return Investasi Tinggi',
    description: 'Imbal hasil hingga 20% per tahun dari investasi kendaraan Anda.',
  },
  {
    icon: Shield,
    title: 'Asuransi Lengkap',
    description: 'Seluruh kendaraan dilindungi asuransi all-risk untuk ketenangan Anda.',
  },
  {
    icon: Clock,
    title: 'Manajemen Profesional',
    description: 'Tim kami mengelola perawatan, penyewaan, dan administrasi kendaraan.',
  },
  {
    icon: Percent,
    title: 'Bagi Hasil Transparan',
    description: 'Laporan bulanan lengkap dan pembagian hasil yang jelas dan adil.',
  },
];

const timeline = [
  { step: '1', title: 'Hubungi Kami', description: 'Isi form atau hubungi tim partnership kami' },
  { step: '2', title: 'Konsultasi', description: 'Diskusi kebutuhan dan potensi investasi' },
  { step: '3', title: 'Perjanjian', description: 'Tanda tangan kontrak kemitraan' },
  { step: '4', title: 'Serah Terima', description: 'Kendaraan masuk armada dan mulai beroperasi' },
  { step: '5', title: 'Terima Penghasilan', description: 'Bagi hasil masuk setiap bulan' },
];

export default function PartnershipPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PartnershipFormValues>({
    resolver: zodResolver(partnershipSchema),
  });

  const onSubmit = async (_data: PartnershipFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Terima kasih! Tim partnership kami akan menghubungi Anda dalam 1x24 jam.');
    reset();
  };

  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-navy-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Menjadi Mitra Armada</h1>
          <p className="text-emerald-100 mt-4 max-w-2xl mx-auto text-lg">
            Investasikan kendaraan Anda bersama kami dan dapatkan passive income hingga 20% per tahun
            dengan manajemen profesional.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Keuntungan Bermitra"
            subtitle="Mengapa banyak investor memilih Karya Kreatif Andalan"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-navy-dark mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Cara Kerja Kemitraan"
            subtitle="Proses mudah untuk mulai bermitra bersama kami"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {timeline.map((item) => (
              <div key={item.step} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-sm text-navy-dark">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">Simulasi ROI</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Investasi Kendaraan</p>
                    <p className="text-xl font-bold text-navy-dark">Rp 150.000.000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pendapatan/Bulan</p>
                    <p className="text-xl font-bold text-primary">Rp 2.500.000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROI/Tahun</p>
                    <p className="text-xl font-bold text-primary">~20%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  *Simulasi berdasarkan rata-rata performa armada. Hasil aktual dapat bervariasi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <SectionTitle
              title="Daftar Menjadi Mitra"
              subtitle="Isi form berikut dan tim kami akan menghubungi Anda"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input id="nama" placeholder="Masukkan nama Anda" {...register('nama')} className="mt-1" />
                {errors.nama && <p className="text-sm text-destructive mt-1">{errors.nama.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@contoh.com" {...register('email')} className="mt-1" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="telepon">Nomor Telepon</Label>
                <Input id="telepon" placeholder="08xxxxxxxxxx" {...register('telepon')} className="mt-1" />
                {errors.telepon && <p className="text-sm text-destructive mt-1">{errors.telepon.message}</p>}
              </div>

              <div>
                <Label htmlFor="jumlahKendaraan">Jumlah Kendaraan yang Ingin Diinvestasikan</Label>
                <Input id="jumlahKendaraan" placeholder="Contoh: 3 unit" {...register('jumlahKendaraan')} className="mt-1" />
                {errors.jumlahKendaraan && <p className="text-sm text-destructive mt-1">{errors.jumlahKendaraan.message}</p>}
              </div>

              <div>
                <Label htmlFor="pesan">Pesan Tambahan (Opsional)</Label>
                <textarea
                  id="pesan"
                  rows={3}
                  placeholder="Tulis pesan atau pertanyaan Anda..."
                  {...register('pesan')}
                  className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pendaftaran'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
