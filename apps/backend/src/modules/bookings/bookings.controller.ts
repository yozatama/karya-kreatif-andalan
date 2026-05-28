import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingStatusDto } from "./dto/update-booking-status.dto";
import { CreateCheckpointDto } from "./dto/create-checkpoint.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles, CurrentUser } from "../../common/decorators";

@ApiTags("bookings")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll(@CurrentUser() user: any, @Query() pagination: PaginationDto) {
    const userId = user.role?.name === "CUSTOMER" ? user.id : null;
    return this.bookingsService.findAll(userId, pagination);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser("id") userId: string, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(userId, dto);
  }

  @Roles("SUPER_ADMIN", "ADMIN")
  @Post(":id/approve")
  @HttpCode(HttpStatus.OK)
  approve(@Param("id") id: string, @CurrentUser("id") approverId: string) {
    return this.bookingsService.approve(id, approverId);
  }

  @Roles("SUPER_ADMIN", "ADMIN")
  @Post(":id/reject")
  @HttpCode(HttpStatus.OK)
  reject(
    @Param("id") id: string,
    @CurrentUser("id") approverId: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.reject(id, approverId, dto.reason);
  }

  @Post(":id/return")
  @HttpCode(HttpStatus.OK)
  returnVehicle(@Param("id") id: string) {
    return this.bookingsService.returnVehicle(id);
  }

  @Post(":id/checkpoint")
  @HttpCode(HttpStatus.CREATED)
  createCheckpoint(
    @Param("id") bookingId: string,
    @CurrentUser("id") userId: string,
    @Body() dto: CreateCheckpointDto,
  ) {
    return this.bookingsService.createCheckpoint(bookingId, userId, dto);
  }
}
