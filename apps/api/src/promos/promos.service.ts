import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PromosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any) {
    return this.prisma.promo.create({
      data: {
        code: data.code,
        type: data.type,
        value: data.value,
        minRentalDays: data.minRentalDays,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isActive: data.isActive ?? true,
      },
    });
  }

  async update(id: string, data: any) {
    const promo = await this.prisma.promo.findUnique({ where: { id } });
    if (!promo) {
      throw new NotFoundException('Promo not found');
    }
    return this.prisma.promo.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
  }

  async validateCode(code: string, rentalDays: number) {
    const promo = await this.prisma.promo.findUnique({ where: { code } });
    if (!promo) {
      throw new NotFoundException('Promo code not found');
    }

    const now = new Date();
    if (!promo.isActive) {
      throw new BadRequestException('Promo code is inactive');
    }
    if (now < promo.startDate || now > promo.endDate) {
      throw new BadRequestException('Promo code has expired');
    }
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      throw new BadRequestException('Promo code usage limit reached');
    }
    if (promo.minRentalDays && rentalDays < promo.minRentalDays) {
      throw new BadRequestException(`Minimum rental of ${promo.minRentalDays} days required`);
    }

    return {
      valid: true,
      promo: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        maxDiscount: promo.maxDiscount,
      },
    };
  }

  async applyPromo(code: string, totalPrice: number) {
    const promo = await this.prisma.promo.findUnique({ where: { code } });
    if (!promo) {
      throw new NotFoundException('Promo code not found');
    }

    let discount: number;
    if (promo.type === 'PERCENTAGE') {
      discount = (totalPrice * promo.value) / 100;
      if (promo.maxDiscount && discount > promo.maxDiscount) {
        discount = promo.maxDiscount;
      }
    } else {
      discount = promo.value;
    }

    await this.prisma.promo.update({
      where: { id: promo.id },
      data: { usedCount: promo.usedCount + 1 },
    });

    return { discount, finalPrice: totalPrice - discount };
  }
}
