import { IsString, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty()
  @IsString()
  vehicleId: string;

  @ApiProperty({ example: 'ROUTINE_SERVICE', enum: ['ROUTINE_SERVICE', 'REPAIR', 'INSPECTION', 'TIRE_CHANGE', 'OIL_CHANGE'] })
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Min(0)
  cost: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  performedBy?: string;

  @ApiProperty()
  @IsDateString()
  performedAt: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  nextServiceDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
