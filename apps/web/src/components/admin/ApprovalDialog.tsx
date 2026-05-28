'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  actionType: 'approve' | 'reject';
  requireReason?: boolean;
  onConfirm: (reason?: string) => void;
}

export function ApprovalDialog({
  open,
  onOpenChange,
  title,
  description,
  actionType,
  requireReason = false,
  onConfirm,
}: ApprovalDialogProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm(reason || undefined);
    setReason('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {(requireReason || actionType === 'reject') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Alasan {actionType === 'reject' ? '(wajib)' : '(opsional)'}</label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Masukkan alasan..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant={actionType === 'approve' ? 'default' : 'destructive'}
            onClick={handleConfirm}
            disabled={actionType === 'reject' && !reason}
          >
            {actionType === 'approve' ? 'Setujui' : 'Tolak'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
