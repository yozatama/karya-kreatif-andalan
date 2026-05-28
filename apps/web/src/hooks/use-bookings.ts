import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activeRentals } from "@/lib/dashboard-mock-data";

export function useBookings(filters?: { status?: string }) {
  return useQuery({
    queryKey: ["bookings", filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      let result = [...activeRentals];
      if (filters?.status && filters.status !== "all") {
        result = result.filter((b) => b.status === filters.status);
      }
      return result;
    },
  });
}

export function useBooking(id: string) {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return activeRentals.find((b) => b.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { vehicleId: string; startDate: string; endDate: string; pickupLocation: string }) => {
      await new Promise((r) => setTimeout(r, 1000));
      return { id: `BK-${Date.now()}`, ...data, status: "PENDING" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string; status: string }) => {
      await new Promise((r) => setTimeout(r, 500));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
