import { z } from 'zod';

export const createBookingSchema = z.object({
  vehicleId: z.string().uuid(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  pickupLocation: z.string().optional(),
  notes: z.string().optional(),
  promoCode: z.string().optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'OVERDUE']),
  notes: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
