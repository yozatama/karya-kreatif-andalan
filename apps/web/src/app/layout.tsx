import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Karya Kreatif Andalan - Rental Mobil & Motor Listrik untuk Driver Online',
    template: '%s | Karya Kreatif Andalan',
  },
  description:
    'Platform rental mobil dan motor listrik terpercaya untuk driver ojol. Proses cepat, harga terjangkau, dan kendaraan berkualitas untuk Gojek, Grab, Maxim, InDrive.',
  keywords: [
    'rental mobil',
    'motor listrik',
    'driver online',
    'Gojek',
    'Grab',
    'Maxim',
    'InDrive',
    'sewa mobil',
    'ojol',
  ],
  openGraph: {
    title: 'Karya Kreatif Andalan - Rental Mobil & Motor Listrik untuk Driver Online',
    description:
      'Platform rental mobil dan motor listrik terpercaya untuk driver ojol.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Karya Kreatif Andalan',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <WhatsAppFloat />
          </QueryProvider>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Karya Kreatif Andalan',
              description: 'Platform rental mobil dan motor listrik untuk driver online',
              url: 'https://karyakreatif.co.id',
              telephone: '+6281234567890',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Jl. Raya Otomotif No. 123',
                addressLocality: 'Jakarta Selatan',
                addressRegion: 'DKI Jakarta',
                postalCode: '12345',
                addressCountry: 'ID',
              },
              priceRange: 'Rp 65.000 - Rp 350.000/hari',
            }),
          }}
        />
      </body>
    </html>
  );
}
