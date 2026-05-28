import { create } from "zustand";

interface AdminState {
  selectedTab: string;
  filters: Record<string, string>;
  dateRange: {
    start: string;
    end: string;
  };
  setSelectedTab: (tab: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setDateRange: (range: { start: string; end: string }) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  selectedTab: "overview",
  filters: {},
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  },
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setDateRange: (range) => set({ dateRange: range }),
}));
