import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { FilterVehicleDto } from "./dto/filter-vehicle.dto";

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter: FilterVehicleDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      categoryId,
      brand,
      transmission,
      fuelType,
      minSeats,
      search,
    } = filter;
    const skip = (page - 1) * limit;

    const where: any = { isAvailable: true };
    if (categoryId) where.categoryId = categoryId;
    if (brand) where.brand = brand;
    if (transmission) where.transmission = transmission;
    if (fuelType) where.fuelType = fuelType;
    if (minSeats) where.seats = { gte: minSeats };
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
        orderBy: { [sortBy]: order },
        include: { category: true },
      }),
      this.prisma.vehicle.count({ where }),
    ]);

    return {
      data: vehicles,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!vehicle) {
      throw new NotFoundException("Vehicle not found");
    }
    return vehicle;
  }

  async create(dto: CreateVehicleDto) {
    return this.prisma.vehicle.create({
      data: dto as any,
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findOne(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: dto as any,
      include: { category: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.vehicle.update({
      where: { id },
      data: { isAvailable: false, status: "INACTIVE" },
    });
    return { message: "Vehicle deactivated" };
  }

  async getCategories() {
    return this.prisma.vehicleCategory.findMany();
  }
}
