import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VerificationService } from './verification.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Verification')
@ApiBearerAuth()
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload verification document' })
  async upload(
    @Body() dto: UploadDocumentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.verificationService.uploadDocument(userId, dto);
  }

  @Get('status')
  @ApiOperation({ summary: 'Get own verification status' })
  async getStatus(@CurrentUser('id') userId: string) {
    return this.verificationService.getStatus(userId);
  }

  @Get('pending')
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'List pending verifications (admin)' })
  async getPending() {
    return this.verificationService.getPendingVerifications();
  }

  @Patch(':id/approve')
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'Approve verification (admin)' })
  async approve(@Param('id') id: string) {
    return this.verificationService.approve(id);
  }

  @Patch(':id/reject')
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'Reject verification (admin)' })
  async reject(@Param('id') id: string, @Body() dto: UpdateVerificationDto) {
    return this.verificationService.reject(id, dto);
  }
}
