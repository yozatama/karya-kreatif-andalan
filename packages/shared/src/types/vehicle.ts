import { VehicleStatus, VehicleTransmission, FuelType } from './enums';

export interface VehicleCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

export interface Vehicle {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  transmission: VehicleTransmission;
  fuelType: FuelType;
  seats: number;
  priceDaily: number;
  priceWeekly: number;
  priceMonthly: number;
  status: VehicleStatus;
  description: string | null;
  features: string | null;
  mileage: number;
  imageUrl: string | null;
  createdAt: Date;
}

export interface VehicleImage {
  id: string;
  vehicleId: string;
  imageUrl: string;
  order: number;
}
