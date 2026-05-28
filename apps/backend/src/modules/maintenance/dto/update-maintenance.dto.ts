import { IsString, IsNumber, IsEnum, IsOptional, IsDateString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

enum MaintenanceType {
  ROUTINE = "ROUTINE",
  REPAIR = "REPAIR",
  INSPECTION = "INSPECTION",
  EMERGENCY = "EMERGENCY",
}

export class UpdateMaintenanceDto {
  @ApiPropertyOptional({ enum: MaintenanceType })
  @IsOptional()
  @IsEnum(MaintenanceType)
  type?: MaintenanceType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  performedBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  performedAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextMaintenanceAt?: string;
}
