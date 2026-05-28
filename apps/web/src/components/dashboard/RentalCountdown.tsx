import { cn } from '@/lib/utils';

interface RentalCountdownProps {
  daysRemaining: number;
  totalDays: number;
  className?: string;
}

export function RentalCountdown({ daysRemaining, totalDays, className }: RentalCountdownProps) {
  const daysUsed = totalDays - daysRemaining;
  const progress = (daysUsed / totalDays) * 100;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Sisa waktu</span>
        <span className="font-semibold text-primary">{daysRemaining} hari</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{daysUsed} hari terpakai</span>
        <span>{totalDays} hari total</span>
      </div>
    </div>
  );
}
