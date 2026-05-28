import { IsString, IsOptional, IsInt, IsIn, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCheckpointDto {
  @ApiProperty()
  @IsString()
  bookingId: string;

  @ApiProperty({ example: 'PICKUP', enum: ['PICKUP', 'RETURN'] })
  @IsString()
  @IsIn(['PICKUP', 'RETURN'])
  type: string;

  @ApiPropertyOptional({ example: 25000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  odometerReading?: number;

  @ApiPropertyOptional({ example: 80 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  fuelLevel?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  condition?: string;
}
