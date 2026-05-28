"use client";

import Link from "next/link";
import { Plus, MessageSquare, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supportTickets } from "@/lib/dashboard-data";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  open: { label: "Open", variant: "info" },
  in_progress: { label: "In Progress", variant: "warning" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "default" },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  rendah: { label: "Rendah", color: "text-gray-500" },
  sedang: { label: "Sedang", color: "text-yellow-600" },
  tinggi: { label: "Tinggi", color: "text-orange-600" },
  urgent: { label: "Urgent", color: "text-red-600" },
};

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Support</h1>
          <p className="text-navy-500 mt-1">Kelola tiket support dan dapatkan bantuan</p>
        </div>
        <Link href="/support/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tiket Baru
          </Button>
        </Link>
      </div>

      {/* Emergency Button */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-red-700">Butuh Bantuan Darurat?</p>
            <p className="text-sm text-red-600">Hubungi kami langsung via WhatsApp untuk masalah urgent.</p>
          </div>
          <a
            href="https://wa.me/6281234567890?text=URGENT%3A%20Butuh%20bantuan%20darurat"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="destructive" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              WhatsApp Darurat
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-3">
        {supportTickets.map((ticket) => (
          <Link key={ticket.id} href={`/support/${ticket.id}`}>
            <Card className="hover:border-emerald-200 transition-colors cursor-pointer mb-3">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-navy-400" />
                      <p className="font-semibold text-navy-800">{ticket.subject}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-navy-400">{ticket.category}</span>
                      <span className={`text-xs font-medium ${priorityConfig[ticket.priority]?.color}`}>
                        {priorityConfig[ticket.priority]?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusConfig[ticket.status]?.variant}>
                      {statusConfig[ticket.status]?.label}
                    </Badge>
                    <span className="text-xs text-navy-400">{ticket.lastReply}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
