import { cn } from '@/lib/utils';
import { CreditCard, Wallet, QrCode } from 'lucide-react';

type MethodType = 'va' | 'ewallet' | 'qris';

const methodConfig: Record<MethodType, { icon: typeof CreditCard; label: string; description: string }> = {
  va: { icon: CreditCard, label: 'Virtual Account', description: 'Transfer via BCA, BNI, BRI, Mandiri' },
  ewallet: { icon: Wallet, label: 'E-Wallet', description: 'GoPay, OVO, DANA, ShopeePay' },
  qris: { icon: QrCode, label: 'QRIS', description: 'Scan QR dari aplikasi pembayaran manapun' },
};

interface PaymentMethodCardProps {
  method: MethodType;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function PaymentMethodCard({ method, selected, onClick, className }: PaymentMethodCardProps) {
  const config = methodConfig[method];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-4 rounded-lg border-2 p-4 cursor-pointer transition-colors',
        selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
        className,
      )}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium text-sm">{config.label}</p>
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </div>
    </div>
  );
}
