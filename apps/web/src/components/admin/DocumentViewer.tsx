'use client';

import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface DocumentViewerProps {
  label: string;
  type: 'KTP' | 'SIM' | 'Selfie';
  status?: 'pending' | 'approved' | 'rejected';
  onApprove?: () => void;
  onReject?: () => void;
}

export function DocumentViewer({ label, type, status = 'pending', onApprove, onReject }: DocumentViewerProps) {
  const bgColors = {
    KTP: 'bg-blue-100 dark:bg-blue-900/30',
    SIM: 'bg-amber-100 dark:bg-amber-900/30',
    Selfie: 'bg-purple-100 dark:bg-purple-900/30',
  };

  const textColors = {
    KTP: 'text-blue-700 dark:text-blue-400',
    SIM: 'text-amber-700 dark:text-amber-400',
    Selfie: 'text-purple-700 dark:text-purple-400',
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className={`flex h-40 w-full items-center justify-center rounded-lg ${bgColors[type]}`}>
        <span className={`text-lg font-semibold ${textColors[type]}`}>{type}</span>
      </div>
      {status === 'pending' && (
        <div className="flex gap-2">
          <Button size="sm" variant="default" className="flex-1" onClick={onApprove}>
            <Check className="mr-1 h-3 w-3" /> Setujui
          </Button>
          <Button size="sm" variant="destructive" className="flex-1" onClick={onReject}>
            <X className="mr-1 h-3 w-3" /> Tolak
          </Button>
        </div>
      )}
      {status === 'approved' && (
        <p className="text-xs text-emerald-600 font-medium">Disetujui</p>
      )}
      {status === 'rejected' && (
        <p className="text-xs text-red-600 font-medium">Ditolak</p>
      )}
    </div>
  );
}
