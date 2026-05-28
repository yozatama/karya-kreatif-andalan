import { IsString, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateBookingStatusDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reason?: string;
}
