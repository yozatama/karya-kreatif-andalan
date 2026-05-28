export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export type RoleEnum = (typeof ROLES)[keyof typeof ROLES];

export const BOOKING_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
} as const;

export type BookingStatusEnum = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  FAILED: "FAILED",
  EXPIRED: "EXPIRED",
  REFUNDED: "REFUNDED",
} as const;

export type PaymentStatusEnum = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const VEHICLE_STATUS = {
  AVAILABLE: "AVAILABLE",
  RENTED: "RENTED",
  MAINTENANCE: "MAINTENANCE",
  INACTIVE: "INACTIVE",
} as const;

export type VehicleStatusEnum = (typeof VEHICLE_STATUS)[keyof typeof VEHICLE_STATUS];

export const PAYMENT_METHOD = {
  BANK_TRANSFER: "BANK_TRANSFER",
  VIRTUAL_ACCOUNT: "VIRTUAL_ACCOUNT",
  EWALLET: "EWALLET",
  CREDIT_CARD: "CREDIT_CARD",
  CASH: "CASH",
} as const;

export type PaymentMethodEnum = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const INVOICE_STATUS = {
  DRAFT: "DRAFT",
  ISSUED: "ISSUED",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
} as const;

export type InvoiceStatusEnum = (typeof INVOICE_STATUS)[keyof typeof INVOICE_STATUS];

export const DOCUMENT_TYPE = {
  KTP: "KTP",
  SIM: "SIM",
  SELFIE: "SELFIE",
} as const;

export type DocumentTypeEnum = (typeof DOCUMENT_TYPE)[keyof typeof DOCUMENT_TYPE];

export const VERIFICATION_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

export type VerificationStatusEnum = (typeof VERIFICATION_STATUS)[keyof typeof VERIFICATION_STATUS];
