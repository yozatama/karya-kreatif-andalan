export interface DashboardStats {
  activeRentals: number;
  totalPayments: number;
  remainingDays: number;
  rating: number;
}

export interface ActiveRental {
  id: string;
  vehicleName: string;
  plate: string;
  remainingDays: number;
  totalDays: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  type: "payment" | "booking" | "maintenance" | "general";
}

export interface Booking {
  id: string;
  vehicleName: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status: "menunggu" | "disetujui" | "aktif" | "selesai" | "ditolak";
  totalCost: number;
  duration: string;
  createdAt: string;
}

export interface Rental {
  id: string;
  vehicleName: string;
  vehicleId: string;
  plate: string;
  startDate: string;
  endDate: string;
  status: "aktif" | "selesai" | "menunggu_kembali";
  remainingDays: number;
  monthlyRate: number;
  nextPayment: string;
}

export interface Payment {
  id: string;
  invoice: string;
  date: string;
  amount: number;
  method: string;
  status: "lunas" | "pending" | "gagal";
  description: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: "rendah" | "sedang" | "tinggi" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  lastReply: string;
}

export interface TicketMessage {
  id: string;
  sender: "user" | "admin";
  senderName: string;
  message: string;
  timestamp: string;
}

export const dashboardStats: DashboardStats = {
  activeRentals: 1,
  totalPayments: 15000000,
  remainingDays: 18,
  rating: 4.8,
};

export const activeRental: ActiveRental = {
  id: "r1",
  vehicleName: "Toyota Avanza 2022",
  plate: "B 1234 KKA",
  remainingDays: 18,
  totalDays: 30,
  nextPaymentDate: "2024-02-01",
  nextPaymentAmount: 5000000,
};

export const upcomingPayments: UpcomingPayment[] = [
  { id: "p1", description: "Rental Toyota Avanza - Februari", amount: 5000000, dueDate: "2024-02-01" },
  { id: "p2", description: "Rental Toyota Avanza - Maret", amount: 5000000, dueDate: "2024-03-01" },
  { id: "p3", description: "Deposit Tambahan", amount: 500000, dueDate: "2024-02-15" },
];

export const monthlyEarnings: MonthlyEarning[] = [
  { month: "Agu", amount: 8500000 },
  { month: "Sep", amount: 9200000 },
  { month: "Okt", amount: 7800000 },
  { month: "Nov", amount: 10100000 },
  { month: "Des", amount: 11500000 },
  { month: "Jan", amount: 9800000 },
];

export const recentActivity: ActivityItem[] = [
  { id: "a1", description: "Pembayaran rental bulan Januari berhasil", timestamp: "2024-01-15 10:30", type: "payment" },
  { id: "a2", description: "Kendaraan dijadwalkan service berkala", timestamp: "2024-01-14 08:00", type: "maintenance" },
  { id: "a3", description: "Booking baru disetujui", timestamp: "2024-01-12 14:20", type: "booking" },
  { id: "a4", description: "Dokumen verifikasi telah diverifikasi", timestamp: "2024-01-10 09:15", type: "general" },
  { id: "a5", description: "Perpanjangan rental dikonfirmasi", timestamp: "2024-01-08 16:45", type: "booking" },
];

export const bookings: Booking[] = [
  { id: "b1", vehicleName: "Toyota Avanza", vehicleId: "1", startDate: "2024-01-01", endDate: "2024-01-31", status: "aktif", totalCost: 5000000, duration: "1 bulan", createdAt: "2023-12-28" },
  { id: "b2", vehicleName: "Honda Brio", vehicleId: "2", startDate: "2024-02-01", endDate: "2024-02-28", status: "menunggu", totalCost: 4000000, duration: "1 bulan", createdAt: "2024-01-20" },
  { id: "b3", vehicleName: "Suzuki Ertiga", vehicleId: "5", startDate: "2023-11-01", endDate: "2023-11-30", status: "selesai", totalCost: 5500000, duration: "1 bulan", createdAt: "2023-10-25" },
  { id: "b4", vehicleName: "Daihatsu Sigra", vehicleId: "3", startDate: "2023-10-01", endDate: "2023-10-31", status: "selesai", totalCost: 4000000, duration: "1 bulan", createdAt: "2023-09-28" },
  { id: "b5", vehicleName: "Toyota Innova Reborn", vehicleId: "6", startDate: "2024-01-15", endDate: "2024-01-15", status: "ditolak", totalCost: 8000000, duration: "1 bulan", createdAt: "2024-01-10" },
];

