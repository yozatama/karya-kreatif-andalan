import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMaintenanceDto) {
    return this.prisma.maintenanceLog.create({
      data: {
        vehicleId: dto.vehicleId,
        type: dto.type,
        description: dto.description,
        cost: dto.cost,
        performedBy: dto.performedBy,
        performedAt: new Date(dto.performedAt),
        nextServiceDate: dto.nextServiceDate ? new Date(dto.nextServiceDate) : undefined,
        notes: dto.notes,
      },
      include: { vehicle: { select: { id: true, name: true, licensePlate: true } } },
    });
  }

  async findAll(pagination: PaginationDto, vehicleId?: string, type?: string) {
    const { page = 1, limit = 10, sortBy = 'performedAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (vehicleId) where.vehicleId = vehicleId;
    if (type) where.type = type;

    const [logs, total] = await Promise.all([
      this.prisma.maintenanceLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { vehicle: { select: { id: true, name: true, licensePlate: true } } },
      }),
      this.prisma.maintenanceLog.count({ where }),
    ]);

    return new PaginatedResponseDto(logs, total, page, limit);
  }

  async findById(id: string) {
    const log = await this.prisma.maintenanceLog.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    if (!log) {
      throw new NotFoundException('Maintenance log not found');
    }
    return log;
  }

  async update(id: string, dto: UpdateMaintenanceDto) {
    const log = await this.prisma.maintenanceLog.findUnique({ where: { id } });
    if (!log) {
      throw new NotFoundException('Maintenance log not found');
    }

    const data: Record<string, unknown> = { ...dto };
    if (dto.performedAt) data.performedAt = new Date(dto.performedAt);
    if (dto.nextServiceDate) data.nextServiceDate = new Date(dto.nextServiceDate);

    return this.prisma.maintenanceLog.update({
      where: { id },
      data,
      include: { vehicle: { select: { id: true, name: true, licensePlate: true } } },
    });
  }

  async getUpcoming() {
    const now = new Date();
    return this.prisma.maintenanceLog.findMany({
      where: {
        nextServiceDate: { gte: now },
      },
      orderBy: { nextServiceDate: 'asc' },
      take: 20,
      include: { vehicle: { select: { id: true, name: true, licensePlate: true } } },
    });
  }
}
