import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'booking-id' })
  @IsString()
  @IsNotEmpty()
  bookingId: string;

  @ApiProperty({ example: 350000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'VIRTUAL_ACCOUNT', description: 'VIRTUAL_ACCOUNT | EWALLET | QRIS' })
  @IsString()
  @IsNotEmpty()
  method: string;
}
