import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: string) {
    const where: any = {};
    if (userId) where.userId = userId;
    return this.prisma.supportTicket.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        messages: {
          include: { sender: { select: { id: true, name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    });
    if (!ticket) {
      throw new NotFoundException("Ticket not found");
    }
    return ticket;
  }

  async create(userId: string, dto: CreateTicketDto) {
    return this.prisma.supportTicket.create({
      data: {
        userId,
        subject: dto.subject,
        description: dto.description,
        category: dto.category as any,
        priority: (dto.priority as any) || "MEDIUM",
        status: "OPEN",
      },
    });
  }

  async addMessage(ticketId: string, senderId: string, dto: CreateMessageDto) {
    await this.findOne(ticketId);
    return this.prisma.supportMessage.create({
      data: {
        ticketId,
        senderId,
        message: dto.message,
        attachments: dto.attachments,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);
    return this.prisma.supportTicket.update({
      where: { id },
      data: { status: status as any },
    });
  }
}
