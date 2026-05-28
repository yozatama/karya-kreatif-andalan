import { BookingStatus } from './enums';

export interface Booking {
  id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  pickupLocation: string | null;
  status: BookingStatus;
  totalAmount: number;
  depositAmount: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
