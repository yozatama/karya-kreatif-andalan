import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: VehicleFilterDto) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filter.type) where.type = filter.type;
    if (filter.categoryId) where.categoryId = filter.categoryId;
    if (filter.brand) where.brand = filter.brand;
    if (filter.available === 'true') where.isAvailable = true;
    if (filter.available === 'false') where.isAvailable = false;
    if (filter.minPrice || filter.maxPrice) {
      where.pricePerDay = {};
      if (filter.minPrice) where.pricePerDay.gte = filter.minPrice;
      if (filter.maxPrice) where.pricePerDay.lte = filter.maxPrice;
    }

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        include: { category: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      data: vehicles,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async create(dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: dto,
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findById(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
      include: { category: true },
    });
  }

  async remove(id: string) {
    await this.findById(id);
    return this.prisma.vehicle.delete({ where: { id } });
  }

  async getCategories() {
    return this.prisma.vehicleCategory.findMany({
      include: { _count: { select: { vehicles: true } } },
    });
  }

  async createCategory(name: string, description?: string, icon?: string) {
    return this.prisma.vehicleCategory.create({
      data: { name, description, icon },
    });
  }

  async checkAvailability(vehicleId: string, startDate: Date, endDate: Date) {
    const vehicle = await this.findById(vehicleId);
    if (!vehicle.isAvailable) {
      return { available: false, reason: 'Vehicle is not available' };
    }

    const conflicting = await this.prisma.booking.findFirst({
      where: {
        vehicleId,
        status: { in: ['APPROVED', 'ACTIVE'] },
        OR: [
          { startDate: { lte: endDate }, endDate: { gte: startDate } },
        ],
      },
    });

    return {
      available: !conflicting,
      reason: conflicting ? 'Vehicle is booked for the selected dates' : null,
    };
  }
}
