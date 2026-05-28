import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value?: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  children?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        {value && <div className="text-2xl font-bold">{value}</div>}
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <p className={cn('text-xs', trend.positive ? 'text-emerald-600' : 'text-red-600')}>
            {trend.value}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
