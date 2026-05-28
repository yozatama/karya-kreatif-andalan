import { z } from 'zod';

export const createPaymentSchema = z.object({
  bookingId: z.string().uuid(),
  amount: z.number().positive('Jumlah pembayaran harus positif'),
  method: z.enum(['BANK_TRANSFER', 'EWALLET', 'CREDIT_CARD', 'CASH']),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
