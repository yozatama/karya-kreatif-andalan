import { Controller, Post, Get, Param, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Checkpoints')
@ApiBearerAuth()
@Controller('checkpoints')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create vehicle checkpoint' })
  async create(
    @Body() dto: CreateCheckpointDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.checkpointService.create(userId, dto);
  }

  @Get('booking/:bookingId')
  @ApiOperation({ summary: 'Get checkpoints by booking ID' })
  async findByBooking(
    @Param('bookingId') bookingId: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.checkpointService.findByBooking(bookingId, user.id, isAdmin);
  }

  @Post(':id/photos')
  @ApiOperation({ summary: 'Add photo to checkpoint' })
  async addPhoto(
    @Param('id') id: string,
    @Body() body: { imageUrl: string; label?: string },
  ) {
    return this.checkpointService.addPhoto(id, body.imageUrl, body.label);
  }
}
