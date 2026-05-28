"use client";

import React from "react";
import { User, Shield, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth-store";

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [notifications, setNotifications] = React.useState({
    emailBooking: true,
    emailPayment: true,
    emailPromo: false,
    emailSystem: true,
    waBooking: true,
    waPayment: true,
    waPromo: true,
    waSystem: false,
    pushBooking: true,
    pushPayment: true,
    pushPromo: false,
    pushSystem: true,
  });

  const toggleNotif = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Pengaturan</h2>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Informasi Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Avatar Upload */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Ganti Foto</Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Depan</Label>
                  <Input defaultValue={user?.firstName} />
                </div>
                <div className="space-y-2">
                  <Label>Nama Belakang</Label>
                  <Input defaultValue={user?.lastName} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label>No. Telepon</Label>
                  <Input defaultValue={user?.phone} />
                </div>
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <select className="w-full rounded-md border p-2 text-sm" defaultValue={user?.platform}>
                    <option value="Gojek">Gojek</option>
                    <option value="Grab">Grab</option>
                    <option value="Maxim">Maxim</option>
                    <option value="InDrive">InDrive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Kontak Darurat</Label>
                  <Input placeholder="No. HP kontak darurat" defaultValue="082345678901" />
                </div>
              </div>
              <Button>Simpan Perubahan</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ubah Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password Saat Ini</Label>
                <Input type="password" placeholder="Masukkan password saat ini" />
              </div>
              <div className="space-y-2">
                <Label>Password Baru</Label>
                <Input type="password" placeholder="Masukkan password baru" />
              </div>
              <div className="space-y-2">
                <Label>Konfirmasi Password Baru</Label>
                <Input type="password" placeholder="Ulangi password baru" />
              </div>
              <Button>Ubah Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preferensi Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "Booking", keys: ["emailBooking", "waBooking", "pushBooking"] },
                { title: "Pembayaran", keys: ["emailPayment", "waPayment", "pushPayment"] },
                { title: "Promo", keys: ["emailPromo", "waPromo", "pushPromo"] },
                { title: "Sistem", keys: ["emailSystem", "waSystem", "pushSystem"] },
              ].map((group) => (
                <div key={group.title} className="space-y-3">
                  <h4 className="text-sm font-medium">{group.title}</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {["Email", "WhatsApp", "Push"].map((channel, i) => (
                      <div key={channel} className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{channel}</span>
                        <Switch
                          checked={notifications[group.keys[i] as keyof typeof notifications]}
                          onCheckedChange={() => toggleNotif(group.keys[i])}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
