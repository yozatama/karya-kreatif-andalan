import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";
import { PrismaService } from "../../prisma/prisma.service";

jest.mock("bcrypt");

describe("AuthService", () => {
  let service: AuthService;
  let prisma: any;
  let jwtService: any;

  beforeEach(async () => {
    const mockPrisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      role: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const mockJwtService = {
      signAsync: jest.fn().mockResolvedValue("mock-token"),
      verify: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn((key: string) => {
        const values: Record<string, string> = {
          "jwt.secret": "test-secret",
          "jwt.expiresIn": "1d",
          "jwt.refreshSecret": "test-refresh-secret",
          "jwt.refreshExpiresIn": "7d",
        };
        return values[key];
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
    jwtService = module.get(JwtService);
  });

  describe("register", () => {
    it("should hash the password and create a user", async () => {
      const dto = {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
        phone: "+6281234567890",
      };

      prisma.user.findUnique.mockResolvedValue(null);
      prisma.role.findUnique.mockResolvedValue({
        id: "role-1",
        name: "CUSTOMER",
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed-password");
      prisma.user.create.mockResolvedValue({
        id: "user-1",
        email: dto.email,
        name: dto.name,
        role: { name: "CUSTOMER" },
      });

      const result = await service.register(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: dto.email,
            passwordHash: "hashed-password",
          }),
        }),
      );
      expect(result.user.email).toBe(dto.email);
      expect(result.accessToken).toBeDefined();
    });

    it("should throw BadRequestException if email already exists", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "existing" });

      await expect(
        service.register({
          email: "test@example.com",
          password: "pass123",
          name: "Test",
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("login", () => {
    it("should validate credentials and return token", async () => {
      const dto = { email: "test@example.com", password: "password123" };

      prisma.user.findUnique.mockResolvedValue({
        id: "user-1",
        email: dto.email,
        name: "Test User",
        passwordHash: "hashed-password",
        role: { name: "CUSTOMER" },
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login(dto);

      expect(bcrypt.compare).toHaveBeenCalledWith(dto.password, "hashed-password");
      expect(result.user.email).toBe(dto.email);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it("should throw UnauthorizedException for invalid credentials", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: "user-1",
        email: "test@example.com",
        passwordHash: "hashed",
        role: { name: "CUSTOMER" },
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: "test@example.com", password: "wrong" }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: "none@example.com", password: "pass" }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("generateTokens", () => {
    it("should generate access and refresh tokens", async () => {
      jwtService.signAsync
        .mockResolvedValueOnce("access-token")
        .mockResolvedValueOnce("refresh-token");

      const result = await service.generateTokens("user-1", "test@example.com");

      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    });
  });
});
