import { IsString, IsNumber, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum PaymentMethod {
  BANK_TRANSFER = "BANK_TRANSFER",
  VIRTUAL_ACCOUNT = "VIRTUAL_ACCOUNT",
  EWALLET = "EWALLET",
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
}

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  bookingId!: string;

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentChannel?: string;
}
