"use client";

import Link from "next/link";
import { Plus, AlertCircle, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { maintenanceRecords, maintenanceAlerts } from "@/lib/dashboard-data";

export default function AdminMaintenancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-navy-800">Maintenance</h1><p className="text-navy-500 mt-1">Kelola jadwal dan riwayat maintenance armada</p></div><Link href="/admin/maintenance/new"><Button><Plus className="h-4 w-4 mr-2" />Catat Maintenance</Button></Link></div>
      <Card className="border-yellow-200 bg-yellow-50"><CardHeader><CardTitle className="flex items-center gap-2 text-yellow-800"><AlertCircle className="h-5 w-5" />Service Mendatang</CardTitle></CardHeader><CardContent><div className="space-y-2">
        {maintenanceAlerts.map((alert) => (<div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg"><div><p className="text-sm font-medium text-navy-800">{alert.vehicleName} ({alert.plate})</p><p className="text-xs text-navy-500">{alert.type} - Due: {alert.dueDate}</p></div><Badge variant={alert.priority === "tinggi" ? "danger" : alert.priority === "sedang" ? "warning" : "default"}>{alert.priority}</Badge></div>))}
      </div></CardContent></Card>
      <Card><CardHeader><CardTitle>Riwayat Maintenance</CardTitle></CardHeader><CardContent><div className="overflow-x-auto"><table className="w-full"><thead className="border-b"><tr><th className="text-left text-xs font-medium text-navy-500 pb-3">Kendaraan</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Tipe</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Deskripsi</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Biaya</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Tanggal</th><th className="text-left text-xs font-medium text-navy-500 pb-3">Berikutnya</th></tr></thead><tbody>
        {maintenanceRecords.map((record) => (<tr key={record.id} className="border-b last:border-0"><td className="py-3"><p className="text-sm font-medium text-navy-800">{record.vehicleName}</p><p className="text-xs text-navy-400">{record.plate}</p></td><td className="py-3 text-sm text-navy-600">{record.type}</td><td className="py-3 text-sm text-navy-600 max-w-48 truncate">{record.description}</td><td className="py-3 text-sm font-medium text-navy-800">{formatCurrency(record.cost)}</td><td className="py-3 text-sm text-navy-600">{record.date}</td><td className="py-3 text-sm text-navy-600">{record.nextMaintenance}</td></tr>))}
      </tbody></table></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Jadwal Maintenance</CardTitle></CardHeader><CardContent><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {maintenanceRecords.map((record) => (<div key={record.id} className="p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2 mb-2"><Wrench className="h-4 w-4 text-navy-400" /><span className="text-sm font-medium text-navy-800">{record.vehicleName}</span></div><p className="text-xs text-navy-500">Terakhir: {record.date}</p><p className="text-xs text-emerald-600 font-medium">Berikutnya: {record.nextMaintenance}</p></div>))}
      </div></CardContent></Card>
    </div>
  );
}
