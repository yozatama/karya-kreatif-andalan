import { IsString, IsNumber, IsEnum, IsOptional, IsDateString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum MaintenanceType {
  ROUTINE = "ROUTINE",
  REPAIR = "REPAIR",
  INSPECTION = "INSPECTION",
  EMERGENCY = "EMERGENCY",
}

export class CreateMaintenanceDto {
  @ApiProperty()
  @IsString()
  vehicleId!: string;

  @ApiProperty({ enum: MaintenanceType })
  @IsEnum(MaintenanceType)
  type!: MaintenanceType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  cost!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  performedBy?: string;

  @ApiProperty()
  @IsDateString()
  performedAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextMaintenanceAt?: string;
}
