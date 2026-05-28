import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';

@Injectable()
export class CheckpointService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateCheckpointDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only create checkpoints for your own bookings');
    }

    return this.prisma.vehicleCheckpoint.create({
      data: {
        bookingId: dto.bookingId,
        vehicleId: booking.vehicleId,
        type: dto.type,
        odometerReading: dto.odometerReading,
        fuelLevel: dto.fuelLevel,
        notes: dto.notes,
        condition: dto.condition,
      },
      include: { images: true },
    });
  }

  async findByBooking(bookingId: string, userId?: string, isAdmin?: boolean) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (!isAdmin && booking.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.vehicleCheckpoint.findMany({
      where: { bookingId },
      include: { images: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async addPhoto(checkpointId: string, imageUrl: string, label?: string) {
    const checkpoint = await this.prisma.vehicleCheckpoint.findUnique({
      where: { id: checkpointId },
    });
    if (!checkpoint) {
      throw new NotFoundException('Checkpoint not found');
    }

    return this.prisma.checkpointImage.create({
      data: {
        checkpointId,
        imageUrl,
        label,
      },
    });
  }
}
