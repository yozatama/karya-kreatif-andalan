"use client";

import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  avatar?: string;
  verified: boolean;
  platform?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: "1",
    name: "Budi Santoso",
    email: "budi@email.com",
    phone: "081234567890",
    role: "user",
    verified: true,
    platform: "Gojek",
  },
  token: "mock-jwt-token",
  isAuthenticated: true,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
  setUser: (user) => set({ user }),
}));
