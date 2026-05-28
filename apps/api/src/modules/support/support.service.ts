import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class SupportService {
  constructor(private prisma: PrismaService) {}

  async createTicket(userId: string, dto: CreateTicketDto) {
    const ticket = await this.prisma.supportTicket.create({
      data: {
        userId,
        subject: dto.subject,
        category: dto.category,
        priority: dto.priority || 'MEDIUM',
      },
    });

    // Add initial message
    await this.prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        senderId: userId,
        message: dto.message,
        isAdmin: false,
      },
    });

    return ticket;
  }

  async findAll(pagination: PaginationDto, userId?: string, isAdmin?: boolean) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;

    const where = !isAdmin ? { userId } : {};

    const [tickets, total] = await Promise.all([
      this.prisma.supportTicket.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          user: { select: { id: true, name: true, email: true } },
          _count: { select: { messages: true } },
        },
      }),
      this.prisma.supportTicket.count({ where }),
    ]);

    return new PaginatedResponseDto(tickets, total, page, limit);
  }

  async findById(id: string, userId?: string, isAdmin?: boolean) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { id: true, name: true } } },
        },
      },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (!isAdmin && ticket.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return ticket;
  }

  async addMessage(ticketId: string, senderId: string, dto: CreateMessageDto, isAdmin: boolean) {
    const ticket = await this.prisma.supportTicket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    if (!isAdmin && ticket.userId !== senderId) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.ticketMessage.create({
      data: {
        ticketId,
        senderId,
        message: dto.message,
        isAdmin,
      },
    });
  }

  async updateStatus(id: string, status: string) {
    const ticket = await this.prisma.supportTicket.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return this.prisma.supportTicket.update({
      where: { id },
      data: { status },
    });
  }
}
