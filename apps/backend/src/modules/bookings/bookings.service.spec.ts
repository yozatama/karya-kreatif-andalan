import { Test, TestingModule } from "@nestjs/testing";
import {
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { PrismaService } from "../../prisma/prisma.service";

describe("BookingsService", () => {
  let service: BookingsService;
  let prisma: any;

  beforeEach(async () => {
    const mockPrisma = {
      booking: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
      },
      vehicle: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
      vehicleCheckpoint: {
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
    prisma = module.get(PrismaService);
  });

  describe("create", () => {
    it("should validate dates and calculate total", async () => {
      const dto = {
        vehicleId: "vehicle-1",
        startDate: "2024-03-01",
        endDate: "2024-03-04",
      };

      prisma.vehicle.findUnique.mockResolvedValue({
        id: "vehicle-1",
        dailyRate: 500000,
        depositAmount: 1000000,
        isAvailable: true,
        status: "AVAILABLE",
      });

      prisma.booking.create.mockResolvedValue({
        id: "booking-1",
        userId: "user-1",
        vehicleId: "vehicle-1",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-04"),
        durationDays: 3,
        totalAmount: 1500000,
        depositAmount: 1000000,
        status: "PENDING",
        vehicle: { id: "vehicle-1", name: "Vehicle 1" },
      });

      const result = await service.create("user-1", dto);

      expect(prisma.booking.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            durationDays: 3,
            totalAmount: 1500000,
            depositAmount: 1000000,
          }),
        }),
      );
      expect(result.status).toBe("PENDING");
    });

    it("should throw if vehicle is not available", async () => {
      prisma.vehicle.findUnique.mockResolvedValue({
        id: "vehicle-1",
        dailyRate: 500000,
        depositAmount: 1000000,
        isAvailable: false,
        status: "RENTED",
      });

      await expect(
        service.create("user-1", {
          vehicleId: "vehicle-1",
          startDate: "2024-03-01",
          endDate: "2024-03-04",
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should throw if end date is before start date", async () => {
      prisma.vehicle.findUnique.mockResolvedValue({
        id: "vehicle-1",
        dailyRate: 500000,
        depositAmount: 1000000,
        isAvailable: true,
        status: "AVAILABLE",
      });

      await expect(
        service.create("user-1", {
          vehicleId: "vehicle-1",
          startDate: "2024-03-04",
          endDate: "2024-03-01",
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it("should throw if vehicle not found", async () => {
      prisma.vehicle.findUnique.mockResolvedValue(null);

      await expect(
        service.create("user-1", {
          vehicleId: "nonexist",
          startDate: "2024-03-01",
          endDate: "2024-03-04",
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe("approve", () => {
    it("should approve a pending booking", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        status: "PENDING",
        vehicleId: "vehicle-1",
      });

      prisma.booking.update.mockResolvedValue({
        id: "booking-1",
        status: "APPROVED",
        approvedBy: "admin-1",
        vehicle: { id: "vehicle-1" },
      });

      const result = await service.approve("booking-1", "admin-1");

      expect(prisma.booking.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: "APPROVED",
            approvedBy: "admin-1",
          }),
        }),
      );
      expect(result.status).toBe("APPROVED");
    });

    it("should throw if booking is not pending", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        status: "APPROVED",
        vehicleId: "vehicle-1",
      });

      await expect(service.approve("booking-1", "admin-1")).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe("reject", () => {
    it("should reject a pending booking", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        status: "PENDING",
        vehicleId: "vehicle-1",
        notes: null,
      });

      prisma.booking.update.mockResolvedValue({
        id: "booking-1",
        status: "REJECTED",
        vehicle: { id: "vehicle-1" },
      });

      const result = await service.reject("booking-1", "admin-1", "Not available");

      expect(prisma.booking.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: "REJECTED",
            approvedBy: "admin-1",
          }),
        }),
      );
      expect(result.status).toBe("REJECTED");
    });

    it("should throw if booking is not pending", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        status: "ACTIVE",
        vehicleId: "vehicle-1",
      });

      await expect(
        service.reject("booking-1", "admin-1", "reason"),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
