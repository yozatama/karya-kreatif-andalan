'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { supportTickets } from '@/lib/mock-dashboard-data';
import { MessageSquare, Phone, Send } from 'lucide-react';

type TicketFilter = 'all' | 'open' | 'in_progress' | 'closed';

export default function SupportPage() {
  const [filter, setFilter] = useState<TicketFilter>('all');
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const filtered = filter === 'all'
    ? supportTickets
    : supportTickets.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bantuan</h1>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
          <Card className="hover:border-emerald-500 transition-colors cursor-pointer h-full">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">WhatsApp Support</p>
                <p className="text-sm text-muted-foreground">Chat langsung dengan tim kami</p>
              </div>
            </CardContent>
          </Card>
        </a>
        <a href="tel:+6281234567890">
          <Card className="hover:border-red-500 transition-colors cursor-pointer h-full">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Emergency Call</p>
                <p className="text-sm text-muted-foreground">Untuk keadaan darurat</p>
              </div>
            </CardContent>
          </Card>
        </a>
      </div>

      {/* Create Ticket Form */}
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>
          <Send className="h-4 w-4 mr-2" /> Buat Tiket Baru
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Buat Tiket Baru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Kategori</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Pilih kategori</option>
                <option value="Kendaraan">Kendaraan</option>
                <option value="Pembayaran">Pembayaran</option>
                <option value="Akun">Akun</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <Label>Prioritas</Label>
              <div className="flex gap-2 mt-1">
                <Button
                  size="sm"
                  variant={priority === 'normal' ? 'default' : 'outline'}
                  onClick={() => setPriority('normal')}
                >
                  Normal
                </Button>
                <Button
                  size="sm"
                  variant={priority === 'urgent' ? 'destructive' : 'outline'}
                  onClick={() => setPriority('urgent')}
                >
                  Urgent
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="subject">Subjek</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Judul masalah Anda"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="message">Pesan</Label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Jelaskan masalah Anda..."
                className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
              <Button>Kirim Tiket</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ticket List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tiket Saya</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {([
              { key: 'all', label: 'Semua' },
              { key: 'open', label: 'Buka' },
              { key: 'in_progress', label: 'Proses' },
              { key: 'closed', label: 'Selesai' },
            ] as { key: TicketFilter; label: string }[]).map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">Tidak ada tiket</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((ticket) => (
                <Link key={ticket.id} href={`/support/${ticket.id}`}>
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ticket.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ticket.createdAt} | {ticket.category}</p>
                      </div>
                      <StatusBadge status={ticket.status} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
