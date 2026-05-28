import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/mock-data';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="min-w-[300px] max-w-[350px] flex-shrink-0">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm text-navy-dark">{testimonial.name}</p>
            <Badge variant="secondary" className="text-xs">
              {testimonial.platform}
            </Badge>
          </div>
        </div>
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}
