import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';

@Injectable()
export class VerificationService {
  constructor(private prisma: PrismaService) {}

  async uploadDocument(userId: string, dto: UploadDocumentDto) {
    // Save document reference
    const document = await this.prisma.document.create({
      data: {
        userId,
        type: dto.type,
        fileUrl: dto.fileUrl,
        fileName: dto.fileName,
      },
    });

    // Create or update driver verification
    const fieldMap: Record<string, string> = {
      KTP: 'ktpUrl',
      SIM: 'simUrl',
      SELFIE: 'selfieUrl',
    };

    const field = fieldMap[dto.type];
    if (field) {
      await this.prisma.driverVerification.upsert({
        where: { userId },
        create: {
          userId,
          [field]: dto.fileUrl,
          status: 'PENDING',
        },
        update: {
          [field]: dto.fileUrl,
          status: 'PENDING',
        },
      });
    }

    return document;
  }

  async getStatus(userId: string) {
    const verification = await this.prisma.driverVerification.findUnique({
      where: { userId },
    });
    if (!verification) {
      return { status: 'NOT_STARTED', documents: {} };
    }
    return verification;
  }

  async getPendingVerifications() {
    return this.prisma.driverVerification.findMany({
      where: { status: 'PENDING' },
      include: { user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async approve(id: string) {
    const verification = await this.prisma.driverVerification.findUnique({
      where: { id },
    });
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    return this.prisma.driverVerification.update({
      where: { id },
      data: { status: 'APPROVED', verifiedAt: new Date() },
    });
  }

  async reject(id: string, dto: UpdateVerificationDto) {
    const verification = await this.prisma.driverVerification.findUnique({
      where: { id },
    });
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    return this.prisma.driverVerification.update({
      where: { id },
      data: {
        status: 'REJECTED',
        rejectionReason: dto.rejectionReason,
      },
    });
  }
}
