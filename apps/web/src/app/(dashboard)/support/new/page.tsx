"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const ticketSchema = z.object({
  subject: z.string().min(5, "Subjek minimal 5 karakter"),
  category: z.string().min(1, "Pilih kategori"),
  priority: z.string().min(1, "Pilih prioritas"),
  description: z.string().min(20, "Deskripsi minimal 20 karakter"),
});

type TicketForm = z.infer<typeof ticketSchema>;

export default function NewSupportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketForm>({
    resolver: zodResolver(ticketSchema),
  });

  const onSubmit = (data: TicketForm) => {
    console.log("New ticket:", data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/support">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Buat Tiket Baru</h1>
          <p className="text-navy-500">Jelaskan masalah Anda dan kami akan segera membantu</p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="subject"
              label="Subjek"
              placeholder="Ringkasan masalah Anda"
              error={errors.subject?.message}
              {...register("subject")}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Kategori</label>
              <select
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                {...register("category")}
              >
                <option value="">Pilih kategori</option>
                <option value="kendaraan">Kendaraan</option>
                <option value="pembayaran">Pembayaran</option>
                <option value="rental">Rental</option>
                <option value="akun">Akun</option>
                <option value="lainnya">Lainnya</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Prioritas</label>
              <select
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                {...register("priority")}
              >
                <option value="">Pilih prioritas</option>
                <option value="rendah">Rendah</option>
                <option value="sedang">Sedang</option>
                <option value="tinggi">Tinggi</option>
                <option value="urgent">Urgent</option>
              </select>
              {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Deskripsi</label>
              <textarea
                className="w-full h-32 rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                placeholder="Jelaskan masalah Anda secara detail..."
                {...register("description")}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy-700">Lampiran (opsional)</label>
              <input
                type="file"
                className="w-full text-sm text-navy-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Send className="h-4 w-4 mr-2" />
              Kirim Tiket
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
