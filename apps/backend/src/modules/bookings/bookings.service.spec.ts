import { Test, TestingModule } from "@nestjs/testing";
import {
  BadRequestException,
  ForbiddenException,
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
        findFirst: jest.fn(),
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

      // No overlapping bookings
      prisma.booking.findFirst.mockResolvedValue(null);

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

    it("should throw if there is an overlapping booking", async () => {
      prisma.vehicle.findUnique.mockResolvedValue({
        id: "vehicle-1",
        dailyRate: 500000,
        depositAmount: 1000000,
        isAvailable: true,
        status: "AVAILABLE",
      });

      // Simulate an existing overlapping booking
      prisma.booking.findFirst.mockResolvedValue({
        id: "existing-booking",
        vehicleId: "vehicle-1",
        status: "APPROVED",
        startDate: new Date("2024-03-02"),
        endDate: new Date("2024-03-05"),
      });

      await expect(
        service.create("user-1", {
          vehicleId: "vehicle-1",
          startDate: "2024-03-01",
          endDate: "2024-03-04",
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("findOne", () => {
    it("should return booking for the owner", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        userId: "user-1",
        status: "PENDING",
        vehicleId: "vehicle-1",
      });

      const result = await service.findOne("booking-1", {
        id: "user-1",
        role: { name: "CUSTOMER" },
      });

      expect(result.id).toBe("booking-1");
    });

    it("should return booking for admin regardless of ownership", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        userId: "user-1",
        status: "PENDING",
        vehicleId: "vehicle-1",
      });

      const result = await service.findOne("booking-1", {
        id: "admin-1",
        role: { name: "ADMIN" },
      });

      expect(result.id).toBe("booking-1");
    });

    it("should throw ForbiddenException if user does not own the booking", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        userId: "user-1",
        status: "PENDING",
        vehicleId: "vehicle-1",
      });

      await expect(
        service.findOne("booking-1", {
          id: "user-2",
          role: { name: "CUSTOMER" },
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe("approve", () => {
    it("should approve a pending booking", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        status: "PENDING",
        userId: "user-1",
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
        userId: "user-1",
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
        userId: "user-1",
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
        userId: "user-1",
        vehicleId: "vehicle-1",
      });

      await expect(
        service.reject("booking-1", "admin-1", "reason"),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe("returnVehicle", () => {
    it("should throw ForbiddenException if user does not own the booking", async () => {
      prisma.booking.findUnique.mockResolvedValue({
        id: "booking-1",
        userId: "user-1",
        status: "ACTIVE",
        vehicleId: "vehicle-1",
      });

      await expect(
        service.returnVehicle("booking-1", {
          id: "user-2",
          role: { name: "CUSTOMER" },
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
