import { IsString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpSendDto {
  @ApiProperty({ example: '+628123456789' })
  @IsString()
  phone: string;
}

export class OtpVerifyDto {
  @ApiProperty({ example: '+628123456789' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  code: string;
}
