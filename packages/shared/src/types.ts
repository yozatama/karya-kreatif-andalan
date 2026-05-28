export interface User {
  id: string;
  email: string;
  phone: string | null;
  name: string;
  roleId: string;
  avatarUrl: string | null;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vehicle {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  plateNumber: string;
  color: string;
  transmission: "MANUAL" | "AUTOMATIC";
  fuelType: "PETROL" | "DIESEL" | "ELECTRIC" | "HYBRID";
  seats: number;
  status: VehicleStatus;
  dailyRate: number;
  weeklyRate: number | null;
  monthlyRate: number | null;
  depositAmount: number;
  images: string[] | null;
  description: string | null;
  isAvailable: boolean;
  mileage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  totalAmount: number;
  depositAmount: number;
  status: BookingStatus;
  pickupLocation: string | null;
  returnLocation: string | null;
  notes: string | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentChannel: string | null;
  externalId: string | null;
  status: PaymentStatus;
  paidAt: Date | null;
  expiredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type VehicleStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE" | "INACTIVE";
export type BookingStatus = "PENDING" | "APPROVED" | "ACTIVE" | "COMPLETED" | "CANCELLED" | "REJECTED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "EXPIRED" | "REFUNDED";
export type PaymentMethod = "BANK_TRANSFER" | "VIRTUAL_ACCOUNT" | "EWALLET" | "CREDIT_CARD" | "CASH";
export type InvoiceStatus = "DRAFT" | "ISSUED" | "PAID" | "OVERDUE" | "CANCELLED";
export type PenaltyType = "LATE_RETURN" | "DAMAGE" | "TRAFFIC_VIOLATION" | "FUEL_SHORTAGE" | "OTHER";
export type NotificationType = "BOOKING" | "PAYMENT" | "PROMO" | "SYSTEM" | "VERIFICATION";
