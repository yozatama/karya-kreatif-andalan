"use client";

import React from "react";
import { MessageCircle, Phone, HelpCircle, Plus, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const tickets = [
  { id: "T-001", subject: "Masalah Pembayaran", category: "payment", priority: "high", status: "open", date: "2024-12-14", lastMessage: "Pembayaran saya tidak terkonfirmasi" },
  { id: "T-002", subject: "AC Mobil Bermasalah", category: "vehicle", priority: "medium", status: "in_progress", date: "2024-12-12", lastMessage: "Teknisi akan datang besok pagi" },
  { id: "T-003", subject: "Perpanjangan Rental", category: "booking", priority: "low", status: "resolved", date: "2024-12-08", lastMessage: "Terima kasih, sudah diproses" },
];

export default function SupportPage() {
  const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
  const [ticketDetailOpen, setTicketDetailOpen] = React.useState(false);
  const [selectedTicket, setSelectedTicket] = React.useState<typeof tickets[0] | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open": return <Badge className="bg-blue-100 text-blue-700">Baru</Badge>;
      case "in_progress": return <Badge className="bg-yellow-100 text-yellow-700">Diproses</Badge>;
      case "resolved": return <Badge className="bg-green-100 text-green-700">Selesai</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Pusat Bantuan</h2>

      {/* Quick Links */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">WhatsApp Support</p>
                <p className="text-xs text-gray-500">Chat langsung</p>
              </div>
            </CardContent>
          </Card>
        </a>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="rounded-lg bg-red-100 p-2">
              <Phone className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Darurat 24/7</p>
              <p className="text-xs text-gray-500">0812-3456-7890</p>
            </div>
          </CardContent>
        </Card>
        <a href="/faq">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">FAQ</p>
                <p className="text-xs text-gray-500">Pertanyaan umum</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Create Ticket */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Tiket Bantuan Saya</CardTitle>
            <Button size="sm" onClick={() => setCreateTicketOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Buat Tiket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-start justify-between rounded-lg border p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              onClick={() => { setSelectedTicket(ticket); setTicketDetailOpen(true); }}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500">{ticket.id}</span>
                  {getStatusBadge(ticket.status)}
                </div>
                <p className="text-sm font-medium">{ticket.subject}</p>
                <p className="text-xs text-gray-500">{ticket.lastMessage}</p>
              </div>
              <span className="text-xs text-gray-400">{ticket.date}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Create Ticket Dialog */}
      <Dialog open={createTicketOpen} onOpenChange={setCreateTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Tiket Bantuan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subjek</Label>
              <Input placeholder="Masukkan subjek..." />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option value="">Pilih kategori</option>
                <option value="payment">Pembayaran</option>
                <option value="vehicle">Kendaraan</option>
                <option value="booking">Booking</option>
                <option value="account">Akun</option>
                <option value="other">Lainnya</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Prioritas</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea placeholder="Jelaskan masalah Anda..." rows={4} />
            </div>
            <Button className="w-full" onClick={() => setCreateTicketOpen(false)}>
              Kirim Tiket
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Ticket Detail Dialog */}
      <Dialog open={ticketDetailOpen} onOpenChange={setTicketDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTicket?.subject}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">{selectedTicket.id}</span>
                {getStatusBadge(selectedTicket.status)}
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                <div className="rounded-lg bg-gray-100 dark:bg-gray-700 p-3">
                  <p className="text-xs text-gray-500 mb-1">Anda - {selectedTicket.date}</p>
                  <p className="text-sm">{selectedTicket.lastMessage}</p>
                </div>
                {selectedTicket.status !== "open" && (
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/10 p-3">
                    <p className="text-xs text-gray-500 mb-1">Admin - {selectedTicket.date}</p>
                    <p className="text-sm">Terima kasih telah menghubungi kami. Tim kami sedang memproses permintaan Anda.</p>
                  </div>
                )}
              </div>
              {selectedTicket.status !== "resolved" && (
                <div className="space-y-2">
                  <Textarea placeholder="Tulis balasan..." />
                  <Button className="w-full">Kirim Balasan</Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
