import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Karya Kreatif Andalan - Rental Kendaraan untuk Driver Online',
    template: '%s | Karya Kreatif Andalan',
  },
  description: 'Platform rental kendaraan terpercaya untuk driver online di Indonesia. Sewa mobil dan motor listrik berkualitas dengan harga terjangkau.',
  metadataBase: new URL('https://karyakreatif.id'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
