import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import type { Vehicle } from '@/lib/mock-data';
import { Users, Fuel, Gauge } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
        <span className="text-emerald-700 font-semibold text-sm text-center px-4">
          {vehicle.name}
        </span>
        <Badge
          className="absolute top-3 right-3"
          variant={vehicle.status === 'tersedia' ? 'default' : 'secondary'}
        >
          {vehicle.status === 'tersedia' ? 'Tersedia' : vehicle.status === 'disewa' ? 'Disewa' : 'Maintenance'}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-navy-dark">{vehicle.name}</h3>
        <p className="text-primary font-bold text-lg mt-1">
          {formatCurrency(vehicle.priceDaily)}
          <span className="text-sm font-normal text-muted-foreground">/hari</span>
        </p>
        <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {vehicle.seats}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {vehicle.transmission === 'otomatis' ? 'AT' : 'MT'}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {vehicle.fuelType}
          </span>
        </div>
        <Button asChild className="w-full mt-4" size="sm">
          <Link href={`/fleet/${vehicle.id}`}>Lihat Detail</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
