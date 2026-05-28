import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginatedResponseDto, PaginationDto } from '../../common/dto/pagination.dto';
import { CreatePromoDto } from './dto/create-promo.dto';
import { ValidatePromoDto } from './dto/validate-promo.dto';

@Injectable()
export class PromosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePromoDto) {
    return this.prisma.promo.create({
      data: {
        code: dto.code.toUpperCase(),
        type: dto.type,
        value: dto.value,
        minRentalDays: dto.minRentalDays || 1,
        maxUses: dto.maxUses,
        validFrom: new Date(dto.validFrom),
        validUntil: new Date(dto.validUntil),
      },
    });
  }

  async findAll(pagination: PaginationDto, isPublic?: boolean) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const where = isPublic
      ? { isActive: true, validUntil: { gte: new Date() } }
      : {};

    const [promos, total] = await Promise.all([
      this.prisma.promo.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.promo.count({ where }),
    ]);

    return new PaginatedResponseDto(promos, total, page, limit);
  }

  async update(id: string, data: Partial<CreatePromoDto>) {
    const promo = await this.prisma.promo.findUnique({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }

    const updateData: Record<string, unknown> = { ...data };
    if (data.validFrom) updateData.validFrom = new Date(data.validFrom);
    if (data.validUntil) updateData.validUntil = new Date(data.validUntil);
    if (data.code) updateData.code = (data.code as string).toUpperCase();

    return this.prisma.promo.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    const promo = await this.prisma.promo.findUnique({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }
    await this.prisma.promo.update({
      where: { id },
      data: { isActive: false },
    });
    return { message: 'Promo deactivated successfully' };
  }

  async validate(dto: ValidatePromoDto) {
    const promo = await this.prisma.promo.findUnique({
      where: { code: dto.code.toUpperCase() },
    });
    if (!promo) {
      throw new NotFoundException('Promo code not found');
    }
    if (!promo.isActive) {
      throw new BadRequestException('Promo code is inactive');
    }

    const now = new Date();
    if (now < promo.validFrom || now > promo.validUntil) {
      throw new BadRequestException('Promo code is expired');
    }
    if (promo.maxUses && promo.usedCount >= promo.maxUses) {
      throw new BadRequestException('Promo code has reached maximum uses');
    }
    if (dto.bookingDays < promo.minRentalDays) {
      throw new BadRequestException(
        `Minimum rental of ${promo.minRentalDays} days required`,
      );
    }

    return {
      valid: true,
      promo: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
      },
    };
  }
}
