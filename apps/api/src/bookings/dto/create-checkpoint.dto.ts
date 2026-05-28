import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckpointDto {
  @ApiProperty({ example: 'PICKUP' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: '["photo1.jpg","photo2.jpg"]', required: false })
  @IsOptional()
  @IsString()
  photos?: string;

  @ApiProperty({ example: '{"tires":"good","engine":"good"}', required: false })
  @IsOptional()
  @IsString()
  checklist?: string;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  odometerReading?: number;

  @ApiProperty({ example: 'Minor scratch on left door', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  signature?: string;
}
