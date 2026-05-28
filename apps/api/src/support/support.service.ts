import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, subject: string, description: string, priority?: string) {
    return this.prisma.supportTicket.create({
      data: {
        userId,
        subject,
        description,
        priority: priority || 'MEDIUM',
      },
    });
  }

  async findAll(userId: string, role?: string) {
    const where: any = {};
    if (role === 'DRIVER') {
      where.userId = userId;
    }
    return this.prisma.supportTicket.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }

  async updateStatus(id: string, status: string) {
    await this.findById(id);
    return this.prisma.supportTicket.update({
      where: { id },
      data: { status },
    });
  }

  async addMessage(id: string, userId: string, content: string) {
    const ticket = await this.findById(id);
    const messages = JSON.parse(ticket.messages);
    messages.push({
      id: `msg_${Date.now()}`,
      userId,
      content,
      createdAt: new Date().toISOString(),
    });
    return this.prisma.supportTicket.update({
      where: { id },
      data: { messages: JSON.stringify(messages) },
    });
  }
}
