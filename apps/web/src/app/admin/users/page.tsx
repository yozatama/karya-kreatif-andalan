"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminUsers } from "@/lib/dashboard-data";

const verificationConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  belum: { label: "Belum", variant: "default" },
  proses: { label: "Proses", variant: "warning" },
  terverifikasi: { label: "Terverifikasi", variant: "success" },
  ditolak: { label: "Ditolak", variant: "danger" },
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("semua");

  const filtered = adminUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "semua" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Manajemen Pengguna</h1><p className="text-navy-500 mt-1">Kelola dan verifikasi pengguna platform</p></div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" /><input type="text" placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 pl-10 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20" /></div>
        <div className="flex gap-2">
          {["semua", "user", "admin"].map((role) => (<button key={role} onClick={() => setRoleFilter(role)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${roleFilter === role ? "bg-navy-800 text-white" : "bg-gray-100 text-navy-600 hover:bg-gray-200"}`}>{role === "semua" ? "Semua" : role.charAt(0).toUpperCase() + role.slice(1)}</button>))}
        </div>
      </div>
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Nama</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Email</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Role</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Verifikasi</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Rental</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Aksi</th>
      </tr></thead><tbody>
        {filtered.map((user) => (<tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
          <td className="p-4"><p className="text-sm font-medium text-navy-800">{user.name}</p><p className="text-xs text-navy-400">{user.phone}</p></td>
          <td className="p-4 text-sm text-navy-600">{user.email}</td>
          <td className="p-4"><Badge variant={user.role === "admin" ? "info" : "default"}>{user.role}</Badge></td>
          <td className="p-4"><Badge variant={verificationConfig[user.verificationStatus]?.variant}>{verificationConfig[user.verificationStatus]?.label}</Badge></td>
          <td className="p-4 text-sm text-navy-800">{user.activeRentals}</td>
          <td className="p-4"><Link href={`/admin/users/${user.id}`}><Button variant="ghost" size="sm">Detail</Button></Link></td>
        </tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
