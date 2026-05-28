import { IsOptional, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  year?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transmission?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  seats?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pricePerDay?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pricePerWeek?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  pricePerMonth?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  deposit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  images?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  specs?: string;
}
