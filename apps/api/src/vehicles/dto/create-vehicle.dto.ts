import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ example: 'Toyota Avanza' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: 'Avanza' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 2023 })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'CAR' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'B 1234 ABC' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ example: 'Silver' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ example: 'AUTOMATIC' })
  @IsString()
  @IsNotEmpty()
  transmission: string;

  @ApiProperty({ example: 'GASOLINE', required: false })
  @IsOptional()
  @IsString()
  fuelType?: string;

  @ApiProperty({ example: 7, required: false })
  @IsOptional()
  @IsNumber()
  seats?: number;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  pricePerDay: number;

  @ApiProperty({ example: 2100000, required: false })
  @IsOptional()
  @IsNumber()
  pricePerWeek?: number;

  @ApiProperty({ example: 7500000, required: false })
  @IsOptional()
  @IsNumber()
  pricePerMonth?: number;

  @ApiProperty({ example: 1000000 })
  @IsNumber()
  deposit: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiProperty({ example: 'category-id', required: false })
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
