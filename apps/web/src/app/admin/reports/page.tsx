"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RevenueLineChart, FleetPieChart } from "@/components/dashboard/charts";
import { formatCurrency } from "@/lib/utils";
import { monthlyRevenue, fleetUtilization, adminVehicles } from "@/lib/dashboard-data";
import { Download } from "lucide-react";

const driverMetrics = [
  { label: "Rata-rata Durasi Rental", value: "4.2 bulan" },
  { label: "Retention Rate", value: "78%" },
  { label: "Total Driver Aktif", value: "38" },
  { label: "Driver Baru Bulan Ini", value: "5" },
];

export default function AdminReportsPage() {
  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-navy-800">Laporan</h1><p className="text-navy-500 mt-1">Analisis performa bisnis secara keseluruhan</p></div><Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Semua</Button></div>
      <Tabs defaultValue="pendapatan">
        <TabsList><TabsTrigger value="pendapatan">Pendapatan</TabsTrigger><TabsTrigger value="armada">Armada</TabsTrigger><TabsTrigger value="driver">Driver</TabsTrigger><TabsTrigger value="profitabilitas">Profitabilitas</TabsTrigger></TabsList>
        <TabsContent value="pendapatan"><div className="space-y-6">
          <div className="grid grid-cols-3 gap-4"><Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Total Revenue</p><p className="text-xl font-bold text-navy-800">{formatCurrency(totalRevenue)}</p></CardContent></Card><Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Bulan Terakhir</p><p className="text-xl font-bold text-navy-800">{formatCurrency(48000000)}</p></CardContent></Card><Card><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">Growth YoY</p><p className="text-xl font-bold text-emerald-600">+23.5%</p></CardContent></Card></div>
          <Card><CardHeader><CardTitle>Tren Pendapatan Bulanan</CardTitle></CardHeader><CardContent><RevenueLineChart data={monthlyRevenue} /></CardContent></Card>
        </div></TabsContent>
        <TabsContent value="armada"><div className="space-y-6">
          <Card><CardHeader><CardTitle>Utilisasi Armada</CardTitle></CardHeader><CardContent><FleetPieChart data={fleetUtilization} /></CardContent></Card>
          <Card><CardHeader><CardTitle>Utilisasi per Kendaraan</CardTitle></CardHeader><CardContent><div className="space-y-3">
            {adminVehicles.map((vehicle) => { const utilization = vehicle.status === "disewakan" ? 100 : 0; return (<div key={vehicle.id} className="flex items-center gap-4"><div className="flex-1"><div className="flex justify-between text-sm mb-1"><span className="text-navy-800 font-medium">{vehicle.name}</span><span className="text-navy-500">{utilization}%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${utilization}%` }} /></div></div></div>); })}
          </div></CardContent></Card>
        </div></TabsContent>
        <TabsContent value="driver"><div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{driverMetrics.map((metric) => (<Card key={metric.label}><CardContent className="p-4 text-center"><p className="text-sm text-navy-500">{metric.label}</p><p className="text-xl font-bold text-navy-800">{metric.value}</p></CardContent></Card>))}</div>
          <Card><CardHeader><CardTitle>Top Drivers</CardTitle></CardHeader><CardContent><div className="space-y-3">
            {["Budi Santoso - 24 bulan", "Ahmad Rizki - 18 bulan", "Eko Prasetyo - 12 bulan", "Rudi Hermawan - 8 bulan", "Agus Widodo - 6 bulan"].map((driver, i) => (<div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"><span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs font-bold text-emerald-700">{i + 1}</span><span className="text-sm text-navy-800">{driver}</span></div>))}
          </div></CardContent></Card>
        </div></TabsContent>
        <TabsContent value="profitabilitas"><Card><CardHeader><CardTitle>Profitabilitas per Kendaraan</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full"><thead><tr className="border-b"><th className="text-left text-xs font-medium text-navy-500 pb-3">Kendaraan</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Revenue/bln</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Biaya/bln</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Profit/bln</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Margin</th></tr></thead><tbody>
          {adminVehicles.filter((v) => v.status === "disewakan").map((vehicle) => { const revenue = vehicle.dailyRate * 30; const cost = revenue * 0.3; const profit = revenue - cost; const margin = ((profit / revenue) * 100).toFixed(0); return (<tr key={vehicle.id} className="border-b last:border-0"><td className="py-3 text-sm font-medium text-navy-800">{vehicle.name}</td><td className="py-3 text-sm text-navy-800">{formatCurrency(revenue)}</td><td className="py-3 text-sm text-navy-600">{formatCurrency(cost)}</td><td className="py-3 text-sm font-medium text-emerald-600">{formatCurrency(profit)}</td><td className="py-3 text-sm font-medium text-navy-800">{margin}%</td></tr>); })}
        </tbody></table></div></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
