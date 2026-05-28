import { Controller, Get, Post, Param, Body, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private paymentsService: PaymentsService,
    private configService: ConfigService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a payment' })
  @ApiResponse({ status: 201, description: 'Payment created' })
  async createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.createPayment(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payments (role-based)' })
  @ApiResponse({ status: 200, description: 'List of payments' })
  async findAll(@CurrentUser() user: any) {
    return this.paymentsService.findAll(user.id, user.role?.name);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment found' })
  async findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Xendit payment webhook callback' })
  @ApiResponse({ status: 200, description: 'Webhook processed' })
  async webhook(@Headers('x-callback-token') callbackToken: string, @Body() payload: any) {
    const expectedToken = this.configService.get<string>('XENDIT_CALLBACK_TOKEN');
    if (!callbackToken || callbackToken !== expectedToken) {
      throw new UnauthorizedException('Invalid callback token');
    }
    return this.paymentsService.processWebhook(payload);
  }

  @Get('invoices/:bookingId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate invoice for booking' })
  @ApiResponse({ status: 200, description: 'Invoice generated' })
  async generateInvoice(@Param('bookingId') bookingId: string) {
    return this.paymentsService.generateInvoice(bookingId);
  }
}
