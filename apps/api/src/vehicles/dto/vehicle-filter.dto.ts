import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class VehicleFilterDto {
  @ApiProperty({ required: false, example: 'CAR' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false, example: 'category-id' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false, example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiProperty({ required: false, example: 500000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiProperty({ required: false, example: 'true' })
  @IsOptional()
  @IsString()
  available?: string;

  @ApiProperty({ required: false, example: 'Toyota' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
