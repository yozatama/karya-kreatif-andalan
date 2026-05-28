'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    content:
      'Halo! Saya asisten booking Karya Kreatif Andalan. Saya bisa bantu Anda memilih kendaraan yang tepat.',
    sender: 'ai',
    timestamp: new Date(),
    options: ['Cari mobil listrik', 'Cari motor listrik', 'Lihat promo'],
  },
];

const mockResponses: Record<string, { content: string; options?: string[] }> = {
  'Cari mobil listrik': {
    content:
      'Untuk mobil listrik, kami punya beberapa pilihan:\n\n1. Wuling Air EV - Rp 185.000/hari\n2. Hyundai Ioniq 5 - Rp 350.000/hari\n3. BYD Dolphin - Rp 250.000/hari\n\nMau cari untuk platform apa?',
    options: ['Gojek', 'Grab', 'Maxim', 'InDrive'],
  },
  'Cari motor listrik': {
    content:
      'Untuk motor listrik tersedia:\n\n1. Viar Q1 - Rp 65.000/hari\n2. Gesits - Rp 75.000/hari\n3. Volta - Rp 70.000/hari\n\nSemua sudah termasuk charger portable. Mau untuk platform apa?',
    options: ['Gojek', 'Grab', 'Maxim', 'InDrive'],
  },
  'Lihat promo': {
    content:
      'Promo bulan ini:\n\n- Diskon 20% untuk booking mingguan\n- Gratis 3 hari pertama untuk driver baru\n- Cashback Rp 50.000 referral teman\n\nMau booking sekarang?',
    options: ['Booking sekarang', 'Tanya lagi'],
  },
  Gojek: {
    content:
      'Untuk driver Gojek, kami rekomendasikan Wuling Air EV karena ukurannya compact dan irit. Estimasi pendapatan Rp 250.000-350.000/hari. Mau lanjut booking?',
    options: ['Booking sekarang', 'Lihat opsi lain'],
  },
  Grab: {
    content:
      'Untuk driver Grab, BYD Dolphin cocok karena kapasitas baterai besar dan ruang penumpang luas. Estimasi pendapatan Rp 300.000-400.000/hari.',
    options: ['Booking sekarang', 'Lihat opsi lain'],
  },
  Maxim: {
    content:
      'Untuk driver Maxim, Wuling Air EV paling populer. Biaya operasional rendah dan cocok untuk ride-sharing. Estimasi pendapatan Rp 200.000-300.000/hari.',
    options: ['Booking sekarang', 'Lihat opsi lain'],
  },
  InDrive: {
    content:
      'Untuk InDrive, kami sarankan BYD Dolphin atau Hyundai Ioniq 5. Kendaraan premium bisa dapat order tarif lebih tinggi.',
    options: ['Booking sekarang', 'Lihat opsi lain'],
  },
  'Booking sekarang': {
    content:
      'Silakan kunjungi halaman Booking di Dashboard Anda atau hubungi CS kami di WhatsApp untuk proses lebih cepat. Ada yang bisa saya bantu lagi?',
    options: ['Tanya lagi', 'Selesai'],
  },
  'Lihat opsi lain': {
    content: 'Mau cari tipe kendaraan apa?',
    options: ['Cari mobil listrik', 'Cari motor listrik'],
  },
  'Tanya lagi': {
    content: 'Tentu! Apa yang ingin Anda ketahui?',
    options: ['Cari mobil listrik', 'Cari motor listrik', 'Lihat promo'],
  },
  Selesai: {
    content:
      'Terima kasih telah menggunakan asisten kami! Semoga berhasil dengan perjalanan Anda. Sampai jumpa!',
  },
};

export function BookingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[messageText] || {
        content:
          'Maaf, saya belum memahami pertanyaan Anda. Bisa pilih salah satu opsi di bawah?',
        options: ['Cari mobil listrik', 'Cari motor listrik', 'Lihat promo'],
      };

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'ai',
        timestamp: new Date(),
        options: response.options,
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-background border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <div>
                  <p className="font-medium text-sm">AI Asisten Booking</p>
                  <p className="text-xs opacity-80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    {msg.options && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleSend(option)}
                            className="px-2 py-1 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button type="submit" size="icon" className="h-9 w-9">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
