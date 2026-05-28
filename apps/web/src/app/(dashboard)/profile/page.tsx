"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Phone, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuthStore } from "@/stores/auth-store";

const profileSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().optional(),
  platform: z.string().optional(),
});

const emergencySchema = z.object({
  emergencyName: z.string().min(3, "Nama minimal 3 karakter"),
  emergencyPhone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  emergencyRelation: z.string().min(1, "Hubungan harus diisi"),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password minimal 6 karakter"),
    newPassword: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    email: true,
    push: false,
    payment: true,
    booking: true,
    promo: false,
  });

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: "Jl. Gatot Subroto No. 123, Jakarta Selatan",
      platform: user?.platform || "Gojek",
    },
  });

  const emergencyForm = useForm({
    resolver: zodResolver(emergencySchema),
    defaultValues: {
      emergencyName: "Siti Rahayu",
      emergencyPhone: "081234567899",
      emergencyRelation: "Istri",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Profil</h1>
        <p className="text-navy-500 mt-1">Kelola informasi akun dan preferensi Anda</p>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="w-full sm:w-auto overflow-x-auto">
          <TabsTrigger value="personal">Informasi Pribadi</TabsTrigger>
          <TabsTrigger value="emergency">Kontak Darurat</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-emerald-600" />
                Informasi Pribadi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={profileForm.handleSubmit((data) => console.log(data))} className="space-y-4 max-w-lg">
                <Input
                  id="name"
                  label="Nama Lengkap"
                  error={profileForm.formState.errors.name?.message}
                  {...profileForm.register("name")}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-navy-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-navy-400">Email tidak dapat diubah</p>
                </div>
                <Input
                  id="phone"
                  label="Nomor Telepon"
                  error={profileForm.formState.errors.phone?.message}
                  {...profileForm.register("phone")}
                />
                <Input
                  id="address"
                  label="Alamat"
                  {...profileForm.register("address")}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">Platform Utama</label>
                  <select
                    className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    {...profileForm.register("platform")}
                  >
                    <option value="Gojek">Gojek</option>
                    <option value="Grab">Grab</option>
                    <option value="Maxim">Maxim</option>
                    <option value="InDrive">InDrive</option>
                  </select>
                </div>
                <Button type="submit">Simpan Perubahan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Contact */}
        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-emerald-600" />
                Kontak Darurat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={emergencyForm.handleSubmit((data) => console.log(data))} className="space-y-4 max-w-lg">
                <Input
                  id="emergencyName"
                  label="Nama"
                  error={emergencyForm.formState.errors.emergencyName?.message}
                  {...emergencyForm.register("emergencyName")}
                />
                <Input
                  id="emergencyPhone"
                  label="Nomor Telepon"
                  error={emergencyForm.formState.errors.emergencyPhone?.message}
                  {...emergencyForm.register("emergencyPhone")}
                />
                <Input
                  id="emergencyRelation"
                  label="Hubungan"
                  placeholder="Contoh: Istri, Suami, Orang Tua"
                  error={emergencyForm.formState.errors.emergencyRelation?.message}
                  {...emergencyForm.register("emergencyRelation")}
                />
                <Button type="submit">Simpan Perubahan</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Ubah Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={passwordForm.handleSubmit((data) => console.log(data))} className="space-y-4 max-w-lg">
                <Input
                  id="oldPassword"
                  type="password"
                  label="Password Lama"
                  error={passwordForm.formState.errors.oldPassword?.message as string | undefined}
                  {...passwordForm.register("oldPassword")}
                />
                <Input
                  id="newPassword"
                  type="password"
                  label="Password Baru"
                  error={passwordForm.formState.errors.newPassword?.message as string | undefined}
                  {...passwordForm.register("newPassword")}
                />
                <Input
                  id="confirmPassword"
                  type="password"
                  label="Konfirmasi Password Baru"
                  error={passwordForm.formState.errors.confirmPassword?.message as string | undefined}
                  {...passwordForm.register("confirmPassword")}
                />
                <Button type="submit">Ubah Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-600" />
                Preferensi Notifikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-w-lg">
                <h3 className="text-sm font-semibold text-navy-700">Channel Notifikasi</h3>
                {[
                  { key: "whatsapp", label: "WhatsApp", desc: "Terima notifikasi via WhatsApp" },
                  { key: "email", label: "Email", desc: "Terima notifikasi via email" },
                  { key: "push", label: "Push Notification", desc: "Notifikasi browser/app" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-navy-800">{item.label}</p>
                      <p className="text-xs text-navy-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}

                <h3 className="text-sm font-semibold text-navy-700 pt-4">Kategori Notifikasi</h3>
                {[
                  { key: "payment", label: "Pembayaran", desc: "Reminder dan konfirmasi pembayaran" },
                  { key: "booking", label: "Booking", desc: "Update status booking" },
                  { key: "promo", label: "Promo & Diskon", desc: "Informasi promo terbaru" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-navy-800">{item.label}</p>
                      <p className="text-xs text-navy-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-emerald-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
