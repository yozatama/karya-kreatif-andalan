"use client";

import { use, useState } from "react";
import { ArrowLeft, Send, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supportTickets, ticketMessages } from "@/lib/dashboard-data";
import Link from "next/link";

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
  open: { label: "Open", variant: "info" },
  in_progress: { label: "In Progress", variant: "warning" },
  resolved: { label: "Resolved", variant: "success" },
  closed: { label: "Closed", variant: "default" },
};

export default function SupportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const ticket = supportTickets.find((t) => t.id === id) || supportTickets[0];
  const [reply, setReply] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/support">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-navy-800">{ticket.subject}</h1>
            <Badge variant={statusConfig[ticket.status]?.variant}>
              {statusConfig[ticket.status]?.label}
            </Badge>
          </div>
          <p className="text-sm text-navy-500">Tiket #{ticket.id} - {ticket.category}</p>
        </div>
      </div>

      {/* Chat Messages */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {ticketMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-100 text-navy-800"
                  }`}
                >
                  <p className={`text-xs font-medium mb-1 ${msg.sender === "user" ? "text-emerald-100" : "text-navy-500"}`}>
                    {msg.senderName}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-emerald-200" : "text-navy-400"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reply */}
      {ticket.status !== "closed" && ticket.status !== "resolved" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="flex-1 h-20 rounded-lg border border-gray-300 px-3 py-2 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
                placeholder="Ketik balasan..."
              />
              <Button className="self-end">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency */}
      <a
        href="https://wa.me/6281234567890?text=URGENT%20Tiket%20%23${ticket.id}%3A%20Butuh%20bantuan%20segera"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" className="w-full sm:w-auto">
          <Phone className="h-4 w-4 mr-2 text-green-600" />
          Hubungi via WhatsApp
        </Button>
      </a>
    </div>
  );
}
