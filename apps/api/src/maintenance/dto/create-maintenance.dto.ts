import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'vehicle-id' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: 'OIL_CHANGE' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 'Routine oil change and filter replacement', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 500000, required: false })
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty({ example: '2024-02-01', required: false })
  @IsOptional()
  @IsDateString()
  performedAt?: string;

  @ApiProperty({ example: '2024-05-01', required: false })
  @IsOptional()
  @IsDateString()
  nextScheduledAt?: string;

  @ApiProperty({ example: 'SCHEDULED', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}
