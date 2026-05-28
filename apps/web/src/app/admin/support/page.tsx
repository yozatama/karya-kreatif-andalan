"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supportTickets } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  open: { label: "Open", variant: "info" },
  in_progress: { label: "In Progress", variant: "warning" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "default" },
};

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Support Tickets</h1><p className="text-navy-500 mt-1">Kelola tiket support dari driver</p></div>
      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-navy-800">{supportTickets.length}</p><p className="text-xs text-navy-500">Total</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-blue-600">{supportTickets.filter((t) => t.status === "open").length}</p><p className="text-xs text-navy-500">Open</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-yellow-600">{supportTickets.filter((t) => t.status === "in_progress").length}</p><p className="text-xs text-navy-500">In Progress</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{supportTickets.filter((t) => t.status === "resolved").length}</p><p className="text-xs text-navy-500">Resolved</p></CardContent></Card>
      </div>
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr>
        <th className="text-left text-xs font-medium text-navy-500 p-4">ID</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Subjek</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Kategori</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Prioritas</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Terakhir</th>
      </tr></thead><tbody>
        {supportTickets.map((ticket) => (<tr key={ticket.id} className="border-b last:border-0 hover:bg-gray-50">
          <td className="p-4 text-sm font-mono text-navy-600">#{ticket.id}</td>
          <td className="p-4 text-sm font-medium text-navy-800">{ticket.subject}</td>
          <td className="p-4 text-sm text-navy-600">{ticket.category}</td>
          <td className="p-4"><Badge variant={ticket.priority === "tinggi" || ticket.priority === "urgent" ? "danger" : "warning"}>{ticket.priority}</Badge></td>
          <td className="p-4"><Badge variant={statusConfig[ticket.status]?.variant}>{statusConfig[ticket.status]?.label}</Badge></td>
          <td className="p-4 text-sm text-navy-500">{ticket.lastReply}</td>
        </tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
