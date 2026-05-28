"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  CreditCard,
  AlertTriangle,
  Wrench,
  Tag,
  Headphones,
  FileText,
  BarChart3,
  Menu,
  Search,
  Bell,
  User,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useNotificationStore } from "@/stores/notification-store";
import { Sheet } from "@/components/ui/sheet";

const adminNavItems = [
  {
    section: "Utama",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Armada", href: "/admin/fleet", icon: Car },
      { label: "Booking", href: "/admin/bookings", icon: CalendarCheck },
      { label: "Pengguna", href: "/admin/users", icon: Users },
    ],
  },
  {
    section: "Keuangan",
    items: [
      { label: "Pembayaran", href: "/admin/finance", icon: CreditCard },
      { label: "Penalti", href: "/admin/finance/penalties", icon: AlertTriangle },
    ],
  },
  {
    section: "Operasional",
    items: [
      { label: "Maintenance", href: "/admin/maintenance", icon: Wrench },
      { label: "Promo", href: "/admin/promos", icon: Tag },
      { label: "Support", href: "/admin/support", icon: Headphones },
    ],
  },
  {
    section: "Konten",
    items: [
      { label: "CMS", href: "/admin/cms", icon: FileText },
      { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
    ],
  },
];

function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-navy-700">
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-emerald-400 shrink-0" />
          {!collapsed && (
            <div>
              <span className="text-lg font-bold text-white">KKA Admin</span>
              <span className="ml-2 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-medium">ADMIN</span>
            </div>
          )}
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {adminNavItems.map((section) => (
          <div key={section.section}>
            {!collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold text-navy-400 uppercase tracking-wider">
                {section.section}
              </p>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href + "/"));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-navy-700 text-emerald-400"
                          : "text-navy-300 hover:bg-navy-700 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-emerald-400")} />
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
    admin: "Admin",
    dashboard: "Dashboard",
    fleet: "Armada",
    bookings: "Booking",
    users: "Pengguna",
    finance: "Keuangan",
    maintenance: "Maintenance",
    promos: "Promo",
    cms: "CMS",
    reports: "Laporan",
    penalties: "Penalti",
    payments: "Pembayaran",
    blog: "Blog",
    support: "Support",
    new: "Baru",
    edit: "Edit",
  };
  for (const segment of segments) {
    path += `/${segment}`;
    breadcrumbs.push({ label: labelMap[segment] || segment, href: path });
  }
  return breadcrumbs;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobileOpen, toggle, setMobileOpen } = useSidebarStore();
  const { unreadCount } = useNotificationStore();
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-navy-900 border-r border-navy-700 transition-all duration-300 hidden lg:block",
          isCollapsed ? "w-20" : "w-[280px]"
        )}
      >
        <AdminSidebar collapsed={isCollapsed} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setMobileOpen} side="left">
        <div className="w-full h-full bg-navy-900">
          <AdminSidebar collapsed={false} />
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
              <input type="text" placeholder="Cari..." className="bg-transparent border-none outline-none ml-2 text-sm text-navy-700 w-40" />
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
              <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-navy-700" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-navy-800">Admin KKA</p>
                <p className="text-xs text-navy-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
