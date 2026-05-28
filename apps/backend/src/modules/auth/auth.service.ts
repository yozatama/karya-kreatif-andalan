import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { RegisterDto, LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    let customerRole = await this.prisma.role.findUnique({
      where: { name: "CUSTOMER" },
    });

    if (!customerRole) {
      customerRole = await this.prisma.role.create({
        data: { name: "CUSTOMER", description: "Customer role" },
      });
    }

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
        roleId: customerRole.id,
      },
      include: { role: true },
    });

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const tokens = await this.generateTokens(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role.name,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>("jwt.refreshSecret"),
      });
      const tokens = await this.generateTokens(payload.sub, payload.email);
      return tokens;
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role.name,
      isVerified: user.isVerified,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
    };
  }

  async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("jwt.secret"),
        expiresIn: this.configService.get<string>("jwt.expiresIn") || "1d",
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>("jwt.refreshSecret"),
        expiresIn:
          this.configService.get<string>("jwt.refreshExpiresIn") || "7d",
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
