import { create } from "zustand";

export interface BookingVehicle {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
}

export interface BookingFilters {
  type: string;
  minPrice: number;
  maxPrice: number;
  transmission: string;
}

interface BookingState {
  currentBooking: {
    vehicleId: string | null;
    startDate: string;
    endDate: string;
    duration: number;
    pickupLocation: string;
    notes: string;
    promoCode: string;
  };
  bookingStep: number;
  vehicles: BookingVehicle[];
  filters: BookingFilters;
  setBookingStep: (step: number) => void;
  setCurrentBooking: (booking: Partial<BookingState["currentBooking"]>) => void;
  setVehicles: (vehicles: BookingVehicle[]) => void;
  setFilters: (filters: Partial<BookingFilters>) => void;
  resetBooking: () => void;
}

const initialBooking = {
  vehicleId: null,
  startDate: "",
  endDate: "",
  duration: 0,
  pickupLocation: "",
  notes: "",
  promoCode: "",
};

export const useBookingStore = create<BookingState>((set) => ({
  currentBooking: initialBooking,
  bookingStep: 1,
  vehicles: [],
  filters: {
    type: "all",
    minPrice: 0,
    maxPrice: 1000000,
    transmission: "all",
  },
  setBookingStep: (step) => set({ bookingStep: step }),
  setCurrentBooking: (booking) =>
    set((state) => ({
      currentBooking: { ...state.currentBooking, ...booking },
    })),
  setVehicles: (vehicles) => set({ vehicles }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetBooking: () => set({ currentBooking: initialBooking, bookingStep: 1 }),
}));
