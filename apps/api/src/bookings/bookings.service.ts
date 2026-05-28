import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

const VALID_TRANSITIONS: Record<string, string[]> = {
  PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
  APPROVED: ['ACTIVE', 'CANCELLED'],
  ACTIVE: ['RETURN_REQUESTED', 'COMPLETED'],
  RETURN_REQUESTED: ['COMPLETED'],
  COMPLETED: [],
  REJECTED: [],
  CANCELLED: [],
};

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    if (!vehicle.isAvailable) {
      throw new BadRequestException('Vehicle is not available');
    }

    const totalPrice = vehicle.pricePerDay * dto.duration;
    const depositAmount = vehicle.deposit;

    return this.prisma.booking.create({
      data: {
        userId,
        vehicleId: dto.vehicleId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        duration: dto.duration,
        totalPrice,
        depositAmount,
        pickupLocation: dto.pickupLocation,
        notes: dto.notes,
      },
      include: { vehicle: true, user: true },
    });
  }

  async findAll(userId?: string, role?: string) {
    const where: any = {};
    if (role === 'DRIVER') {
      where.userId = userId;
    }
    return this.prisma.booking.findMany({
      where,
      include: { vehicle: true, user: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: true,
        payments: true,
        vehicleCheckpoints: true,
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async findByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { vehicle: true, payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string) {
    return this.transitionStatus(id, 'APPROVED');
  }

  async reject(id: string, notes?: string) {
    const booking = await this.findById(id);
    this.validateTransition(booking.status, 'REJECTED');
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'REJECTED', notes: notes || booking.notes },
      include: { vehicle: true, user: true },
    });
  }

  async activate(id: string) {
    return this.transitionStatus(id, 'ACTIVE');
  }

  async requestReturn(id: string) {
    return this.transitionStatus(id, 'RETURN_REQUESTED');
  }

  async complete(id: string) {
    return this.transitionStatus(id, 'COMPLETED');
  }

  async addCheckpoint(bookingId: string, dto: CreateCheckpointDto) {
    await this.findById(bookingId);
    return this.prisma.vehicleCheckpoint.create({
      data: {
        bookingId,
        type: dto.type,
        photos: dto.photos || '[]',
        checklist: dto.checklist || '{}',
        odometerReading: dto.odometerReading,
        notes: dto.notes,
        signature: dto.signature,
      },
    });
  }

  private async transitionStatus(id: string, newStatus: string) {
    const booking = await this.findById(id);
    this.validateTransition(booking.status, newStatus);
    return this.prisma.booking.update({
      where: { id },
      data: { status: newStatus },
      include: { vehicle: true, user: true },
    });
  }

  private validateTransition(currentStatus: string, newStatus: string) {
    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new BadRequestException(
        `Cannot transition from ${currentStatus} to ${newStatus}`,
      );
    }
  }
}