export const rentals: Rental[] = [
  { id: "r1", vehicleName: "Toyota Avanza", vehicleId: "1", plate: "B 1234 KKA", startDate: "2024-01-01", endDate: "2024-01-31", status: "aktif", remainingDays: 18, monthlyRate: 5000000, nextPayment: "2024-02-01" },
  { id: "r2", vehicleName: "Suzuki Ertiga", vehicleId: "5", plate: "B 5678 KKA", startDate: "2023-11-01", endDate: "2023-11-30", status: "selesai", remainingDays: 0, monthlyRate: 5500000, nextPayment: "-" },
  { id: "r3", vehicleName: "Daihatsu Sigra", vehicleId: "3", plate: "B 9012 KKA", startDate: "2023-10-01", endDate: "2023-10-31", status: "selesai", remainingDays: 0, monthlyRate: 4000000, nextPayment: "-" },
];

export const payments: Payment[] = [
  { id: "pay1", invoice: "INV-2024-001", date: "2024-01-15", amount: 5000000, method: "Transfer BCA", status: "lunas", description: "Rental Toyota Avanza - Januari 2024" },
  { id: "pay2", invoice: "INV-2024-002", date: "2024-02-01", amount: 5000000, method: "GoPay", status: "pending", description: "Rental Toyota Avanza - Februari 2024" },
  { id: "pay3", invoice: "INV-2023-012", date: "2023-12-15", amount: 5500000, method: "Transfer Mandiri", status: "lunas", description: "Rental Suzuki Ertiga - Desember 2023" },
  { id: "pay4", invoice: "INV-2023-011", date: "2023-11-15", amount: 5500000, method: "OVO", status: "lunas", description: "Rental Suzuki Ertiga - November 2023" },
  { id: "pay5", invoice: "INV-2023-010", date: "2023-10-15", amount: 4000000, method: "Transfer BCA", status: "lunas", description: "Rental Daihatsu Sigra - Oktober 2023" },
  { id: "pay6", invoice: "INV-2023-009", date: "2023-09-20", amount: 2000000, method: "Dana", status: "gagal", description: "Deposit Toyota Avanza" },
];

export const supportTickets: SupportTicket[] = [
  { id: "t1", subject: "Masalah AC Mobil", category: "Kendaraan", priority: "tinggi", status: "in_progress", createdAt: "2024-01-14", lastReply: "2024-01-15" },
  { id: "t2", subject: "Perpanjangan Rental", category: "Rental", priority: "sedang", status: "resolved", createdAt: "2024-01-10", lastReply: "2024-01-11" },
  { id: "t3", subject: "Pembayaran Tidak Masuk", category: "Pembayaran", priority: "tinggi", status: "open", createdAt: "2024-01-13", lastReply: "2024-01-13" },
];

export const ticketMessages: TicketMessage[] = [
  { id: "m1", sender: "user", senderName: "Budi Santoso", message: "AC mobil Toyota Avanza saya tidak dingin sudah 2 hari. Mohon bantuannya.", timestamp: "2024-01-14 10:00" },
  { id: "m2", sender: "admin", senderName: "Admin Support", message: "Terima kasih laporannya, Pak Budi. Kami akan jadwalkan pengecekan AC hari ini. Apakah Bapak bisa bawa kendaraan ke bengkel partner kami di Jl. Gatot Subroto?", timestamp: "2024-01-14 10:30" },
  { id: "m3", sender: "user", senderName: "Budi Santoso", message: "Bisa, saya bisa antar besok pagi sekitar jam 9.", timestamp: "2024-01-14 11:00" },
  { id: "m4", sender: "admin", senderName: "Admin Support", message: "Baik, Pak Budi. Sudah kami jadwalkan untuk besok jam 9 pagi. Estimasi perbaikan 2-3 jam. Selama perbaikan, kami sediakan kendaraan pengganti. Terima kasih.", timestamp: "2024-01-15 08:00" },
];

