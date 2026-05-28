import { PaymentStatus, PaymentMethod } from './enums';

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  xenditInvoiceId: string | null;
  xenditPaymentUrl: string | null;
  paidAt: Date | null;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  paymentId: string;
  bookingId: string;
  invoiceNumber: string;
  amount: number;
  dueDate: Date;
  paidAt: Date | null;
  createdAt: Date;
}
