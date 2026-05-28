import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markAsRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { message: "All notifications marked as read" };
  }

  // Placeholder: send WhatsApp notification
  async sendWhatsApp(_phone: string, _message: string) {
    // Integration with WhatsApp Business API will be added
    return { sent: false, provider: "whatsapp", reason: "not_configured" };
  }

  // Placeholder: send email notification
  async sendEmail(_email: string, _subject: string, _body: string) {
    // Integration with email service will be added
    return { sent: false, provider: "email", reason: "not_configured" };
  }

  // Placeholder: send push notification
  async sendPush(_userId: string, _title: string, _body: string) {
    // Integration with push notification service will be added
    return { sent: false, provider: "push", reason: "not_configured" };
  }

  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: string,
    data?: any,
  ) {
    return this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type: type as any,
        data,
      },
    });
  }
}
