import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ExtendBookingDto } from './dto/extend-booking.dto';
import dayjs from 'dayjs';

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
    if (vehicle.status !== 'AVAILABLE') {
      throw new BadRequestException('Vehicle is not available');
    }

    // Check availability
    const isAvailable = await this.checkAvailability(
      dto.vehicleId,
      dto.startDate,
      dto.endDate,
    );
    if (!isAvailable) {
      throw new BadRequestException('Vehicle is not available for the selected dates');
    }

    // Calculate total
    const start = dayjs(dto.startDate);
    const end = dayjs(dto.endDate);
    const days = end.diff(start, 'day');
    if (days <= 0) {
      throw new BadRequestException('End date must be after start date');
    }

    let totalAmount: number;
    if (days >= 30) {
      totalAmount = Math.ceil(days / 30) * vehicle.priceMonthly;
    } else if (days >= 7) {
      totalAmount = Math.ceil(days / 7) * vehicle.priceWeekly;
    } else {
      totalAmount = days * vehicle.priceDaily;
    }

    const depositAmount = vehicle.priceDaily * 2;

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        vehicleId: dto.vehicleId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        pickupLocation: dto.pickupLocation,
        notes: dto.notes,
        totalAmount,
        depositAmount,
        status: 'PENDING',
      },
      include: { vehicle: true },
    });

    return booking;
  }

  async findAll(
    pagination: PaginationDto,
    userId?: string,
    status?: string,
    isAdmin?: boolean,
  ) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (!isAdmin && userId) {
      where.userId = userId;
    }
    if (status) {
      where.status = status;
    }

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { vehicle: true, user: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return new PaginatedResponseDto(bookings, total, page, limit);
  }

  async findById(id: string, userId?: string, isAdmin?: boolean) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        vehicle: { include: { images: true } },
        user: { select: { id: true, name: true, email: true, phone: true } },
        payments: true,
      },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (!isAdmin && booking.userId !== userId) {
      throw new ForbiddenException('You can only view your own bookings');
    }
    return booking;
  }

  async updateStatus(id: string, dto: UpdateBookingStatusDto) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const validTransitions: Record<string, string[]> = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['ACTIVE', 'CANCELLED'],
      ACTIVE: ['COMPLETED', 'OVERDUE'],
      OVERDUE: ['COMPLETED'],
    };

    const allowed = validTransitions[booking.status] || [];
    if (!allowed.includes(dto.status)) {
      throw new BadRequestException(
        `Cannot transition from ${booking.status} to ${dto.status}`,
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: dto.status },
      include: { vehicle: true },
    });

    // Update vehicle status
    if (dto.status === 'ACTIVE') {
      await this.prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { status: 'RENTED' },
      });
    } else if (dto.status === 'COMPLETED' || dto.status === 'CANCELLED') {
      await this.prisma.vehicle.update({
        where: { id: booking.vehicleId },
        data: { status: 'AVAILABLE' },
      });
    }

    return updated;
  }

  async extend(id: string, userId: string, dto: ExtendBookingDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only extend your own bookings');
    }
    if (!['ACTIVE', 'CONFIRMED'].includes(booking.status)) {
      throw new BadRequestException('Can only extend active or confirmed bookings');
    }

    const newEnd = dayjs(dto.newEndDate);
    const currentEnd = dayjs(booking.endDate);
    if (newEnd.isBefore(currentEnd) || newEnd.isSame(currentEnd)) {
      throw new BadRequestException('New end date must be after current end date');
    }

    const additionalDays = newEnd.diff(currentEnd, 'day');
    const additionalCost = additionalDays * booking.vehicle.priceDaily;

    return this.prisma.booking.update({
      where: { id },
      data: {
        endDate: new Date(dto.newEndDate),
        totalAmount: booking.totalAmount + additionalCost,
      },
      include: { vehicle: true },
    });
  }

  async requestReturn(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id } });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only request return for your own bookings');
    }
    if (booking.status !== 'ACTIVE') {
      throw new BadRequestException('Can only request return for active bookings');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { notes: `${booking.notes || ''}\n[RETURN_REQUESTED at ${new Date().toISOString()}]` },
      include: { vehicle: true },
    });
  }

  async checkAvailability(vehicleId: string, startDate: string, endDate: string) {
    const overlapping = await this.prisma.booking.count({
      where: {
        vehicleId,
        status: { in: ['PENDING', 'CONFIRMED', 'ACTIVE'] },
        AND: [
          { startDate: { lte: new Date(endDate) } },
          { endDate: { gte: new Date(startDate) } },
        ],
      },
    });
    return overlapping === 0;
  }
}
