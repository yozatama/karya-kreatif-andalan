import { useQuery } from "@tanstack/react-query";
import { revenueData, fleetData, bookingStats } from "@/lib/dashboard-mock-data";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return {
        totalRevenue: 310000000,
        activeRentals: 56,
        totalVehicles: 78,
        activeDrivers: 52,
        pendingVerifications: 5,
      };
    },
  });
}

export function useRevenueChart() {
  return useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return revenueData;
    },
  });
}

export function useFleetUtilization() {
  return useQuery({
    queryKey: ["fleet-utilization"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return fleetData;
    },
  });
}

export function useBookingStats() {
  return useQuery({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      return bookingStats;
    },
  });
}
