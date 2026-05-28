import { cn, formatCurrency } from "@/lib/utils";

interface PriceTagProps {
  amount: number;
  period?: string;
  className?: string;
}

export function PriceTag({ amount, period = "/hari", className }: PriceTagProps) {
  return (
    <span className={cn("font-bold text-emerald-600", className)}>
      {formatCurrency(amount)}
      <span className="text-sm font-normal text-navy-500">{period}</span>
    </span>
  );
}
