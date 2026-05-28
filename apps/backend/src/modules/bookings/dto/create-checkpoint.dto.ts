import { IsString, IsEnum, IsOptional, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum CheckpointType {
  PICKUP = "PICKUP",
  RETURN = "RETURN",
}

export class CreateCheckpointDto {
  @ApiProperty({ enum: CheckpointType })
  @IsEnum(CheckpointType)
  type!: CheckpointType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  frontPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  backPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  leftPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  rightPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  interiorPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  odometerPhoto?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  odometerValue?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  fuelLevel?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
