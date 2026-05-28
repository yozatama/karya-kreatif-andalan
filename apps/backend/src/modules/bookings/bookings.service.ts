import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { CreateCheckpointDto } from "./dto/create-checkpoint.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string | null, pagination: PaginationDto) {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (userId) where.userId = userId;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: { vehicle: true, user: { select: { id: true, name: true, email: true } } },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string, requestingUser?: { id: string; role?: { name: string } }) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: { select: { id: true, name: true, email: true } },
        payments: true,
        checkpoints: true,
      },
    });
    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (requestingUser) {
      this.verifyOwnership(booking, requestingUser);
    }

    return booking;
  }

  async create(userId: string, dto: CreateBookingDto) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: dto.vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }

    if (!vehicle.isAvailable || vehicle.status !== "AVAILABLE") {
      throw new BadRequestException("Vehicle is not available");
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    if (endDate <= startDate) {
      throw new BadRequestException("End date must be after start date");
    }

    // Check for overlapping bookings on the same vehicle
    const overlapping = await this.prisma.booking.findFirst({
      where: {
        vehicleId: dto.vehicleId,
        status: { in: ["PENDING", "APPROVED", "ACTIVE"] },
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
    });

    if (overlapping) {
      throw new BadRequestException(
        "Vehicle already has a booking for the requested dates",
      );
    }

    const durationDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    const totalAmount = Number(vehicle.dailyRate) * durationDays;
    const depositAmount = Number(vehicle.depositAmount);

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        vehicleId: dto.vehicleId,
        startDate,
        endDate,
        durationDays,
        totalAmount,
        depositAmount,
        pickupLocation: dto.pickupLocation,
        returnLocation: dto.returnLocation,
        notes: dto.notes,
        status: "PENDING",
      },
      include: { vehicle: true },
    });

    return booking;
  }

  async approve(id: string, approverId: string) {
    const booking = await this.findOne(id);
    if (booking.status !== "PENDING") {
      throw new BadRequestException("Booking can only be approved from PENDING status");
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: "APPROVED",
        approvedBy: approverId,
        approvedAt: new Date(),
      },
      include: { vehicle: true },
    });
  }

  async reject(id: string, approverId: string, reason?: string) {
    const booking = await this.findOne(id);
    if (booking.status !== "PENDING") {
      throw new BadRequestException("Booking can only be rejected from PENDING status");
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: "REJECTED",
        approvedBy: approverId,
        notes: reason || booking.notes,
      },
      include: { vehicle: true },
    });
  }

  async returnVehicle(id: string, requestingUser: { id: string; role?: { name: string } }) {
    const booking = await this.findOne(id);

    this.verifyOwnership(booking, requestingUser);

    if (booking.status !== "ACTIVE") {
      throw new BadRequestException("Only active bookings can be returned");
    }

    await this.prisma.vehicle.update({
      where: { id: booking.vehicleId },
      data: { status: "AVAILABLE" },
    });

    return this.prisma.booking.update({
      where: { id },
      data: { status: "COMPLETED" },
      include: { vehicle: true },
    });
  }

  async createCheckpoint(
    bookingId: string,
    userId: string,
    dto: CreateCheckpointDto,
    requestingUser: { id: string; role?: { name: string } },
  ) {
    const booking = await this.findOne(bookingId);

    this.verifyOwnership(booking, requestingUser);

    return this.prisma.vehicleCheckpoint.create({
      data: {
        bookingId,
        userId,
        ...dto,
      },
    });
  }

  private verifyOwnership(
    booking: { userId: string },
    user: { id: string; role?: { name: string } },
  ): void {
    const isAdmin =
      user.role?.name === "ADMIN" || user.role?.name === "SUPER_ADMIN";
    if (!isAdmin && booking.userId !== user.id) {
      throw new ForbiddenException("You do not have access to this booking");
    }
  }
}
