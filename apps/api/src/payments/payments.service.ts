import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { XenditService } from './xendit.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private xenditService: XenditService,
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    let xenditResponse: any;
    switch (dto.method) {
      case 'VIRTUAL_ACCOUNT':
        xenditResponse = await this.xenditService.createVirtualAccount(dto.amount, dto.bookingId);
        break;
      case 'EWALLET':
        xenditResponse = await this.xenditService.createEwallet(dto.amount, dto.bookingId);
        break;
      case 'QRIS':
        xenditResponse = await this.xenditService.createQris(dto.amount, dto.bookingId);
        break;
      default:
        xenditResponse = { id: `manual_${Date.now()}` };
    }

    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        amount: dto.amount,
        method: dto.method,
        xenditId: xenditResponse.id,
        status: 'PENDING',
      },
      include: { booking: true },
    });

    return { payment, xenditResponse };
  }

  async processWebhook(payload: any) {
    const { external_id, status } = payload;
    if (!external_id) return { received: true };

    const payment = await this.prisma.payment.findFirst({
      where: { xenditId: external_id },
    });
    if (!payment) return { received: true };

    const newStatus = status === 'PAID' || status === 'COMPLETED' ? 'PAID' : 'FAILED';
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        paidAt: newStatus === 'PAID' ? new Date() : null,
      },
    });

    return { received: true, paymentId: payment.id, status: newStatus };
  }

  async getByBooking(bookingId: string) {
    return this.prisma.payment.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAll(userId?: string, role?: string) {
    const where: any = {};
    if (role === 'DRIVER') {
      where.booking = { userId };
    }
    return this.prisma.payment.findMany({
      where,
      include: { booking: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async generateInvoice(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { vehicle: true, user: true },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const invoiceNumber = `INV-${Date.now()}`;
    return this.prisma.invoice.create({
      data: {
        bookingId,
        invoiceNumber,
        amount: booking.totalPrice,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'UNPAID',
      },
    });
  }

  async calculatePenalty(bookingId: string, type: string, amount: number, description?: string) {
    return this.prisma.penalty.create({
      data: {
        bookingId,
        type,
        amount,
        description,
      },
    });
  }
}
