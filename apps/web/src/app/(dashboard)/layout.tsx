"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Car,
  CreditCard,
  ShieldCheck,
  Headphones,
  User,
  Menu,
  X,
  Search,
  Bell,
  ChevronRight,
  Home,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useNotificationStore } from "@/stores/notification-store";
import { useAuthStore } from "@/stores/auth-store";
import { Sheet } from "@/components/ui/sheet";

const navItems = [
  {
    section: "Menu Utama",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Booking", href: "/bookings", icon: CalendarCheck },
      { label: "Rental Saya", href: "/rentals", icon: Car },
      { label: "Pembayaran", href: "/payments", icon: CreditCard },
    ],
  },
  {
    section: "Lainnya",
    items: [
      { label: "Verifikasi", href: "/verification", icon: ShieldCheck },
      { label: "Support", href: "/support", icon: Headphones },
      { label: "Profil", href: "/profile", icon: User },
    ],
  },
];

const mobileNavItems = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Booking", href: "/bookings", icon: CalendarCheck },
  { label: "Rental", href: "/rentals", icon: Car },
  { label: "Bayar", href: "/payments", icon: CreditCard },
  { label: "Profil", href: "/profile", icon: User },
];

function Sidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Car className="h-8 w-8 text-emerald-600 shrink-0" />
          {!collapsed && (
            <span className="text-lg font-bold text-navy-800">KKA</span>
          )}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-navy-400 uppercase tracking-wider">
                {section.section}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "text-navy-600 hover:bg-gray-100 hover:text-navy-800"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-emerald-600")} />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { label: string; href: string }[] = [];
  let path = "";
  const labelMap: Record<string, string> = {
    dashboard: "Dashboard",
    bookings: "Booking",
    rentals: "Rental",
    payments: "Pembayaran",
    verification: "Verifikasi",
    support: "Support",
    profile: "Profil",
    checkpoint: "Checkpoint",
    new: "Baru",
  };
  for (const segment of segments) {
    path += `/${segment}`;
    breadcrumbs.push({ label: labelMap[segment] || segment, href: path });
  }
  return breadcrumbs;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const { unreadCount } = useNotificationStore();
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 hidden lg:block",
          isCollapsed ? "w-20" : "w-[280px]"
        )}
      >
        <Sidebar collapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen} side="left">
        <div className="w-full h-full">
          <Sidebar collapsed={false} />
        </div>
      </Sheet>

      {/* Main Content */}
      <div className={cn("transition-all duration-300 lg:ml-[280px]", isCollapsed && "lg:ml-20")}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileOpen(true);
                } else {
                  toggle();
                }
              }}
              className="p-2 rounded-lg hover:bg-gray-100 text-navy-600"
            >
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden md:flex items-center text-sm text-navy-500">
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={crumb.href}>
                  {i > 0 && <ChevronRight className="h-3.5 w-3.5 mx-1.5" />}
                  <Link href={crumb.href} className="hover:text-navy-800">
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-navy-400" />
              <input
                type="text"
                placeholder="Cari..."
                className="bg-transparent border-none outline-none ml-2 text-sm text-navy-700 w-40"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-navy-600">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-navy-800">{user?.name || "User"}</p>
                <p className="text-xs text-navy-400">{user?.role === "admin" ? "Admin" : "Driver"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 max-w-7xl mx-auto pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
        <div className="flex items-center justify-around h-16">
          {mobileNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2",
                  isActive ? "text-emerald-600" : "text-navy-400"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
