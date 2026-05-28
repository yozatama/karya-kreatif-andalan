import { IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadDocumentDto {
  @ApiProperty({ example: 'KTP', enum: ['KTP', 'SIM', 'SELFIE'] })
  @IsString()
  @IsIn(['KTP', 'SIM', 'SELFIE'])
  type: string;

  @ApiProperty()
  @IsString()
  fileUrl: string;

  @ApiProperty()
  @IsString()
  fileName: string;
}
