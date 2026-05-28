import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  FileBarChart,
  Wrench,
  History,
  Tag,
  Gift,
  FileText,
  HelpCircle,
  Image,
  Headphones,
  LucideIcon,
} from 'lucide-react';

export type AdminRole = 'super_admin' | 'operational' | 'finance' | 'maintenance';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: AdminRole[];
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

export const adminNavSections: AdminNavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, roles: ['super_admin', 'operational', 'finance', 'maintenance'] },
    ],
  },
  {
    title: 'OPERASIONAL',
    items: [
      { label: 'Armada', href: '/admin/fleet', icon: Car, roles: ['super_admin', 'operational'] },
      { label: 'Booking', href: '/admin/bookings', icon: CalendarCheck, roles: ['super_admin', 'operational'] },
      { label: 'Pengguna', href: '/admin/users', icon: Users, roles: ['super_admin', 'operational'] },
      { label: 'Verifikasi', href: '/admin/users?tab=verification', icon: ShieldCheck, roles: ['super_admin', 'operational'] },
    ],
  },
  {
    title: 'KEUANGAN',
    items: [
      { label: 'Pembayaran', href: '/admin/finance', icon: CreditCard, roles: ['super_admin', 'finance'] },
      { label: 'Penalti', href: '/admin/finance?tab=penalti', icon: AlertTriangle, roles: ['super_admin', 'finance'] },
      { label: 'Laporan', href: '/admin/reports', icon: FileBarChart, roles: ['super_admin', 'finance'] },
    ],
  },
  {
    title: 'MAINTENANCE',
    items: [
      { label: 'Jadwal Servis', href: '/admin/maintenance', icon: Wrench, roles: ['super_admin', 'maintenance'] },
      { label: 'Riwayat Perbaikan', href: '/admin/maintenance?tab=history', icon: History, roles: ['super_admin', 'maintenance'] },
    ],
  },
  {
    title: 'MARKETING',
    items: [
      { label: 'Promo', href: '/admin/promos', icon: Tag, roles: ['super_admin'] },
      { label: 'Referral', href: '/admin/promos?tab=referral', icon: Gift, roles: ['super_admin'] },
    ],
  },
  {
    title: 'KONTEN',
    items: [
      { label: 'Blog', href: '/admin/cms', icon: FileText, roles: ['super_admin'] },
      { label: 'FAQ', href: '/admin/cms?tab=faq', icon: HelpCircle, roles: ['super_admin'] },
      { label: 'Banner', href: '/admin/cms?tab=banner', icon: Image, roles: ['super_admin'] },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { label: 'Tiket', href: '/admin/support', icon: Headphones, roles: ['super_admin', 'operational'] },
    ],
  },
];

export function getNavForRole(role: AdminRole): AdminNavSection[] {
  return adminNavSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((section) => section.items.length > 0);
}

export const roleLabels: Record<AdminRole, string> = {
  super_admin: 'Super Admin',
  operational: 'Admin Operasional',
  finance: 'Admin Keuangan',
  maintenance: 'Tim Maintenance',
};
