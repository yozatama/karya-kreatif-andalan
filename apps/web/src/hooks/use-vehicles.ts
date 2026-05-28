import { useQuery } from "@tanstack/react-query";
import { vehicles } from "@/lib/mock-data";

export function useVehicles(filters?: { type?: string; minPrice?: number; maxPrice?: number; transmission?: string }) {
  return useQuery({
    queryKey: ["vehicles", filters],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 500));
      let result = [...vehicles];
      if (filters?.type && filters.type !== "all") {
        result = result.filter((v) => v.type === filters.type);
      }
      if (filters?.minPrice) {
        result = result.filter((v) => v.pricePerDay >= filters.minPrice!);
      }
      if (filters?.maxPrice) {
        result = result.filter((v) => v.pricePerDay <= filters.maxPrice!);
      }
      if (filters?.transmission && filters.transmission !== "all") {
        result = result.filter((v) => v.transmission === filters.transmission);
      }
      return result;
    },
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return vehicles.find((v) => v.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useVehicleAvailability(id: string) {
  return useQuery({
    queryKey: ["vehicle-availability", id],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return { available: true, nextAvailableDate: null };
    },
    enabled: !!id,
  });
}
