import { IsString, IsDateString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  vehicleId!: string;

  @ApiProperty()
  @IsDateString()
  startDate!: string;

  @ApiProperty()
  @IsDateString()
  endDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pickupLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  returnLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
