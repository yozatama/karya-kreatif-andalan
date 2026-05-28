import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "user@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "password123" })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: "John Doe" })
  @IsString()
  @MinLength(2)
  name!: string;

  @ApiPropertyOptional({ example: "+6281234567890" })
  @IsOptional()
  @IsString()
  phone?: string;
}
