'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8">
        <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-2">
        Terjadi Kesalahan
      </h1>
      <p className="text-muted-foreground mb-2 max-w-md">
        Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang menangani masalah ini.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-6">
          Kode Error: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={reset}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Coba Lagi
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        Jika masalah berlanjut, hubungi{' '}
        <a
          href="https://wa.me/6281234567890"
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          tim dukungan kami
        </a>
      </p>
    </div>
  );
}
