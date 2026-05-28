import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('support')
@Controller('support/tickets')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SupportController {
  constructor(private supportService: SupportService) {}

  @Post()
  @ApiOperation({ summary: 'Create support ticket' })
  @ApiResponse({ status: 201, description: 'Ticket created' })
  async create(
    @CurrentUser() user: any,
    @Body('subject') subject: string,
    @Body('description') description: string,
    @Body('priority') priority?: string,
  ) {
    return this.supportService.create(user.id, subject, description, priority);
  }

  @Get()
  @ApiOperation({ summary: 'Get support tickets' })
  @ApiResponse({ status: 200, description: 'List of tickets' })
  async findAll(@CurrentUser() user: any) {
    return this.supportService.findAll(user.id, user.role?.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiResponse({ status: 200, description: 'Ticket found' })
  async findById(@Param('id') id: string) {
    return this.supportService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ticket status' })
  @ApiResponse({ status: 200, description: 'Ticket updated' })
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.supportService.updateStatus(id, status);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Add message to ticket' })
  @ApiResponse({ status: 201, description: 'Message added' })
  async addMessage(
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body('content') content: string,
  ) {
    return this.supportService.addMessage(id, user.id, content);
  }
}
