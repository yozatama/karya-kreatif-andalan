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
      data: {
        categoryId: dto.categoryId,
        name: dto.name,
        brand: dto.brand,
        model: dto.model,
        year: dto.year,
        plateNumber: dto.plateNumber,
        color: dto.color,
        transmission: dto.transmission,
        fuelType: dto.fuelType,
        seats: dto.seats,
        dailyRate: dto.dailyRate,
        weeklyRate: dto.weeklyRate,
        monthlyRate: dto.monthlyRate,
        depositAmount: dto.depositAmount,
        images: dto.images,
        description: dto.description,
      },
      include: { category: true },
    });
  }

  async update(id: string, dto: UpdateVehicleDto) {
    await this.findOne(id);
    return this.prisma.vehicle.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.brand !== undefined && { brand: dto.brand }),
        ...(dto.model !== undefined && { model: dto.model }),
        ...(dto.year !== undefined && { year: dto.year }),
        ...(dto.color !== undefined && { color: dto.color }),
        ...(dto.dailyRate !== undefined && { dailyRate: dto.dailyRate }),
        ...(dto.weeklyRate !== undefined && { weeklyRate: dto.weeklyRate }),
        ...(dto.monthlyRate !== undefined && { monthlyRate: dto.monthlyRate }),
        ...(dto.depositAmount !== undefined && { depositAmount: dto.depositAmount }),
        ...(dto.images !== undefined && { images: dto.images }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.isAvailable !== undefined && { isAvailable: dto.isAvailable }),
      },
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
