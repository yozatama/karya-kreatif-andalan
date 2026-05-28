import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { vehicles } from '@/lib/mock-data';
import { FleetDetailClient } from './fleet-detail-client';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);
  if (!vehicle) return { title: 'Kendaraan Tidak Ditemukan' };

  return {
    title: `${vehicle.name} - Rental ${vehicle.type === 'car' ? 'Mobil' : 'Motor Listrik'}`,
    description: `Rental ${vehicle.name} ${vehicle.year} - ${vehicle.transmission === 'automatic' ? 'Otomatis' : 'Manual'} - mulai Rp ${vehicle.pricePerDay.toLocaleString()}/hari. Tersedia untuk driver Gojek, Grab, Maxim, InDrive.`,
    openGraph: {
      title: `${vehicle.name} - Karya Kreatif Andalan`,
      description: `Rental ${vehicle.name} mulai Rp ${vehicle.pricePerDay.toLocaleString()}/hari`,
    },
  };
}

export default async function FleetDetailPage({ params }: Props) {
  const { id } = await params;
  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && v.type === vehicle.type)
    .slice(0, 3);

  return <FleetDetailClient vehicle={vehicle} relatedVehicles={relatedVehicles} />;
}
