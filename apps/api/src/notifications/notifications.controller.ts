import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: "Get user's notifications" })
  @ApiResponse({ status: 200, description: 'List of notifications' })
  async findByUser(@CurrentUser() user: any) {
    return this.notificationsService.findByUser(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Post('send')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiOperation({ summary: 'Send notification to user (admin)' })
  @ApiResponse({ status: 201, description: 'Notification sent' })
  async send(
    @Body('userId') userId: string,
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('type') type: string,
  ) {
    return this.notificationsService.create(userId, title, message, type);
  }
}
