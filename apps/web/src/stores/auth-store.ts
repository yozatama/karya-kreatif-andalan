import { create } from "zustand";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  avatar?: string;
  platform?: string;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: "user" | "admin" | null;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,
  login: (user) => set({ user, isAuthenticated: true, role: user.role }),
  logout: () => set({ user: null, isAuthenticated: false, role: null }),
  setUser: (user) => set({ user }),
}));
