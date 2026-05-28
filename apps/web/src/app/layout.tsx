import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karya Kreatif Andalan - Vehicle Rental Platform",
  description: "Car and motorcycle rental platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
