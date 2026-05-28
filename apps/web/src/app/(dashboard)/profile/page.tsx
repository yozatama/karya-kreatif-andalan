'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { currentUser } from '@/lib/mock-dashboard-data';
import { User, Lock, Bell, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabKey = 'profil' | 'keamanan' | 'notifikasi';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('profil');

  // Profile form
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address);
  const [emergencyName, setEmergencyName] = useState(currentUser.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser.emergencyContact.phone);

  // Security
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [waNotif, setWaNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [rentalNotif, setRentalNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(true);
  const [systemNotif, setSystemNotif] = useState(true);

  const tabs: { key: TabKey; label: string; icon: typeof User }[] = [
    { key: 'profil', label: 'Profil', icon: User },
    { key: 'keamanan', label: 'Keamanan', icon: Lock },
    { key: 'notifikasi', label: 'Notifikasi', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pengaturan</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors',
              activeTab === tab.key
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted',
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profil Tab */}
      {activeTab === 'profil' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                {currentUser.name.charAt(0)}
              </div>
              <Button variant="outline" size="sm">Ganti Foto</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={currentUser.email} disabled className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Telepon</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">Alamat</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium text-sm mb-3">Kontak Darurat</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyName">Nama</Label>
                  <Input id="emergencyName" value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="emergencyPhone">Telepon</Label>
                  <Input id="emergencyPhone" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>

            <Button>
              <Save className="h-4 w-4 mr-2" /> Simpan Perubahan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Keamanan Tab */}
      {activeTab === 'keamanan' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ganti Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="oldPassword">Password Lama</Label>
                <Input id="oldPassword" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="newPassword">Password Baru</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1" />
              </div>
              <Button>Ganti Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sesi Aktif</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Browser ini</p>
                    <p className="text-xs text-muted-foreground">Chrome di Windows - Jakarta</p>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 rounded-full px-2 py-0.5">Aktif</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">Mobile</p>
                    <p className="text-xs text-muted-foreground">Safari di iPhone - 2 hari lalu</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600">Hapus</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifikasi Tab */}
      {activeTab === 'notifikasi' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Channel Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow label="Email Notifications" enabled={emailNotif} onChange={setEmailNotif} />
              <ToggleRow label="WhatsApp Notifications" enabled={waNotif} onChange={setWaNotif} />
              <ToggleRow label="Push Notifications" enabled={pushNotif} onChange={setPushNotif} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kategori Notifikasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow label="Pembayaran" description="Pengingat jatuh tempo, konfirmasi pembayaran" enabled={paymentNotif} onChange={setPaymentNotif} />
              <ToggleRow label="Rental" description="Status booking, perpanjangan, pengembalian" enabled={rentalNotif} onChange={setRentalNotif} />
              <ToggleRow label="Promo" description="Penawaran khusus dan diskon" enabled={promoNotif} onChange={setPromoNotif} />
              <ToggleRow label="Sistem" description="Update aplikasi, maintenance" enabled={systemNotif} onChange={setSystemNotif} />
            </CardContent>
          </Card>

          <Button>
            <Save className="h-4 w-4 mr-2" /> Simpan Preferensi
          </Button>
        </div>
      )}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          enabled ? 'bg-primary' : 'bg-muted-foreground/30',
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            enabled ? 'translate-x-6' : 'translate-x-1',
          )}
        />
      </button>
    </div>
  );
}
