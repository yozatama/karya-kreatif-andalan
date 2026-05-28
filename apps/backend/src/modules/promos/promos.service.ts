import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePromoDto } from "./dto/create-promo.dto";
import { ValidatePromoDto } from "./dto/validate-promo.dto";

@Injectable()
export class PromosService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.promo.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findOne(id: string) {
    const promo = await this.prisma.promo.findUnique({ where: { id } });
    if (!promo) {
      throw new NotFoundException("Promo not found");
    }
    return promo;
  }

  async create(dto: CreatePromoDto) {
    return this.prisma.promo.create({
      data: {
        code: dto.code,
        name: dto.name,
        description: dto.description,
        discountType: dto.discountType as any,
        discountValue: dto.discountValue,
        minRentalDays: dto.minRentalDays,
        maxDiscount: dto.maxDiscount,
        usageLimit: dto.usageLimit,
        validFrom: new Date(dto.validFrom),
        validUntil: new Date(dto.validUntil),
        isActive: dto.isActive ?? true,
      },
    });
  }

  async update(id: string, dto: Partial<CreatePromoDto>) {
    await this.findOne(id);
    return this.prisma.promo.update({
      where: { id },
      data: {
        ...dto,
        validFrom: dto.validFrom ? new Date(dto.validFrom) : undefined,
        validUntil: dto.validUntil ? new Date(dto.validUntil) : undefined,
      } as any,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.promo.delete({ where: { id } });
    return { message: "Promo deleted" };
  }

  async validate(dto: ValidatePromoDto) {
    const promo = await this.prisma.promo.findUnique({
      where: { code: dto.code },
    });

    if (!promo) {
      throw new NotFoundException("Promo code not found");
    }

    const now = new Date();
    if (!promo.isActive) {
      throw new BadRequestException("Promo is not active");
    }
    if (now < promo.validFrom || now > promo.validUntil) {
      throw new BadRequestException("Promo is expired or not yet valid");
    }
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      throw new BadRequestException("Promo usage limit reached");
    }
    if (promo.minRentalDays && dto.rentalDays < promo.minRentalDays) {
      throw new BadRequestException(
        `Minimum rental days for this promo: ${promo.minRentalDays}`,
      );
    }

    return {
      valid: true,
      discountType: promo.discountType,
      discountValue: Number(promo.discountValue),
      maxDiscount: promo.maxDiscount ? Number(promo.maxDiscount) : null,
    };
  }
}
