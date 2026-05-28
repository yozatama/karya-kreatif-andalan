import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResponseDto } from '../../common/dto/pagination.dto';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleFilterDto } from './dto/vehicle-filter.dto';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: VehicleFilterDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      categoryId,
      minPrice,
      maxPrice,
      transmission,
      status,
      search,
    } = filter;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (categoryId) where.categoryId = categoryId;
    if (transmission) where.transmission = transmission;
    if (status) where.status = status;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.priceDaily = {};
      if (minPrice !== undefined) (where.priceDaily as Record<string, number>).gte = minPrice;
      if (maxPrice !== undefined) (where.priceDaily as Record<string, number>).lte = maxPrice;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
      ];
    }

    const [vehicles, total] = await Promise.all([
      this.prisma.vehicle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { category: true, images: true },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return new PaginatedResponseDto(vehicles, total, page, limit);
  }

  async findById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { category: true, images: { orderBy: { order: 'asc' } } },
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
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return this.prisma.vehicle.update({
      where: { id },
      data: dto,
      include: { category: true, images: true },
    });
  }

  async delete(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    await this.prisma.vehicle.update({
      where: { id },
      data: { status: 'UNAVAILABLE' },
    });
    return { message: 'Vehicle removed successfully' };
  }

  async uploadImage(vehicleId: string, imageUrl: string, order: number = 0) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return this.prisma.vehicleImage.create({
      data: { vehicleId, imageUrl, order },
    });
  }
}
