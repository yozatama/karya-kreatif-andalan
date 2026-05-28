"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  FileText,
  CreditCard,
  ShieldCheck,
  Headphones,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Home,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/stores/dashboard-store";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/dashboard-mock-data";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/booking", label: "Booking", icon: Car },
  { href: "/dashboard/rentals", label: "Rental Saya", icon: FileText },
  { href: "/dashboard/payments", label: "Pembayaran", icon: CreditCard },
  { href: "/dashboard/verification", label: "Verifikasi", icon: ShieldCheck },
  { href: "/dashboard/support", label: "Bantuan", icon: Headphones },
  { href: "/dashboard/settings", label: "Pengaturan", icon: Settings },
];

const mobileNavLinks = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/booking", label: "Booking", icon: Car },
  { href: "/dashboard/rentals", label: "Rental", icon: FileText },
  { href: "/dashboard/payments", label: "Bayar", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useDashboardStore();
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-full border-r bg-white dark:bg-gray-800 transition-all duration-300 lg:block",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b px-4">
            {sidebarOpen && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
                  K
                </div>
                <span className="font-semibold text-sm">Karya Kreatif</span>
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 space-y-1 p-3">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  {sidebarOpen && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="border-t p-3">
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.platform}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn("flex-1 transition-all duration-300", sidebarOpen ? "lg:ml-64" : "lg:ml-20")}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white dark:bg-gray-800 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold capitalize">
                {pathname === "/dashboard"
                  ? "Dashboard"
                  : pathname.split("/").pop()?.replace("-", " ") || "Dashboard"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 rounded-lg border bg-white dark:bg-gray-800 shadow-lg p-3 space-y-2 max-h-80 overflow-y-auto">
                  <p className="text-sm font-semibold mb-2">Notifikasi</p>
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={cn("rounded-md p-2 text-sm", !n.read && "bg-emerald-50 dark:bg-emerald-900/10")}>
                      <p className="font-medium text-xs">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu */}
            <Link href="/dashboard/settings" className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 pb-24 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-white dark:bg-gray-800 py-2 lg:hidden">
        {mobileNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 text-xs",
                isActive ? "text-emerald-600" : "text-gray-500"
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-xs text-gray-500"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span>Lainnya</span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white dark:bg-gray-800 p-6 space-y-2 animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Menu</h3>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="border-t pt-3 mt-3">
              <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 w-full">
                <LogOut className="h-5 w-5" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
