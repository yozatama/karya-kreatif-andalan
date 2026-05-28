"use client";

import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  addNotification: (notification: Notification) => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Pembayaran Berhasil",
    message: "Pembayaran rental bulan Januari telah diterima.",
    type: "success",
    read: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Jatuh Tempo Mendekati",
    message: "Pembayaran berikutnya jatuh tempo dalam 3 hari.",
    type: "warning",
    read: false,
    createdAt: "2024-01-14T08:00:00Z",
  },
  {
    id: "3",
    title: "Service Berkala",
    message: "Kendaraan Anda dijadwalkan untuk service pada tanggal 20 Januari.",
    type: "info",
    read: true,
    createdAt: "2024-01-13T15:00:00Z",
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter((n) => !n.read).length,
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.read ? 0 : 1),
    })),
}));
