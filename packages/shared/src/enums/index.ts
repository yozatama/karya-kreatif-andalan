export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  DRIVER = 'DRIVER',
}

export enum Platform {
  GOJEK = 'GOJEK',
  GRAB = 'GRAB',
  MAXIM = 'MAXIM',
  INDRIVE = 'INDRIVE',
  OTHER = 'OTHER',
}

export enum VehicleType {
  CAR = 'CAR',
  ELECTRIC_MOTORCYCLE = 'ELECTRIC_MOTORCYCLE',
}

export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum BookingStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
}

export enum PaymentMethod {
  VIRTUAL_ACCOUNT = 'VIRTUAL_ACCOUNT',
  EWALLET = 'EWALLET',
  QRIS = 'QRIS',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum InvoiceStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
}

export enum PenaltyType {
  DAMAGE = 'DAMAGE',
  LATE_RETURN = 'LATE_RETURN',
  VIOLATION = 'VIOLATION',
}

export enum PenaltyStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  DISPUTED = 'DISPUTED',
}

export enum MaintenanceType {
  ROUTINE = 'ROUTINE',
  REPAIR = 'REPAIR',
  INSPECTION = 'INSPECTION',
}

export enum MaintenanceStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum CheckpointType {
  PICKUP = 'PICKUP',
  RETURN = 'RETURN',
}

export enum DocumentType {
  KTP = 'KTP',
  SIM = 'SIM',
  SELFIE = 'SELFIE',
  OTHER = 'OTHER',
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum VerificationStatus {
  PENDING = 'PENDING',
  IN_REVIEW = 'IN_REVIEW',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum PromoType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export enum NotificationType {
  BOOKING = 'BOOKING',
  PAYMENT = 'PAYMENT',
  MAINTENANCE = 'MAINTENANCE',
  SYSTEM = 'SYSTEM',
  PROMO = 'PROMO',
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}
