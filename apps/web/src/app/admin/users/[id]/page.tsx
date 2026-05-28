"use client";

import { use } from "react";
import { ArrowLeft, CheckCircle, XCircle, Ban, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminUsers } from "@/lib/dashboard-data";
import Link from "next/link";

const verificationConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  belum: { label: "Belum Verifikasi", variant: "default" },
  proses: { label: "Dalam Proses", variant: "warning" },
  terverifikasi: { label: "Terverifikasi", variant: "success" },
  ditolak: { label: "Ditolak", variant: "danger" },
};

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const user = adminUsers.find((u) => u.id === id) || adminUsers[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link>
        <div><h1 className="text-2xl font-bold text-navy-800">{user.name}</h1><p className="text-navy-500">{user.email}</p></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Informasi Pengguna</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between"><span className="text-navy-500">Nama</span><span className="font-medium text-navy-800">{user.name}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Email</span><span className="font-medium text-navy-800">{user.email}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Telepon</span><span className="font-medium text-navy-800">{user.phone}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Role</span><Badge variant={user.role === "admin" ? "info" : "default"}>{user.role}</Badge></div>
            <div className="flex justify-between"><span className="text-navy-500">Bergabung</span><span className="font-medium text-navy-800">{user.joinDate}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Rental Aktif</span><span className="font-medium text-navy-800">{user.activeRentals}</span></div>
            <div className="flex justify-between"><span className="text-navy-500">Status Verifikasi</span><Badge variant={verificationConfig[user.verificationStatus]?.variant}>{verificationConfig[user.verificationStatus]?.label}</Badge></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Dokumen</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["KTP", "SIM", "Selfie"].map((doc) => (
              <div key={doc} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3"><FileText className="h-5 w-5 text-navy-400" /><span className="text-sm font-medium text-navy-800">{doc}</span></div>
                <Badge variant={user.verified ? "success" : "warning"}>{user.verified ? "Uploaded" : "Pending"}</Badge>
              </div>
            ))}
            {(user.verificationStatus === "proses" || user.verificationStatus === "belum") && (
              <div className="flex gap-3 pt-3 border-t"><Button className="flex-1"><CheckCircle className="h-4 w-4 mr-2" />Approve</Button><Button variant="destructive" className="flex-1"><XCircle className="h-4 w-4 mr-2" />Reject</Button></div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card><CardHeader><CardTitle>Aksi Admin</CardTitle></CardHeader><CardContent><Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"><Ban className="h-4 w-4 mr-2" />Suspend Akun</Button></CardContent></Card>
    </div>
  );
}
