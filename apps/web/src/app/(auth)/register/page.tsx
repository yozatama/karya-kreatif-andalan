"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Car, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    console.log("Register:", data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-navy-800 relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-10 w-10" />
            <span className="text-2xl font-bold">Karya Kreatif Andalan</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Bergabung Menjadi Driver Partner Kami
          </h1>
          <p className="text-navy-300 text-lg">
            Daftarkan diri Anda dan mulai hasilkan penghasilan dengan armada berkualitas dari kami.
          </p>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-3 text-navy-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">1</div>
              Daftar dan verifikasi akun
            </li>
            <li className="flex items-center gap-3 text-navy-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">2</div>
              Pilih kendaraan sesuai kebutuhan
            </li>
            <li className="flex items-center gap-3 text-navy-200">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">3</div>
              Mulai menghasilkan sebagai driver online
            </li>
          </ul>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full" />
      </div>

      {/* Right: Register Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-navy-800">Karya Kreatif Andalan</span>
          </div>

          <h2 className="text-2xl font-bold text-navy-800 mb-2">Buat Akun Baru</h2>
          <p className="text-navy-500 mb-8">
            Isi data di bawah untuk mendaftar sebagai driver partner.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="name"
              type="text"
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="nama@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="phone"
              type="tel"
              label="Nomor Telepon"
              placeholder="08xxxxxxxxxx"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Minimal 6 karakter"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="space-y-1">
              <label className="flex items-start gap-2 text-sm text-navy-600">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 mt-0.5"
                  {...register("terms")}
                />
                <span>
                  Saya menyetujui{" "}
                  <Link href="#" className="text-emerald-600 hover:underline">
                    Syarat dan Ketentuan
                  </Link>{" "}
                  serta{" "}
                  <Link href="#" className="text-emerald-600 hover:underline">
                    Kebijakan Privasi
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500">{errors.terms.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              <UserPlus className="h-4 w-4 mr-2" />
              Daftar Sekarang
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-navy-500">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emerald-600 font-medium hover:text-emerald-700">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
