import { Car } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-4">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="h-6 w-6 text-primary" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">
        Memuat halaman...
      </p>
    </div>
  );
}
