import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { vehicles } from '@/lib/mock-data';
import { FleetDetailClient } from './FleetDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return { title: 'Kendaraan Tidak Ditemukan' };

  return {
    title: `${vehicle.name} - Sewa ${vehicle.category === 'mobil' ? 'Mobil' : 'Motor Listrik'} | Karya Kreatif Andalan`,
    description: vehicle.description,
    openGraph: {
      title: `Sewa ${vehicle.name} - Karya Kreatif Andalan`,
      description: vehicle.description,
      images: [{ url: vehicle.imageUrl, width: 800, height: 600 }],
    },
  };
}

export function generateStaticParams() {
  return vehicles.map((v) => ({ id: v.id }));
}

export default async function FleetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = vehicles
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: vehicle.name,
    description: vehicle.description,
    brand: { '@type': 'Brand', name: vehicle.brand },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: vehicle.priceDaily,
      availability: vehicle.status === 'tersedia'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FleetDetailClient vehicle={vehicle} relatedVehicles={relatedVehicles} />
    </>
  );
}
