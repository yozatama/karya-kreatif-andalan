import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.maintenanceLog.findMany({
      include: { vehicle: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateMaintenanceDto) {
    return this.prisma.maintenanceLog.create({
      data: {
        vehicleId: dto.vehicleId,
        type: dto.type,
        description: dto.description,
        cost: dto.cost,
        performedAt: dto.performedAt ? new Date(dto.performedAt) : null,
        nextScheduledAt: dto.nextScheduledAt ? new Date(dto.nextScheduledAt) : null,
        status: dto.status || 'SCHEDULED',
      },
      include: { vehicle: true },
    });
  }

  async update(id: string, data: Partial<CreateMaintenanceDto>) {
    const log = await this.prisma.maintenanceLog.findUnique({ where: { id } });
    if (!log) {
      throw new NotFoundException('Maintenance log not found');
    }
    return this.prisma.maintenanceLog.update({
      where: { id },
      data: {
        ...data,
        performedAt: data.performedAt ? new Date(data.performedAt) : undefined,
        nextScheduledAt: data.nextScheduledAt ? new Date(data.nextScheduledAt) : undefined,
      },
      include: { vehicle: true },
    });
  }

  async findByVehicle(vehicleId: string) {
    return this.prisma.maintenanceLog.findMany({
      where: { vehicleId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getUpcoming() {
    const now = new Date();
    const thirtyDaysLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return this.prisma.maintenanceLog.findMany({
      where: {
        status: 'SCHEDULED',
        nextScheduledAt: {
          gte: now,
          lte: thirtyDaysLater,
        },
      },
      include: { vehicle: true },
      orderBy: { nextScheduledAt: 'asc' },
    });
  }
}
