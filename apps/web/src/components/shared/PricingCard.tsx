import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  popular = false,
  ctaText = 'Pilih Paket',
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative transition-all hover:shadow-lg',
        popular && 'border-primary shadow-md scale-105',
      )}
    >
      {popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Paling Populer
        </Badge>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-6">
          <span className="text-3xl font-bold text-navy-dark">{price}</span>
          <span className="text-muted-foreground text-sm">/{period}</span>
        </div>
        <ul className="space-y-3 text-sm text-left mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={popular ? 'default' : 'outline'}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