// Admin Data
export interface AdminStats {
  totalRevenue: number;
  activeFleet: number;
  activeDrivers: number;
  monthlyBookings: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface FleetUtilization {
  name: string;
  value: number;
  color: string;
}

export interface MaintenanceAlert {
  id: string;
  vehicleName: string;
  plate: string;
  type: string;
  dueDate: string;
  priority: "rendah" | "sedang" | "tinggi";
}

export interface AdminBooking {
  id: string;
  driverName: string;
  vehicleName: string;
  startDate: string;
  status: "menunggu" | "disetujui" | "aktif" | "selesai" | "ditolak";
  totalCost: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  verified: boolean;
  verificationStatus: "belum" | "proses" | "terverifikasi" | "ditolak";
  joinDate: string;
  activeRentals: number;
}

export interface AdminVehicle {
  id: string;
  name: string;
  category: string;
  plate: string;
  status: "tersedia" | "disewakan" | "maintenance";
  dailyRate: number;
  driver?: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleName: string;
  plate: string;
  type: string;
  description: string;
  cost: number;
  date: string;
  nextMaintenance: string;
}

export interface PromoCode {
  id: string;
  code: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  usage: number;
  limit: number;
  validFrom: string;
  validTo: string;
  active: boolean;
}

export const adminStats: AdminStats = {
  totalRevenue: 450000000,
  activeFleet: 45,
  activeDrivers: 38,
  monthlyBookings: 12,
};

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: "Feb", revenue: 32000000 },
  { month: "Mar", revenue: 35000000 },
  { month: "Apr", revenue: 38000000 },
  { month: "Mei", revenue: 33000000 },
  { month: "Jun", revenue: 40000000 },
  { month: "Jul", revenue: 42000000 },
  { month: "Agu", revenue: 39000000 },
  { month: "Sep", revenue: 44000000 },
  { month: "Okt", revenue: 41000000 },
  { month: "Nov", revenue: 46000000 },
  { month: "Des", revenue: 50000000 },
  { month: "Jan", revenue: 48000000 },
];

export const fleetUtilization: FleetUtilization[] = [
  { name: "Disewakan", value: 38, color: "#10b981" },
  { name: "Tersedia", value: 5, color: "#3b82f6" },
  { name: "Maintenance", value: 2, color: "#f59e0b" },
];

export const maintenanceAlerts: MaintenanceAlert[] = [
  { id: "ma1", vehicleName: "Honda Brio", plate: "B 2345 KKA", type: "Service Berkala", dueDate: "2024-01-20", priority: "tinggi" },
  { id: "ma2", vehicleName: "Daihatsu Sigra", plate: "B 3456 KKA", type: "Ganti Ban", dueDate: "2024-01-25", priority: "sedang" },
  { id: "ma3", vehicleName: "Suzuki Ertiga", plate: "B 5678 KKA", type: "Service AC", dueDate: "2024-02-01", priority: "rendah" },
];

export const adminBookings: AdminBooking[] = [
  { id: "ab1", driverName: "Ahmad Rizki", vehicleName: "Honda Brio", startDate: "2024-01-20", status: "menunggu", totalCost: 4000000 },
  { id: "ab2", driverName: "Dewi Lestari", vehicleName: "Wuling Air EV", startDate: "2024-01-18", status: "menunggu", totalCost: 3500000 },
  { id: "ab3", driverName: "Budi Santoso", vehicleName: "Toyota Avanza", startDate: "2024-01-01", status: "aktif", totalCost: 5000000 },
  { id: "ab4", driverName: "Eko Prasetyo", vehicleName: "Suzuki Ertiga", startDate: "2024-01-15", status: "disetujui", totalCost: 5500000 },
  { id: "ab5", driverName: "Siti Nurhaliza", vehicleName: "Toyota Calya", startDate: "2023-12-20", status: "selesai", totalCost: 4500000 },
];

