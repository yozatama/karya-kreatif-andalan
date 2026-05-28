import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'vehicle-id' })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-01-22' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: 'Jl. Sudirman No. 1', required: false })
  @IsOptional()
  @IsString()
  pickupLocation?: string;

  @ApiProperty({ example: 'Need child seat', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
