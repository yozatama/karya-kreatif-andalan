"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function WhatsAppButton() {
  const message = encodeURIComponent(
    "Halo, saya tertarik untuk rental kendaraan di Karya Kreatif Andalan. Bisa info lebih lanjut?"
  );

  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 animate-pulse"
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
