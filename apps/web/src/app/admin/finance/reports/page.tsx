"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RevenueLineChart } from "@/components/dashboard/charts";
import { formatCurrency } from "@/lib/utils";
import { monthlyRevenue } from "@/lib/dashboard-data";
import { Download } from "lucide-react";

export default function AdminFinanceReportsPage() {
  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
  const avgMonthly = totalRevenue / monthlyRevenue.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-navy-800">Laporan Revenue</h1><p className="text-navy-500 mt-1">Analisis pendapatan dan tren bisnis</p></div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
      </div>
      <Card><CardContent className="p-4"><div className="flex flex-wrap gap-4 items-end"><Input id="dateFrom" type="date" label="Dari" defaultValue="2024-01-01" /><Input id="dateTo" type="date" label="Sampai" defaultValue="2024-12-31" /><Button>Filter</Button></div></CardContent></Card>
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Total Revenue</p><p className="text-xl font-bold text-navy-800">{formatCurrency(totalRevenue)}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Rata-rata Bulanan</p><p className="text-xl font-bold text-navy-800">{formatCurrency(avgMonthly)}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Pertumbuhan</p><p className="text-xl font-bold text-emerald-600">+12.5%</p></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Tren Pendapatan</CardTitle></CardHeader><CardContent><RevenueLineChart data={monthlyRevenue} /></CardContent></Card>
    </div>
  );
}
