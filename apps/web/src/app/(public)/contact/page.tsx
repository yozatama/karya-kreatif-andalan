'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO } from '@/lib/constants';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const contactSchema = z.object({
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  subjek: z.string().min(3, 'Subjek minimal 3 karakter'),
  pesan: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat',
    value: COMPANY_INFO.address,
  },
  {
    icon: Phone,
    title: 'Telepon',
    value: COMPANY_INFO.phone,
  },
  {
    icon: Mail,
    title: 'Email',
    value: COMPANY_INFO.email,
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: COMPANY_INFO.operatingHours,
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormValues) => {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Pesan berhasil dikirim! Tim kami akan menghubungi Anda segera.');
    reset();
  };

  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang layanan Karya Kreatif Andalan.')}`;

  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-600 to-navy-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Hubungi Kami</h1>
          <p className="text-emerald-100 mt-3 max-w-xl mx-auto">
            Punya pertanyaan? Tim kami siap membantu Anda. Hubungi kami melalui form di bawah atau langsung via WhatsApp.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-navy-dark mb-6">Kirim Pesan</h2>
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
                <Label htmlFor="subjek">Subjek</Label>
                <Input id="subjek" placeholder="Subjek pesan" {...register('subjek')} className="mt-1" />
                {errors.subjek && <p className="text-sm text-destructive mt-1">{errors.subjek.message}</p>}
              </div>

              <div>
                <Label htmlFor="pesan">Pesan</Label>
                <textarea
                  id="pesan"
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  {...register('pesan')}
                  className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.pesan && <p className="text-sm text-destructive mt-1">{errors.pesan.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-navy-dark mb-6">Informasi Kontak</h2>
            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => (
                <Card key={info.title}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-dark text-sm">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">{info.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Button */}
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              size="lg"
              asChild
            >
              <a href={waUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat via WhatsApp
              </a>
            </Button>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Lokasi Kami</p>
                <p className="text-xs text-muted-foreground mt-1">{COMPANY_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
