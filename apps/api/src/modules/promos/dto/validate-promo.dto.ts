import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidatePromoDto {
  @ApiProperty({ example: 'DISKON20' })
  @IsString()
  code: string;

  @ApiProperty({ example: 7 })
  @IsInt()
  @Min(1)
  bookingDays: number;
}
