import {
  IsString,
  IsInt,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
} from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  RENTED = "RENTED",
  MAINTENANCE = "MAINTENANCE",
  INACTIVE = "INACTIVE",
}

export class UpdateVehicleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  year?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  dailyRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  weeklyRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  monthlyRate?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: VehicleStatus })
  @IsOptional()
  @IsEnum(VehicleStatus)
  status?: VehicleStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
