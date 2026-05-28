import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboard() {
    const [totalUsers, totalVehicles, totalBookings, totalRevenue] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.vehicle.count(),
        this.prisma.booking.count(),
        this.prisma.payment.aggregate({
          _sum: { amount: true },
          where: { status: "PAID" },
        }),
      ]);

    return {
      totalUsers,
      totalVehicles,
      totalBookings,
      totalRevenue: totalRevenue._sum.amount || 0,
      period: "all_time",
    };
  }

  async getRevenue() {
    // Placeholder: return mock monthly revenue data
    return {
      monthly: [
        { month: "2024-01", revenue: 0 },
        { month: "2024-02", revenue: 0 },
        { month: "2024-03", revenue: 0 },
      ],
      total: 0,
    };
  }

  async getFleet() {
    const statusCounts = await this.prisma.vehicle.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    return {
      statusBreakdown: statusCounts.map((s) => ({
        status: s.status,
        count: s._count.status,
      })),
      totalVehicles: statusCounts.reduce((sum, s) => sum + s._count.status, 0),
    };
  }

  async getDrivers() {
    // Placeholder: return mock driver stats
    return {
      totalDrivers: 0,
      verified: 0,
      pending: 0,
      rejected: 0,
    };
  }
}
