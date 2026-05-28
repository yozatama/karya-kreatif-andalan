'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  subject: z.string().min(1, 'Pilih subjek'),
  message: z.string().min(10, 'Pesan minimal 10 karakter'),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    title: 'WhatsApp',
    description: '+62 812-3456-7890',
    detail: 'Respon cepat 24/7',
    icon: Phone,
    href: 'https://wa.me/6281234567890',
  },
  {
    title: 'Email',
    description: 'info@karyakreatif.co.id',
    detail: 'Respon 1x24 jam',
    icon: Mail,
    href: 'mailto:info@karyakreatif.co.id',
  },
  {
    title: 'Kantor',
    description: 'Jl. Raya Otomotif No. 123',
    detail: 'Jakarta Selatan, DKI Jakarta',
    icon: MapPin,
    href: '#map',
  },
];

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    // In production, this would send to an API
    console.log('Form submitted:', data);
    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-white md:text-4xl">Hubungi Kami</h1>
            <p className="mt-4 text-lg text-navy-200">
              Punya pertanyaan atau ingin konsultasi? Tim kami siap membantu Anda.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border bg-card hover:shadow-lg transition-all"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">{info.title}</h3>
                <p className="mt-1 text-sm font-medium text-foreground">{info.description}</p>
                <p className="text-xs text-muted-foreground">{info.detail}</p>
              </motion.a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border bg-card p-6"
            >
              <h2 className="text-xl font-bold text-card-foreground mb-6">Kirim Pesan</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    id="name"
                    label="Nama Lengkap"
                    placeholder="Nama Anda"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="email@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      id="phone"
                      label="Nomor Telepon"
                      placeholder="08xxxxxxxxxx"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Select id="subject" label="Subjek" {...register('subject')}>
                    <option value="">Pilih Subjek</option>
                    <option value="rental">Informasi Rental</option>
                    <option value="partnership">Program Kemitraan</option>
                    <option value="complaint">Keluhan</option>
                    <option value="other">Lainnya</option>
                  </Select>
                  {errors.subject && (
                    <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tulis pesan Anda di sini..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Kirim Pesan
                </Button>
              </form>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border bg-muted overflow-hidden flex items-center justify-center min-h-[400px]"
            >
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground">Lokasi Kantor</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Jl. Raya Otomotif No. 123<br />
                  Jakarta Selatan, DKI Jakarta 12345
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Senin - Sabtu: 08.00 - 17.00 WIB<br />
                  Minggu: Tutup
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
