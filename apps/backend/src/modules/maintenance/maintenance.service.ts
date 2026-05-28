import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateMaintenanceDto } from "./dto/create-maintenance.dto";
import { UpdateMaintenanceDto } from "./dto/update-maintenance.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = pagination;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      this.prisma.maintenanceLog.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: { vehicle: true },
      }),
      this.prisma.maintenanceLog.count(),
    ]);

    return {
      data: logs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const log = await this.prisma.maintenanceLog.findUnique({
      where: { id },
      include: { vehicle: true },
    });
    if (!log) {
      throw new NotFoundException("Maintenance log not found");
    }
    return log;
  }

  async findByVehicle(vehicleId: string) {
    return this.prisma.maintenanceLog.findMany({
      where: { vehicleId },
      orderBy: { performedAt: "desc" },
    });
  }

  async findUpcoming() {
    const now = new Date();
    return this.prisma.maintenanceLog.findMany({
      where: {
        nextMaintenanceAt: { gte: now },
      },
      include: { vehicle: true },
      orderBy: { nextMaintenanceAt: "asc" },
      take: 20,
    });
  }

  async create(dto: CreateMaintenanceDto) {
    return this.prisma.maintenanceLog.create({
      data: {
        vehicleId: dto.vehicleId,
        type: dto.type as any,
        description: dto.description,
        cost: dto.cost,
        performedBy: dto.performedBy,
        performedAt: new Date(dto.performedAt),
        nextMaintenanceAt: dto.nextMaintenanceAt
          ? new Date(dto.nextMaintenanceAt)
          : null,
      },
      include: { vehicle: true },
    });
  }

  async update(id: string, dto: UpdateMaintenanceDto) {
    await this.findOne(id);
    return this.prisma.maintenanceLog.update({
      where: { id },
      data: {
        ...dto,
        performedAt: dto.performedAt ? new Date(dto.performedAt) : undefined,
        nextMaintenanceAt: dto.nextMaintenanceAt
          ? new Date(dto.nextMaintenanceAt)
          : undefined,
      } as any,
      include: { vehicle: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.maintenanceLog.delete({ where: { id } });
    return { message: "Maintenance log deleted" };
  }
}
