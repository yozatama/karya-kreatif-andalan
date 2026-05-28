import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  ctaText?: string;
  onCta?: () => void;
}

export function EmptyState({
  title = 'Tidak ada hasil',
  message = 'Coba ubah filter atau kata kunci pencarian Anda.',
  ctaText,
  onCta,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-navy-dark">{title}</h3>
      <p className="text-muted-foreground mt-1 max-w-sm">{message}</p>
      {ctaText && onCta && (
        <Button onClick={onCta} variant="outline" className="mt-4">
          {ctaText}
        </Button>
      )}
    </div>
  );
}
