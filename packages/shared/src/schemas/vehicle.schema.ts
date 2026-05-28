import { z } from 'zod';

export const createVehicleSchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(2, 'Nama kendaraan minimal 2 karakter'),
  brand: z.string().min(1, 'Brand harus diisi'),
  model: z.string().min(1, 'Model harus diisi'),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  licensePlate: z.string().min(1, 'Plat nomor harus diisi'),
  color: z.string().min(1, 'Warna harus diisi'),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  fuelType: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID']),
  seats: z.number().int().min(1).max(20),
  priceDaily: z.number().positive('Harga harian harus positif'),
  priceWeekly: z.number().positive('Harga mingguan harus positif'),
  priceMonthly: z.number().positive('Harga bulanan harus positif'),
  description: z.string().optional(),
  features: z.string().optional(),
});

export const vehicleFilterSchema = z.object({
  categoryId: z.string().uuid().optional(),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']).optional(),
  fuelType: z.enum(['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID']).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  seats: z.number().int().positive().optional(),
  status: z.enum(['AVAILABLE', 'RENTED', 'MAINTENANCE', 'UNAVAILABLE']).optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(50).default(10),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
export type VehicleFilterInput = z.infer<typeof vehicleFilterSchema>;
