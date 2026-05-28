import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingStatusDto {
  @ApiProperty({ example: 'Rejected due to incomplete documents', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
