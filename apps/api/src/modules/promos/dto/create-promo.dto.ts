import { IsString, IsNumber, IsOptional, IsInt, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty({ example: 'DISKON20' })
  @IsString()
  code: string;

  @ApiProperty({ example: 'PERCENTAGE', enum: ['PERCENTAGE', 'FIXED_AMOUNT', 'FREE_DAY'] })
  @IsString()
  type: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  value: number;

  @ApiPropertyOptional({ example: 3, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  minRentalDays?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  maxUses?: number;

  @ApiProperty()
  @IsDateString()
  validFrom: string;

  @ApiProperty()
  @IsDateString()
  validUntil: string;
}
