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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ExtendBookingDto } from './dto/extend-booking.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a booking' })
  async create(
    @Body() dto: CreateBookingDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.bookingsService.create(userId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List bookings (filtered by role)' })
  @ApiQuery({ name: 'status', required: false })
  async findAll(
    @Query() pagination: PaginationDto,
    @Query('status') status: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.bookingsService.findAll(pagination, user.id, status, isAdmin);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.bookingsService.findById(id, user.id, isAdmin);
  }

  @Patch(':id/status')
  @Roles('super_admin', 'operational_admin')
  @ApiOperation({ summary: 'Update booking status (admin only)' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, dto);
  }

  @Post(':id/extend')
  @ApiOperation({ summary: 'Extend booking end date' })
  async extend(
    @Param('id') id: string,
    @Body() dto: ExtendBookingDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.bookingsService.extend(id, userId, dto);
  }

  @Post(':id/return')
  @ApiOperation({ summary: 'Request return for a booking' })
  async requestReturn(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.bookingsService.requestReturn(id, userId);
  }
}
