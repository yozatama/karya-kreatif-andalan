import Link from 'next/link';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8">
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <FileQuestion className="h-16 w-16 text-primary/60" />
          </div>
          <div className="absolute -top-2 -right-2 h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-destructive font-bold text-sm">!</span>
          </div>
        </div>
      </div>

      <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        Silakan periksa URL atau kembali ke halaman utama.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild>
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/fleet">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Lihat Armada
          </Link>
        </Button>
      </div>
    </div>
  );
}
