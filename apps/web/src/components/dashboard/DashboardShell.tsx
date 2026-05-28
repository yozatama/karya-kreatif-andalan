'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui.store';
import { useAuthStore } from '@/stores/auth.store';
import { useNotificationStore } from '@/stores/notifications.store';
import { currentUser, notifications as mockNotifications } from '@/lib/mock-dashboard-data';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Car,
  FileText,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  Settings,
  Menu,
  Bell,
  LogOut,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useEffect } from 'react';

const sidebarNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Sewa Kendaraan', href: '/bookings/new', icon: Car },
  { label: 'Rental Saya', href: '/rentals', icon: FileText },
  { label: 'Pembayaran', href: '/payments', icon: CreditCard },
  { label: 'Verifikasi', href: '/verification', icon: ShieldCheck },
  { label: 'Bantuan', href: '/support', icon: HelpCircle },
  { label: 'Pengaturan', href: '/profile', icon: Settings },
];

const mobileNavItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Sewa', href: '/bookings/new', icon: Car },
  { label: 'Rental', href: '/rentals', icon: FileText },
  { label: 'Bayar', href: '/payments', icon: CreditCard },
  { label: 'Menu', href: '#menu', icon: Menu },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { isAuthenticated, login } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Initialize mock auth state
  useEffect(() => {
    if (!isAuthenticated) {
      login(
        {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          phone: currentUser.phone,
          role: currentUser.role,
          avatarUrl: currentUser.avatarUrl,
          isVerified: currentUser.isVerified,
        },
        'mock-token',
      );
    }
  }, [isAuthenticated, login]);

  // Initialize notifications
  const { notifications, addNotification } = useNotificationStore();
  useEffect(() => {
    if (notifications.length === 0) {
      mockNotifications.forEach((n) => addNotification(n));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unread = unreadCount || mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r bg-card transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-16',
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center border-b px-4">
          {sidebarOpen ? (
            <Link href="/dashboard" className="font-bold text-primary text-lg">
              KKA
            </Link>
          ) : (
            <Link href="/dashboard" className="font-bold text-primary text-lg mx-auto">
              K
            </Link>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  !sidebarOpen && 'justify-center px-2',
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t p-4">
          <div className={cn('flex items-center gap-3', !sidebarOpen && 'justify-center')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              {currentUser.name.charAt(0)}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
              </div>
            )}
          </div>
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
              className="hidden lg:flex"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold hidden sm:block">
              {sidebarNavItems.find((item) => pathname === item.href || pathname.startsWith(item.href + '/'))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setNotifOpen(!notifOpen)}
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </Button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border bg-card shadow-lg z-50">
                  <div className="p-3 border-b font-medium text-sm">Notifikasi</div>
                  <div className="max-h-64 overflow-y-auto">
                    {mockNotifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          'px-3 py-2 border-b last:border-0 text-sm',
                          !n.read && 'bg-primary/5',
                        )}
                      >
                        <p className="font-medium text-xs">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User avatar */}
            <Link href="/profile">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                {currentUser.name.charAt(0)}
              </div>
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden border-t bg-card z-40">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            if (item.href === '#menu') {
              return (
                <button
                  key={item.href}
                  onClick={() => setMobileMenuOpen(true)}
                  className="flex flex-col items-center gap-0.5 px-2 py-1 text-muted-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            }
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-2 py-1',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-background">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <span className="font-bold text-primary text-lg">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-1">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-muted',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="border-t my-4" />
            <button className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-red-600 hover:bg-red-50 w-full">
              <LogOut className="h-5 w-5" />
              <span>Keluar</span>
            </button>
          </nav>
          <div className="absolute bottom-8 left-0 right-0 px-4">
            <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
