import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async findByUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } });
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async create(userId: string, title: string, message: string, type: string) {
    return this.prisma.notification.create({
      data: { userId, title, message, type },
    });
  }

  async sendWhatsApp(phone: string, message: string) {
    // Stub: In production, integrate with WhatsApp Business API
    return { sent: true, channel: 'whatsapp', phone, message };
  }

  async sendEmail(email: string, subject: string, body: string) {
    // Stub: In production, integrate with email service (SendGrid, etc.)
    return { sent: true, channel: 'email', email, subject };
  }

  async sendPush(userId: string, title: string, body: string) {
    // Stub: In production, integrate with FCM or APNs
    return { sent: true, channel: 'push', userId, title };
  }
}
