"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Car, Mail, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log("Login:", data);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-600 relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-white max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <Car className="h-10 w-10" />
            <span className="text-2xl font-bold">Karya Kreatif Andalan</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Mulai Perjalanan Anda Bersama Kami
          </h1>
          <p className="text-emerald-100 text-lg">
            Platform rental kendaraan terpercaya untuk driver online. Kelola rental, pembayaran, dan kendaraan Anda dalam satu tempat.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-emerald-200 text-sm">Driver Aktif</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-3xl font-bold">200+</p>
              <p className="text-emerald-200 text-sm">Armada Tersedia</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/30 rounded-full" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full" />
      </div>

      {/* Right: Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Car className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-navy-800">Karya Kreatif Andalan</span>
          </div>

          <h2 className="text-2xl font-bold text-navy-800 mb-2">Masuk ke Akun Anda</h2>
          <p className="text-navy-500 mb-8">
            Selamat datang kembali! Masukkan data Anda untuk melanjutkan.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="nama@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Masukkan password"
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-navy-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Ingat saya
              </label>
              <Link href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                Lupa password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              <Mail className="h-4 w-4 mr-2" />
              Masuk dengan Email
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gray-50 px-4 text-navy-400">Atau masuk dengan</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2 text-green-600" />
                WhatsApp OTP
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-navy-500">
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-600 font-medium hover:text-emerald-700">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
