import { IsOptional, IsString, IsEnum, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../../common/dto/pagination.dto";

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

export class FilterVehicleDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({ enum: TransmissionType })
  @IsOptional()
  @IsEnum(TransmissionType)
  transmission?: TransmissionType;

  @ApiPropertyOptional({ enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType?: FuelType;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  minSeats?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
}
