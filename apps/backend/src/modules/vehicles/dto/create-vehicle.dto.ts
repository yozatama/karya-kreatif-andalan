import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum TransmissionType {
  MANUAL = "MANUAL",
  AUTOMATIC = "AUTOMATIC",
}

enum FuelType {
  PETROL = "PETROL",
  DIESEL = "DIESEL",
  ELECTRIC = "ELECTRIC",
  HYBRID = "HYBRID",
}

export class CreateVehicleDto {
  @ApiProperty()
  @IsString()
  categoryId!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  brand!: string;

  @ApiProperty()
  @IsString()
  model!: string;

  @ApiProperty()
  @IsInt()
  year!: number;

  @ApiProperty()
  @IsString()
  plateNumber!: string;

  @ApiProperty()
  @IsString()
  color!: string;

  @ApiProperty({ enum: TransmissionType })
  @IsEnum(TransmissionType)
  transmission!: TransmissionType;

  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType!: FuelType;

  @ApiProperty()
  @IsInt()
  seats!: number;

  @ApiProperty()
  @IsNumber()
  dailyRate!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weeklyRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  monthlyRate?: number;

  @ApiProperty()
  @IsNumber()
  depositAmount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
