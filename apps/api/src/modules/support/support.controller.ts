import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SupportService } from './support.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Support')
@ApiBearerAuth()
@Controller('support/tickets')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create support ticket' })
  async create(
    @Body() dto: CreateTicketDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.supportService.createTicket(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List support tickets' })
  async findAll(
    @Query() pagination: PaginationDto,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.supportService.findAll(pagination, user.id, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.supportService.findById(id, user.id, isAdmin);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Add message to ticket' })
  async addMessage(
    @Param('id') id: string,
    @Body() dto: CreateMessageDto,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.supportService.addMessage(id, user.id, dto, isAdmin);
  }

  @Patch(':id/status')
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'Update ticket status (admin)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.supportService.updateStatus(id, body.status);
  }
}
