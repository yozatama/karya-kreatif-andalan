'use client';

import { use } from 'react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { supportTickets } from '@/lib/mock-dashboard-data';
import { Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function TicketDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  const { ticketId } = use(params);
  const [newMessage, setNewMessage] = useState('');

  const ticket = supportTickets.find((t) => t.id === ticketId);

  if (!ticket) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Tiket tidak ditemukan</p>
        <Link href="/support">
          <Button className="mt-4">Kembali</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/support">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{ticket.subject}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={ticket.status} />
            <span className="text-xs text-muted-foreground">{ticket.category} | {ticket.priority === 'urgent' ? 'Urgent' : 'Normal'}</span>
          </div>
        </div>
      </div>

      {/* Message Thread */}
      <Card className="flex-1">
        <CardContent className="p-4">
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {ticket.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex',
                  msg.sender === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-4 py-2',
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted',
                  )}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={cn(
                    'text-xs mt-1',
                    msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}>
                    {new Date(msg.timestamp).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      {ticket.status !== 'closed' && (
        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Tulis pesan..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] max-h-[120px]"
          />
          <Button disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
