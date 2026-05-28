import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsInt,
  IsDateString,
  IsBoolean,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export class CreatePromoDto {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: DiscountType })
  @IsEnum(DiscountType)
  discountType!: DiscountType;

  @ApiProperty()
  @IsNumber()
  discountValue!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  minRentalDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxDiscount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  usageLimit?: number;

  @ApiProperty()
  @IsDateString()
  validFrom!: string;

  @ApiProperty()
  @IsDateString()
  validUntil!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
