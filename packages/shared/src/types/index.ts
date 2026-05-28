import {
  BookingStatus,
  DocumentStatus,
  DocumentType,
  InvoiceStatus,
  MaintenanceStatus,
  MaintenanceType,
  NotificationType,
  PaymentMethod,
  PaymentStatus,
  PenaltyStatus,
  PenaltyType,
  Platform,
  PromoType,
  TicketPriority,
  TicketStatus,
  Transmission,
  VerificationStatus,
  VehicleType,
} from '../enums';

export interface IUser {
  id: string;
  email: string;
  phone?: string | null;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string | null;
  isVerified: boolean;
  isActive: boolean;
  platform: Platform;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRole {
  id: string;
  name: string;
  description?: string | null;
}

export interface IVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  type: VehicleType;
  licensePlate: string;
  color: string;
  transmission: Transmission;
  fuelType?: string | null;
  seats?: number | null;
  pricePerDay: number;
  pricePerWeek?: number | null;
  pricePerMonth?: number | null;
  deposit: number;
  isAvailable: boolean;
  images: string[];
  specs: Record<string, unknown>;
  categoryId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVehicleCategory {
  id: string;
  name: string;
  description?: string | null;
  icon?: string | null;
}

export interface IBooking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  totalPrice: number;
  depositAmount: number;
  status: BookingStatus;
  pickupLocation?: string | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  id: string;
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  xenditId?: string | null;
  paidAt?: Date | null;
  createdAt: Date;
}

export interface IInvoice {
  id: string;
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: Date;
  status: InvoiceStatus;
  pdfUrl?: string | null;
  createdAt: Date;
}

export interface IPenalty {
  id: string;
  bookingId: string;
  type: PenaltyType;
  amount: number;
  description?: string | null;
  photos: string[];
  status: PenaltyStatus;
  createdAt: Date;
}

export interface IMaintenanceLog {
  id: string;
  vehicleId: string;
  type: MaintenanceType;
  description?: string | null;
  cost?: number | null;
  performedAt?: Date | null;
  nextScheduledAt?: Date | null;
  status: MaintenanceStatus;
  createdAt: Date;
}

export interface IVehicleCheckpoint {
  id: string;
  bookingId: string;
  type: string;
  photos: string[];
  checklist: Record<string, unknown>;
  odometerReading?: number | null;
  notes?: string | null;
  signature?: string | null;
  createdAt: Date;
}

export interface IDocument {
  id: string;
  userId: string;
  type: DocumentType;
  fileUrl: string;
  status: DocumentStatus;
  rejectionReason?: string | null;
  verifiedAt?: Date | null;
  createdAt: Date;
}

export interface IDriverVerification {
  id: string;
  userId: string;
  status: VerificationStatus;
  ktpDocumentId?: string | null;
  simDocumentId?: string | null;
  selfieDocumentId?: string | null;
  verifiedAt?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPromo {
  id: string;
  code: string;
  type: PromoType;
  value: number;
  minRentalDays?: number | null;
  maxDiscount?: number | null;
  usageLimit?: number | null;
  usedCount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data: Record<string, unknown>;
  createdAt: Date;
}

export interface ISupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  messages: unknown[];
  createdAt: Date;
  updatedAt: Date;
}
