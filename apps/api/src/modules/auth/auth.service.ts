import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
      },
    });

    // Assign default driver role
    const driverRole = await this.prisma.role.findUnique({
      where: { name: 'driver' },
    });
    if (driverRole) {
      await this.prisma.userRole.create({
        data: { userId: user.id, roleId: driverRole.id },
      });
    }

    const tokens = await this.generateTokens(user.id, user.email);
    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.userRoles.map((ur) => ur.role.name),
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.generateTokens(user.id, user.email);
    return { user, ...tokens };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      });
      const tokens = await this.generateTokens(payload.sub, payload.email);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async sendOtp(phone: string) {
    // Stub implementation - in production, integrate with SMS provider
    const code = '123456';
    console.log(`[OTP] Sending code ${code} to ${phone}`);
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(phone: string, code: string) {
    // Stub implementation - accept "123456" as valid code
    if (code !== '123456') {
      throw new BadRequestException('Invalid OTP code');
    }

    const user = await this.prisma.user.findFirst({
      where: { phone },
      include: { userRoles: { include: { role: true } } },
    });

    if (!user) {
      throw new BadRequestException('User not found with this phone number');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.userRoles.map((ur) => ur.role.name),
      },
      ...tokens,
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    // Stub implementation - in production, verify Google ID token
    // For now, return a mock response
    return {
      message: 'Google login stub - implement with Google OAuth verification',
      idToken: dto.idToken,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: { include: { role: true } },
        driverVerification: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { passwordHash, ...result } = user;
    return {
      ...result,
      roles: user.userRoles.map((ur) => ur.role.name),
    };
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET || 'super-secret-key',
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }
}
