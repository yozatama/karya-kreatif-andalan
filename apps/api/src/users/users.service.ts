import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true, documents: true, driverVerification: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  }

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        roleId: dto.roleId || '',
      },
      include: { role: true },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findById(id);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      include: { role: true },
    });
  }

  async uploadDocument(userId: string, type: string, fileUrl: string) {
    await this.findById(userId);
    return this.prisma.document.create({
      data: {
        userId,
        type,
        fileUrl,
      },
    });
  }

  async getVerificationStatus(userId: string) {
    const verification = await this.prisma.driverVerification.findUnique({
      where: { userId },
      include: {
        ktpDocument: true,
        simDocument: true,
        selfieDocument: true,
      },
    });
    if (!verification) {
      return { status: 'NOT_STARTED', documents: [] };
    }
    return verification;
  }
}
