'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  Bell,
  Search,
  ChevronLeft,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { type AdminRole, getNavForRole, roleLabels } from '@/lib/admin-nav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<AdminRole>('super_admin');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navSections = getNavForRole(currentRole);

  const getBreadcrumb = () => {
    const parts = pathname.split('/').filter(Boolean);
    return parts.map((part, i) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: '/' + parts.slice(0, i + 1).join('/'),
    }));
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16',
        )}
      >
        <div className="flex h-14 items-center border-b px-4 gap-2">
          {sidebarOpen ? (
            <>
              <Link href="/admin" className="font-bold text-emerald-600 text-lg">
                KKA
              </Link>
              <Badge variant="secondary" className="text-[10px]">Admin</Badge>
            </>
          ) : (
            <Link href="/admin" className="font-bold text-emerald-600 text-lg mx-auto">
              K
            </Link>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
          {navSections.map((section) => (
            <div key={section.title}>
              {sidebarOpen && (
                <p className="px-3 mb-1 text-[10px] font-semibold text-muted-foreground tracking-wider">
                  {section.title}
                </p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href.split('?')[0]) && item.href !== '/admin';
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 font-medium border-l-2 border-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                        !sidebarOpen && 'justify-center px-2',
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {sidebarOpen && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform', !sidebarOpen && 'rotate-180')} />
            {sidebarOpen && <span className="ml-2 text-xs">Tutup Sidebar</span>}
          </Button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="flex h-14 items-center justify-between border-b bg-card px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  {i > 0 && <span>/</span>}
                  <Link href={crumb.href} className="hover:text-foreground capitalize">
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center relative max-w-sm w-64">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari... (Ctrl+K)"
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Role switcher */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              >
                {roleLabels[currentRole]}
                <ChevronDown className="h-3 w-3" />
              </Button>
              {roleDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-card shadow-lg z-50">
                  {(Object.entries(roleLabels) as [AdminRole, string][]).map(([role, label]) => (
                    <button
                      key={role}
                      className={cn(
                        'block w-full text-left px-3 py-2 text-sm hover:bg-muted',
                        currentRole === role && 'bg-emerald-50 text-emerald-700',
                      )}
                      onClick={() => {
                        setCurrentRole(role);
                        setRoleDropdownOpen(false);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification bell */}
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setNotifOpen(!notifOpen)}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </span>
              </Button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-lg border bg-card shadow-lg z-50">
                  <div className="p-3 border-b font-medium text-sm">Notifikasi</div>
                  <div className="p-2 text-sm text-muted-foreground">
                    <div className="px-2 py-1.5 hover:bg-muted rounded">Booking baru menunggu persetujuan</div>
                    <div className="px-2 py-1.5 hover:bg-muted rounded">Pembayaran overdue: 3 driver</div>
                    <div className="px-2 py-1.5 hover:bg-muted rounded">Kendaraan perlu servis: 2 unit</div>
                  </div>
                </div>
              )}
            </div>

            {/* Admin user */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-72 bg-card overflow-y-auto">
            <div className="flex h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-600 text-lg">KKA</span>
                <Badge variant="secondary" className="text-[10px]">Admin</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="py-4 px-2 space-y-4">
              {navSections.map((section) => (
                <div key={section.title}>
                  <p className="px-3 mb-1 text-[10px] font-semibold text-muted-foreground tracking-wider">
                    {section.title}
                  </p>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const isActive = item.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.href.split('?')[0]) && item.href !== '/admin';
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 font-medium dark:bg-emerald-900/20 dark:text-emerald-400'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div className="border-t p-4">
              <button className="flex items-center gap-3 text-sm text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
