import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import dayjs from 'dayjs';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalVehicles,
      activeBookings,
      pendingBookings,
      totalRevenue,
      pendingVerifications,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.vehicle.count(),
      this.prisma.booking.count({ where: { status: 'ACTIVE' } }),
      this.prisma.booking.count({ where: { status: 'PENDING' } }),
      this.prisma.payment.aggregate({
        where: { status: 'PAID' },
        _sum: { amount: true },
      }),
      this.prisma.driverVerification.count({ where: { status: 'PENDING' } }),
    ]);

    const rentedVehicles = await this.prisma.vehicle.count({
      where: { status: 'RENTED' },
    });

    return {
      totalUsers,
      totalVehicles,
      activeBookings,
      pendingBookings,
      totalRevenue: totalRevenue._sum.amount || 0,
      pendingVerifications,
      fleetUtilization: totalVehicles > 0
        ? Math.round((rentedVehicles / totalVehicles) * 100)
        : 0,
    };
  }

  async getRevenueChart(period: string) {
    const payments = await this.prisma.payment.findMany({
      where: { status: 'PAID' },
      orderBy: { createdAt: 'asc' },
    });

    const grouped: Record<string, number> = {};
    for (const payment of payments) {
      let key: string;
      switch (period) {
        case 'daily':
          key = dayjs(payment.createdAt).format('YYYY-MM-DD');
          break;
        case 'weekly':
          key = `${dayjs(payment.createdAt).year()}-W${Math.ceil(dayjs(payment.createdAt).date() / 7)}`;
          break;
        case 'monthly':
        default:
          key = dayjs(payment.createdAt).format('YYYY-MM');
          break;
      }
      grouped[key] = (grouped[key] || 0) + payment.amount;
    }

    return Object.entries(grouped).map(([period, amount]) => ({
      period,
      amount,
    }));
  }

  async getFleetUtilization() {
    const vehicles = await this.prisma.vehicle.groupBy({
      by: ['status'],
      _count: { id: true },
    });

    const total = vehicles.reduce((sum, v) => sum + v._count.id, 0);
    return {
      total,
      breakdown: vehicles.map((v) => ({
        status: v.status,
        count: v._count.id,
        percentage: total > 0 ? Math.round((v._count.id / total) * 100) : 0,
      })),
    };
  }

  async getReportsSummary() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      newUsersLast30Days,
      bookingsLast30Days,
      revenueLast30Days,
      completedBookings,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.booking.count({
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      this.prisma.payment.aggregate({
        where: { status: 'PAID', createdAt: { gte: thirtyDaysAgo } },
        _sum: { amount: true },
      }),
      this.prisma.booking.count({
        where: { status: 'COMPLETED', updatedAt: { gte: thirtyDaysAgo } },
      }),
    ]);

    return {
      period: 'last_30_days',
      newUsers: newUsersLast30Days,
      totalBookings: bookingsLast30Days,
      completedBookings,
      revenue: revenueLast30Days._sum.amount || 0,
    };
  }
}
