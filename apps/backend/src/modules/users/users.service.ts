import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = pagination;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: { role: true },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        phone: u.phone,
        role: u.role.name,
        isVerified: u.isVerified,
        isActive: u.isActive,
        createdAt: u.createdAt,
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role.name,
      isVerified: user.isVerified,
      isActive: user.isActive,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: dto,
      include: { role: true },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role.name,
      isVerified: user.isVerified,
      isActive: user.isActive,
    };
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
    return { message: "User deactivated" };
  }

  async verify(id: string) {
    await this.findOne(id);
    const user = await this.prisma.user.update({
      where: { id },
      data: { isVerified: true },
    });
    return { id: user.id, isVerified: user.isVerified };
  }
}
