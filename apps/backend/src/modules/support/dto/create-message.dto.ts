import { IsString, IsOptional, IsArray } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  message!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  attachments?: string[];
}
