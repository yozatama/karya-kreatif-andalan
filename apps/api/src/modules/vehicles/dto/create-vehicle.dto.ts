import { IsString, IsNumber, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty({ example: 'Toyota Avanza 2023' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Avanza' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2023 })
  @IsInt()
  year: number;

  @ApiProperty({ example: 'B 1234 ABC' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ example: 'Silver' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'AUTOMATIC' })
  @IsString()
  transmission: string;

  @ApiProperty({ example: 'GASOLINE' })
  @IsString()
  fuelType: string;

  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(1)
  seats: number;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  @Min(0)
  priceDaily: number;

  @ApiProperty({ example: 2200000 })
  @IsNumber()
  @Min(0)
  priceWeekly: number;

  @ApiProperty({ example: 8000000 })
  @IsNumber()
  @Min(0)
  priceMonthly: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  features?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
