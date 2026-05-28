import { IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ExtendBookingDto {
  @ApiProperty({ example: '2024-02-15' })
  @IsDateString()
  newEndDate: string;
}
