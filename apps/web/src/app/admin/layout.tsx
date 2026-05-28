"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  Banknote,
  Wrench,
  Tag,
  FileEdit,
  BarChart3,
  Bell,
  Menu,
  X,
  ChevronLeft,
  Search,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/stores/dashboard-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/fleet", label: "Armada", icon: Car },
  { href: "/admin/bookings", label: "Booking", icon: CalendarCheck },
  { href: "/admin/users", label: "Pengguna", icon: Users },
  { href: "/admin/finance", label: "Keuangan", icon: Banknote },
  { href: "/admin/maintenance", label: "Perawatan", icon: Wrench },
  { href: "/admin/promos", label: "Promo", icon: Tag },
  { href: "/admin/cms", label: "CMS", icon: FileEdit },
  { href: "/admin/reports", label: "Laporan", icon: BarChart3 },
];

const mobileAdminLinks = [
  { href: "/admin", label: "Home", icon: LayoutDashboard },
  { href: "/admin/fleet", label: "Armada", icon: Car },
  { href: "/admin/bookings", label: "Booking", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useDashboardStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
          <div className="flex h-16 items-center justify-between border-b px-4">
            {sidebarOpen && (
              <Link href="/admin" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-sm">
                  K
                </div>
                <div>
                  <span className="font-semibold text-sm block leading-tight">Karya Kreatif</span>
                  <span className="text-[10px] text-gray-500">Admin Panel</span>
                </div>
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {adminLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
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

          <div className="border-t p-3">
            <div className={cn("flex items-center gap-3", !sidebarOpen && "justify-center")}>
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">AD</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Admin</p>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-emerald-500" />
                    <p className="text-xs text-gray-500">Super Admin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

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
            <Badge className="bg-emerald-100 text-emerald-700 hidden sm:flex">Admin</Badge>
            <div className="hidden sm:block">
              <Input
                placeholder="Cari..."
                className="h-9 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                3
              </span>
            </button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-4 lg:p-6 pb-24 lg:pb-6">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t bg-white dark:bg-gray-800 py-2 lg:hidden">
        {mobileAdminLinks.map((link) => {
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
          <Menu className="h-5 w-5" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white dark:bg-gray-800 p-6 space-y-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Menu Admin</h3>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {adminLinks.map((link) => (
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
          </div>
        </div>
      )}
    </div>
  );
}
