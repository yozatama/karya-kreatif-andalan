import { Controller, Get, Post, Patch, Param, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created' })
  async create(@CurrentUser() user: any, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get bookings (role-based filtering)' })
  @ApiResponse({ status: 200, description: 'List of bookings' })
  async findAll(@CurrentUser() user: any) {
    return this.bookingsService.findAll(user.id, user.role?.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking found' })
  async findById(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }

  @Patch(':id/approve')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiOperation({ summary: 'Approve a booking (admin)' })
  @ApiResponse({ status: 200, description: 'Booking approved' })
  async approve(@Param('id') id: string) {
    return this.bookingsService.approve(id);
  }

  @Patch(':id/reject')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiOperation({ summary: 'Reject a booking (admin)' })
  @ApiResponse({ status: 200, description: 'Booking rejected' })
  async reject(@Param('id') id: string, @Body() dto: UpdateBookingStatusDto) {
    return this.bookingsService.reject(id, dto.notes);
  }

  @Patch(':id/activate')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiOperation({ summary: 'Activate a booking (admin)' })
  @ApiResponse({ status: 200, description: 'Booking activated' })
  async activate(@Param('id') id: string) {
    return this.bookingsService.activate(id);
  }

  @Patch(':id/return')
  @ApiOperation({ summary: 'Request return for a booking (user)' })
  @ApiResponse({ status: 200, description: 'Return requested' })
  async requestReturn(@Param('id') id: string) {
    return this.bookingsService.requestReturn(id);
  }

  @Patch(':id/complete')
  @UseGuards(RolesGuard)
  @Roles('SUPER_ADMIN', 'OPERATIONAL_ADMIN')
  @ApiOperation({ summary: 'Complete a booking (admin)' })
  @ApiResponse({ status: 200, description: 'Booking completed' })
  async complete(@Param('id') id: string) {
    return this.bookingsService.complete(id);
  }

  @Post(':id/checkpoint')
  @ApiOperation({ summary: 'Add vehicle checkpoint to a booking' })
  @ApiResponse({ status: 201, description: 'Checkpoint added' })
  async addCheckpoint(@Param('id') id: string, @Body() dto: CreateCheckpointDto) {
    return this.bookingsService.addCheckpoint(id, dto);
  }
}
