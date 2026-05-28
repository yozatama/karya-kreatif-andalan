import { COMPANY_INFO } from '@/lib/constants';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const waUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent('Halo, saya tertarik untuk menyewa kendaraan di Karya Kreatif Andalan.')}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors hover:scale-110 transform duration-200"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </a>
  );
}
