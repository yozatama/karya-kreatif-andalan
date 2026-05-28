export const UserStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  BANNED: 'BANNED',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const VehicleStatus = {
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED',
  MAINTENANCE: 'MAINTENANCE',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;
export type VehicleStatus = (typeof VehicleStatus)[keyof typeof VehicleStatus];

export const BookingStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  OVERDUE: 'OVERDUE',
} as const;
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const PaymentStatus = {
  PENDING: 'PENDING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  EXPIRED: 'EXPIRED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentMethod = {
  BANK_TRANSFER: 'BANK_TRANSFER',
  EWALLET: 'EWALLET',
  CREDIT_CARD: 'CREDIT_CARD',
  CASH: 'CASH',
} as const;
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export const DocumentType = {
  KTP: 'KTP',
  SIM: 'SIM',
  STNK: 'STNK',
  INSURANCE: 'INSURANCE',
  OTHER: 'OTHER',
} as const;
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const VerificationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type VerificationStatus = (typeof VerificationStatus)[keyof typeof VerificationStatus];

export const TicketStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
} as const;
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TicketPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const;
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export const PromoType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  FREE_DAY: 'FREE_DAY',
} as const;
export type PromoType = (typeof PromoType)[keyof typeof PromoType];

export const NotificationType = {
  BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
  PAYMENT_RECEIVED: 'PAYMENT_RECEIVED',
  BOOKING_REMINDER: 'BOOKING_REMINDER',
  PROMO: 'PROMO',
  SYSTEM: 'SYSTEM',
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const MaintenanceType = {
  ROUTINE_SERVICE: 'ROUTINE_SERVICE',
  REPAIR: 'REPAIR',
  INSPECTION: 'INSPECTION',
  TIRE_CHANGE: 'TIRE_CHANGE',
  OIL_CHANGE: 'OIL_CHANGE',
} as const;
export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const VehicleTransmission = {
  MANUAL: 'MANUAL',
  AUTOMATIC: 'AUTOMATIC',
} as const;
export type VehicleTransmission = (typeof VehicleTransmission)[keyof typeof VehicleTransmission];

export const FuelType = {
  GASOLINE: 'GASOLINE',
  DIESEL: 'DIESEL',
  ELECTRIC: 'ELECTRIC',
  HYBRID: 'HYBRID',
} as const;
export type FuelType = (typeof FuelType)[keyof typeof FuelType];
