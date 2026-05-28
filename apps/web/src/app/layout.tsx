import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Karya Kreatif Andalan - Rental Mobil & Motor Listrik untuk Driver Online',
  description:
    'Platform rental mobil dan motor listrik terpercaya untuk driver ojol. Proses cepat, harga terjangkau, dan kendaraan berkualitas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
