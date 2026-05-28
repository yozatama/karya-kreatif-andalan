import { IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  bookingId: string;

  @ApiProperty({ example: 'BANK_TRANSFER', enum: ['BANK_TRANSFER', 'EWALLET', 'CREDIT_CARD', 'CASH'] })
  @IsString()
  method: string;

  @ApiProperty({ example: 500000 })
  @IsNumber()
  @Min(0)
  amount: number;
}
