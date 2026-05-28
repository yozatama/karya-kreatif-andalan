import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const createBookingSchema = z.object({
  vehicleId: z.string().uuid("Invalid vehicle ID"),
  startDate: z.string().datetime("Invalid start date"),
  endDate: z.string().datetime("Invalid end date"),
  pickupLocation: z.string().optional(),
  returnLocation: z.string().optional(),
  notes: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const createPaymentSchema = z.object({
  bookingId: z.string().uuid("Invalid booking ID"),
  paymentMethod: z.enum(["BANK_TRANSFER", "VIRTUAL_ACCOUNT", "EWALLET", "CREDIT_CARD", "CASH"]),
  paymentChannel: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  avatarUrl: z.string().url("Invalid URL").optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