export const adminUsers: AdminUser[] = [
  { id: "u1", name: "Budi Santoso", email: "budi@email.com", phone: "081234567890", role: "user", verified: true, verificationStatus: "terverifikasi", joinDate: "2023-06-15", activeRentals: 1 },
  { id: "u2", name: "Ahmad Rizki", email: "ahmad@email.com", phone: "081234567891", role: "user", verified: true, verificationStatus: "terverifikasi", joinDate: "2023-08-20", activeRentals: 0 },
  { id: "u3", name: "Dewi Lestari", email: "dewi@email.com", phone: "081234567892", role: "user", verified: false, verificationStatus: "proses", joinDate: "2024-01-10", activeRentals: 0 },
  { id: "u4", name: "Eko Prasetyo", email: "eko@email.com", phone: "081234567893", role: "user", verified: true, verificationStatus: "terverifikasi", joinDate: "2023-09-01", activeRentals: 1 },
  { id: "u5", name: "Siti Nurhaliza", email: "siti@email.com", phone: "081234567894", role: "user", verified: false, verificationStatus: "ditolak", joinDate: "2024-01-05", activeRentals: 0 },
  { id: "u6", name: "Admin KKA", email: "admin@kka.co.id", phone: "081200000001", role: "admin", verified: true, verificationStatus: "terverifikasi", joinDate: "2023-01-01", activeRentals: 0 },
];

export const adminVehicles: AdminVehicle[] = [
  { id: "v1", name: "Toyota Avanza", category: "Mobil", plate: "B 1234 KKA", status: "disewakan", dailyRate: 250000, driver: "Budi Santoso" },
  { id: "v2", name: "Honda Brio", category: "Mobil", plate: "B 2345 KKA", status: "tersedia", dailyRate: 200000 },
  { id: "v3", name: "Daihatsu Sigra", category: "Mobil", plate: "B 3456 KKA", status: "tersedia", dailyRate: 200000 },
  { id: "v4", name: "Toyota Calya", category: "Mobil", plate: "B 4567 KKA", status: "disewakan", dailyRate: 220000, driver: "Siti Nurhaliza" },
  { id: "v5", name: "Suzuki Ertiga", category: "Mobil", plate: "B 5678 KKA", status: "disewakan", dailyRate: 280000, driver: "Eko Prasetyo" },
  { id: "v6", name: "Toyota Innova Reborn", category: "Mobil", plate: "B 6789 KKA", status: "maintenance", dailyRate: 400000 },
  { id: "v7", name: "Wuling Air EV", category: "Motor Listrik", plate: "B 7890 KKA", status: "tersedia", dailyRate: 180000 },
  { id: "v8", name: "Alva One", category: "Motor Listrik", plate: "B 8901 KKA", status: "disewakan", dailyRate: 150000, driver: "Agus Widodo" },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: "mr1", vehicleName: "Toyota Avanza", plate: "B 1234 KKA", type: "Service Berkala", description: "Ganti oli, filter udara, cek rem", cost: 850000, date: "2024-01-05", nextMaintenance: "2024-02-05" },
  { id: "mr2", vehicleName: "Honda Brio", plate: "B 2345 KKA", type: "Perbaikan", description: "Perbaikan AC dan ganti freon", cost: 1200000, date: "2024-01-10", nextMaintenance: "2024-04-10" },
  { id: "mr3", vehicleName: "Suzuki Ertiga", plate: "B 5678 KKA", type: "Service Berkala", description: "Ganti oli, tune up mesin", cost: 750000, date: "2023-12-20", nextMaintenance: "2024-01-20" },
  { id: "mr4", vehicleName: "Toyota Innova Reborn", plate: "B 6789 KKA", type: "Perbaikan", description: "Ganti kampas rem dan disc brake", cost: 2500000, date: "2024-01-12", nextMaintenance: "2024-07-12" },
];

export const promoCodes: PromoCode[] = [
  { id: "pr1", code: "NEWDRIVER2024", name: "Driver Baru 2024", discountType: "percentage", discountValue: 10, usage: 45, limit: 100, validFrom: "2024-01-01", validTo: "2024-03-31", active: true },
  { id: "pr2", code: "LOYALTY50", name: "Loyalty Member", discountType: "fixed", discountValue: 500000, usage: 12, limit: 50, validFrom: "2024-01-01", validTo: "2024-06-30", active: true },
  { id: "pr3", code: "EV2024", name: "Promo Motor Listrik", discountType: "percentage", discountValue: 15, usage: 30, limit: 30, validFrom: "2024-01-01", validTo: "2024-02-28", active: false },
];
