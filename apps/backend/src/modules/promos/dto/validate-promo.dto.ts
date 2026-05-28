import { IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ValidatePromoDto {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsInt()
  rentalDays!: number;
}
