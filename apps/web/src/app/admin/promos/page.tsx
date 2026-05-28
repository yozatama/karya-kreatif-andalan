"use client";

import Link from "next/link";
import { Plus, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { promoCodes } from "@/lib/dashboard-data";

export default function AdminPromosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-navy-800">Manajemen Promo</h1><p className="text-navy-500 mt-1">Kelola kode promo dan diskon</p></div><Link href="/admin/promos/new"><Button><Plus className="h-4 w-4 mr-2" />Buat Promo</Button></Link></div>
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Kode</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Nama</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Diskon</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Penggunaan</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Validitas</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
      </tr></thead><tbody>
        {promoCodes.map((promo) => (<tr key={promo.id} className="border-b last:border-0 hover:bg-gray-50">
          <td className="p-4"><div className="flex items-center gap-2"><Tag className="h-4 w-4 text-navy-400" /><span className="text-sm font-mono font-medium text-navy-800">{promo.code}</span></div></td>
          <td className="p-4 text-sm text-navy-600">{promo.name}</td>
          <td className="p-4 text-sm font-medium text-navy-800">{promo.discountType === "percentage" ? `${promo.discountValue}%` : formatCurrency(promo.discountValue)}</td>
          <td className="p-4 text-sm text-navy-600">{promo.usage}/{promo.limit}</td>
          <td className="p-4 text-xs text-navy-500">{promo.validFrom} - {promo.validTo}</td>
          <td className="p-4"><Badge variant={promo.active ? "success" : "default"}>{promo.active ? "Aktif" : "Nonaktif"}</Badge></td>
        </tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
