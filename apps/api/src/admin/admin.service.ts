import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalVehicles,
      totalBookings,
      activeBookings,
      totalRevenue,
      pendingPayments,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.vehicle.count(),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: 'ACTIVE' } }),
      this.prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
      }),
      this.prisma.payment.count({ where: { status: 'PENDING' } }),
    ]);

    return {
      totalUsers,
      totalVehicles,
      totalBookings,
      activeBookings,
      totalRevenue: totalRevenue._sum.amount || 0,
      pendingPayments,
    };
  }

  async getRevenueChart() {
    const payments = await this.prisma.payment.findMany({
      where: { status: 'PAID' },
      orderBy: { createdAt: 'asc' },
      select: { amount: true, createdAt: true },
    });

    const monthlyRevenue: Record<string, number> = {};
    for (const payment of payments) {
      const monthKey = payment.createdAt.toISOString().slice(0, 7);
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + payment.amount;
    }

    return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }

  async getFleetUtilization() {
    const vehicles = await this.prisma.vehicle.findMany({
      include: {
        bookings: {
          where: { status: { in: ['ACTIVE', 'APPROVED'] } },
        },
      },
    });

    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter((v: any) => v.bookings.length > 0).length;
    const utilizationRate = totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0;

    return {
      totalVehicles,
      activeVehicles,
      idleVehicles: totalVehicles - activeVehicles,
      utilizationRate: Math.round(utilizationRate * 100) / 100,
      vehiclesByType: await this.prisma.vehicle.groupBy({
        by: ['type'],
        _count: true,
      }),
    };
  }

  async getDriverRetention() {
    const totalDrivers = await this.prisma.user.count({
      where: { role: { name: 'DRIVER' } },
    });

    const activeDrivers = await this.prisma.user.count({
      where: {
        role: { name: 'DRIVER' },
        bookings: { some: {} },
      },
    });

    // Efficient repeat drivers count using groupBy to avoid loading all drivers into memory
    const driversWithMultipleBookings = await this.prisma.booking.groupBy({
      by: ['userId'],
      _count: { userId: true },
      having: {
        userId: { _count: { gt: 1 } },
      },
    });

    // Filter to only count drivers (not other roles)
    const driverUsers = await this.prisma.user.findMany({
      where: {
        id: { in: driversWithMultipleBookings.map((d: any) => d.userId) },
        role: { name: 'DRIVER' },
      },
      select: { id: true },
    });
    const repeatDriverCount = driverUsers.length;

    return {
      totalDrivers,
      activeDrivers,
      retentionRate: totalDrivers > 0 ? Math.round((activeDrivers / totalDrivers) * 100) : 0,
      repeatBookingRate: totalDrivers > 0 ? Math.round((repeatDriverCount / totalDrivers) * 100) : 0,
    };
  }
}
