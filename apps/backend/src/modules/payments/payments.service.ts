import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, dto: CreatePaymentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    const payment = await this.prisma.payment.create({
      data: {
        bookingId: dto.bookingId,
        userId,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod as any,
        paymentChannel: dto.paymentChannel,
        status: "PENDING",
      },
    });

    // Placeholder: create Xendit invoice/payment link
    const externalPaymentUrl = await this.createXenditPayment(payment);

    return {
      payment,
      paymentUrl: externalPaymentUrl,
    };
  }

  async handleWebhook(callbackToken: string | undefined, payload: any) {
    const expectedToken = this.configService.get<string>(
      "payment.xenditCallbackToken",
    );

    if (!expectedToken || callbackToken !== expectedToken) {
      throw new UnauthorizedException("Invalid callback token");
    }

    const { external_id, status } = payload;

    if (external_id) {
      await this.prisma.payment.updateMany({
        where: { externalId: external_id },
        data: {
          status: status === "PAID" ? "PAID" : "FAILED",
          paidAt: status === "PAID" ? new Date() : null,
        },
      });
    }

    return { received: true };
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });
    if (!payment) {
      throw new NotFoundException("Payment not found");
    }
    return payment;
  }

  async findByUser(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      include: { booking: { include: { vehicle: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  private async createXenditPayment(_payment: any): Promise<string> {
    // Placeholder for Xendit integration
    // In production, this would call Xendit API to create an invoice
    return `https://checkout.xendit.co/placeholder/${_payment.id}`;
  }
}
