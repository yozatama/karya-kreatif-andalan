import { Controller, Post, Get, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { WebhookDto } from './dto/webhook.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-invoice')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create payment invoice' })
  async createInvoice(
    @Body() dto: CreatePaymentDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.paymentsService.createInvoice(userId, dto);
  }

  @Public()
  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Xendit webhook callback' })
  async webhook(@Body() dto: WebhookDto) {
    return this.paymentsService.processWebhook(dto);
  }

  @Get('booking/:bookingId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payments by booking ID' })
  async findByBooking(
    @Param('bookingId') bookingId: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.paymentsService.findByBooking(bookingId, user.id, isAdmin);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; roles: string[] },
  ) {
    const isAdmin = user.roles.some((r) =>
      ['super_admin', 'operational_admin'].includes(r),
    );
    return this.paymentsService.findById(id, user.id, isAdmin);
  }
}
