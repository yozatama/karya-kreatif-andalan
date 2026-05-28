import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
}

interface DashboardState {
  sidebarOpen: boolean;
  activePage: string;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setActivePage: (page: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  activePage: "dashboard",
  notifications: [],
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
  setNotifications: (notifications) => set({ notifications }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
}));
