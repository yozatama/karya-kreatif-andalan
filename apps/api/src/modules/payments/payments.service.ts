import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { WebhookDto } from './dto/webhook.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createInvoice(userId: string, dto: CreatePaymentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only create payments for your own bookings');
    }

    // Stub Xendit integration - generates mock invoice URL
    const xenditInvoiceId = `inv_${randomUUID().slice(0, 8)}`;
    const xenditPaymentUrl = `https://checkout-staging.xendit.co/v2/invoice/${xenditInvoiceId}`;

    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        userId,
        amount: dto.amount,
        method: dto.method,
        status: 'PENDING',
        xenditInvoiceId,
        xenditPaymentUrl,
      },
    });

    // Create invoice record
    const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    await this.prisma.invoice.create({
      data: {
        paymentId: payment.id,
        bookingId: dto.bookingId,
        invoiceNumber,
        amount: dto.amount,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      },
    });

    return {
      payment,
      invoiceUrl: xenditPaymentUrl,
    };
  }

  async processWebhook(dto: WebhookDto) {
    // Stub - in production, verify Xendit webhook signature
    const payment = await this.prisma.payment.findFirst({
      where: { xenditInvoiceId: dto.external_id },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const status = dto.status === 'PAID' ? 'PAID' : dto.status === 'EXPIRED' ? 'EXPIRED' : 'FAILED';

    const updatedPayment = await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status,
        paidAt: status === 'PAID' ? new Date() : undefined,
      },
    });

    return updatedPayment;
  }

  async findByBooking(bookingId: string, userId?: string, isAdmin?: boolean) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (!isAdmin && booking.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.payment.findMany({
      where: { bookingId },
      include: { invoices: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string, userId?: string, isAdmin?: boolean) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { booking: true, invoices: true },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    if (!isAdmin && payment.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return payment;
  }
}
