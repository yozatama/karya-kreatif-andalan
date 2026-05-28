import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Karya Kreatif Andalan - Rental Mobil & Motor Listrik untuk Driver Online",
  description:
    "Platform rental mobil dan motor listrik terpercaya untuk driver online Gojek, Grab, Maxim, dan InDrive. Harga terjangkau, armada terawat, dan dukungan 24/7.",
  keywords: [
    "rental mobil driver online",
    "rental motor listrik",
    "sewa mobil Gojek",
    "sewa mobil Grab",
    "rental kendaraan online",
    "Karya Kreatif Andalan",
  ],
  openGraph: {
    title: "Karya Kreatif Andalan - Rental Mobil & Motor Listrik untuk Driver Online",
    description:
      "Platform rental mobil dan motor listrik terpercaya untuk driver online. Harga mulai Rp 150.000/hari.",
    type: "website",
    locale: "id_ID",
    siteName: "Karya Kreatif Andalan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
