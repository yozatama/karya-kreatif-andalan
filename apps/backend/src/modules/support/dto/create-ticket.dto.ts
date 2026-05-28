import { IsString, IsEnum, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

enum TicketCategory {
  BOOKING_ISSUE = "BOOKING_ISSUE",
  PAYMENT_ISSUE = "PAYMENT_ISSUE",
  VEHICLE_ISSUE = "VEHICLE_ISSUE",
  ACCOUNT_ISSUE = "ACCOUNT_ISSUE",
  OTHER = "OTHER",
}

enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  subject!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty({ enum: TicketCategory })
  @IsEnum(TicketCategory)
  category!: TicketCategory;

  @ApiPropertyOptional({ enum: TicketPriority })
  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}
