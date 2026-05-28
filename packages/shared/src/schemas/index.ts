import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit').optional(),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  firstName: z.string().min(2, 'Nama depan minimal 2 karakter'),
  lastName: z.string().min(2, 'Nama belakang minimal 2 karakter'),
  platform: z.enum(['GOJEK', 'GRAB', 'MAXIM', 'INDRIVE', 'OTHER']).optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export const createBookingSchema = z.object({
  vehicleId: z.string().min(1, 'Vehicle ID wajib diisi'),
  startDate: z.string().datetime('Format tanggal tidak valid'),
  endDate: z.string().datetime('Format tanggal tidak valid'),
  pickupLocation: z.string().optional(),
  notes: z.string().optional(),
});

export const createPaymentSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID wajib diisi'),
  amount: z.number().positive('Jumlah harus lebih dari 0'),
  method: z.enum(['VIRTUAL_ACCOUNT', 'EWALLET', 'QRIS', 'BANK_TRANSFER']),
});

export const createVehicleSchema = z.object({
  name: z.string().min(2, 'Nama kendaraan minimal 2 karakter'),
  brand: z.string().min(1, 'Merek wajib diisi'),
  model: z.string().min(1, 'Model wajib diisi'),
  year: z.number().int().min(2000).max(new Date().getFullYear() + 1),
  type: z.enum(['CAR', 'ELECTRIC_MOTORCYCLE']),
  licensePlate: z.string().min(1, 'Plat nomor wajib diisi'),
  color: z.string().min(1, 'Warna wajib diisi'),
  transmission: z.enum(['MANUAL', 'AUTOMATIC']),
  fuelType: z.string().optional(),
  seats: z.number().int().positive().optional(),
  pricePerDay: z.number().positive('Harga per hari harus lebih dari 0'),
  pricePerWeek: z.number().positive().optional(),
  pricePerMonth: z.number().positive().optional(),
  deposit: z.number().nonnegative('Deposit tidak boleh negatif'),
  categoryId: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
