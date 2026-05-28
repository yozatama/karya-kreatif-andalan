import { type Notification } from '@/stores/notifications.store';

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string | null;
  isVerified: boolean;
  address: string;
  emergencyContact: { name: string; phone: string };
  joinedDate: string;
}

export interface ActiveRental {
  id: string;
  vehicle: string;
  vehicleImage: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  daysUsed: number;
  daysRemaining: number;
  nextPayment: { amount: number; dueDate: string };
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  monthlyRate: number;
}

export interface RentalHistory {
  id: string;
  vehicle: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'cancelled' | 'active';
  totalPaid: number;
}

export interface UpcomingPayment {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue';
}

export interface Booking {
  id: string;
  vehicle: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  duration: string;
  totalAmount: number;
  deposit: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  pickupLocation: string;
}

export interface Payment {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: 'paid' | 'pending' | 'overdue';
  invoiceUrl: string | null;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Kendaraan' | 'Pembayaran' | 'Akun' | 'Lainnya';
  priority: 'normal' | 'urgent';
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  lastMessage: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'admin';
  message: string;
  timestamp: string;
}

export interface CheckpointRecord {
  id: string;
  bookingId: string;
  vehicle: string;
  date: string;
  type: 'pickup' | 'return' | 'periodic';
  status: 'completed' | 'pending';
  odometerReading: number;
  fuelLevel: string;
}

export const currentUser: DashboardUser = {
  id: 'u1',
  name: 'Budi Santoso',
  email: 'budi.santoso@email.com',
  phone: '081234567890',
  role: 'driver',
  avatarUrl: null,
  isVerified: true,
  address: 'Jl. Sudirman No. 45, Jakarta Selatan',
  emergencyContact: { name: 'Siti Rahayu', phone: '081298765432' },
  joinedDate: '2024-01-15',
};

export const activeRental: ActiveRental = {
  id: 'r1',
  vehicle: 'Toyota Avanza',
  vehicleImage: '/images/vehicles/avanza.jpg',
  startDate: '2024-11-01',
  endDate: '2024-11-30',
  totalDays: 30,
  daysUsed: 12,
  daysRemaining: 18,
  nextPayment: { amount: 3500000, dueDate: '2024-11-25' },
  status: 'active',
  monthlyRate: 4000000,
};

export const rentalHistory: RentalHistory[] = [
  { id: 'rh1', vehicle: 'Honda Brio', startDate: '2024-09-01', endDate: '2024-09-30', status: 'completed', totalPaid: 3600000 },
  { id: 'rh2', vehicle: 'Daihatsu Sigra', startDate: '2024-08-01', endDate: '2024-08-31', status: 'completed', totalPaid: 3500000 },
  { id: 'rh3', vehicle: 'Toyota Calya', startDate: '2024-07-01', endDate: '2024-07-31', status: 'completed', totalPaid: 3300000 },
  { id: 'rh4', vehicle: 'Suzuki Ertiga', startDate: '2024-06-15', endDate: '2024-06-30', status: 'cancelled', totalPaid: 2200000 },
  { id: 'rh5', vehicle: 'Honda Mobilio', startDate: '2024-05-01', endDate: '2024-05-31', status: 'completed', totalPaid: 3800000 },
];

export const upcomingPayments: UpcomingPayment[] = [
  { id: 'up1', description: 'Sewa Bulanan - Toyota Avanza', amount: 3500000, dueDate: '2024-11-25', status: 'pending' },
  { id: 'up2', description: 'Sewa Bulanan - Desember', amount: 4000000, dueDate: '2024-12-01', status: 'pending' },
  { id: 'up3', description: 'Denda Keterlambatan', amount: 150000, dueDate: '2024-11-20', status: 'overdue' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'booking', title: 'Booking Dikonfirmasi', message: 'Booking Toyota Avanza Anda telah dikonfirmasi oleh admin.', timestamp: '2024-11-12T10:30:00', read: false },
  { id: 'n2', type: 'payment', title: 'Pembayaran Berhasil', message: 'Pembayaran sebesar Rp 4.000.000 telah diterima.', timestamp: '2024-11-11T14:00:00', read: false },
  { id: 'n3', type: 'payment', title: 'Pengingat Pembayaran', message: 'Pembayaran berikutnya jatuh tempo pada 25 November 2024.', timestamp: '2024-11-10T09:00:00', read: false },
  { id: 'n4', type: 'rental', title: 'Rental Aktif', message: 'Rental Toyota Avanza Anda telah dimulai. Selamat mengemudi!', timestamp: '2024-11-01T08:00:00', read: true },
  { id: 'n5', type: 'system', title: 'Verifikasi Berhasil', message: 'Dokumen Anda telah diverifikasi. Anda dapat mulai menyewa kendaraan.', timestamp: '2024-10-28T16:00:00', read: true },
  { id: 'n6', type: 'promo', title: 'Promo Akhir Tahun', message: 'Diskon 15% untuk perpanjangan sewa di bulan Desember!', timestamp: '2024-10-25T12:00:00', read: true },
  { id: 'n7', type: 'rental', title: 'Checkpoint Selesai', message: 'Checkpoint kendaraan Anda telah dicatat. Terima kasih.', timestamp: '2024-10-20T10:00:00', read: true },
  { id: 'n8', type: 'system', title: 'Pembaruan Aplikasi', message: 'Fitur baru tersedia! Lihat halaman support untuk bantuan.', timestamp: '2024-10-15T08:00:00', read: true },
];

export const bookings: Booking[] = [
  { id: 'b1', vehicle: 'Toyota Avanza', vehicleId: 'v1', startDate: '2024-11-01', endDate: '2024-11-30', duration: 'Bulanan', totalAmount: 4000000, deposit: 1000000, status: 'active', createdAt: '2024-10-28', pickupLocation: 'Kantor KKA Jakarta Selatan' },
  { id: 'b2', vehicle: 'Honda Brio', vehicleId: 'v2', startDate: '2024-12-01', endDate: '2024-12-31', duration: 'Bulanan', totalAmount: 3600000, deposit: 1000000, status: 'confirmed', createdAt: '2024-11-10', pickupLocation: 'Kantor KKA Jakarta Selatan' },
  { id: 'b3', vehicle: 'Daihatsu Sigra', vehicleId: 'v3', startDate: '2024-09-01', endDate: '2024-09-30', duration: 'Bulanan', totalAmount: 3500000, deposit: 1000000, status: 'completed', createdAt: '2024-08-25', pickupLocation: 'Kantor KKA Tangerang' },
  { id: 'b4', vehicle: 'Toyota Calya', vehicleId: 'v4', startDate: '2024-08-01', endDate: '2024-08-31', duration: 'Bulanan', totalAmount: 3300000, deposit: 1000000, status: 'completed', createdAt: '2024-07-28', pickupLocation: 'Kantor KKA Jakarta Selatan' },
  { id: 'b5', vehicle: 'Alva One', vehicleId: 'v8', startDate: '2024-07-15', endDate: '2024-07-21', duration: 'Mingguan', totalAmount: 300000, deposit: 500000, status: 'completed', createdAt: '2024-07-12', pickupLocation: 'Kantor KKA Depok' },
  { id: 'b6', vehicle: 'Suzuki Ertiga', vehicleId: 'v5', startDate: '2024-06-15', endDate: '2024-06-30', duration: 'Mingguan', totalAmount: 2640000, deposit: 1000000, status: 'cancelled', createdAt: '2024-06-10', pickupLocation: 'Kantor KKA Jakarta Selatan' },
  { id: 'b7', vehicle: 'Honda Mobilio', vehicleId: 'v6', startDate: '2025-01-01', endDate: '2025-01-31', duration: 'Bulanan', totalAmount: 3800000, deposit: 1000000, status: 'pending', createdAt: '2024-11-12', pickupLocation: 'Kantor KKA Bekasi' },
];

export const payments: Payment[] = [
  { id: 'p1', date: '2024-11-01', description: 'Sewa Bulanan - Toyota Avanza (Nov)', amount: 4000000, method: 'Virtual Account BCA', status: 'paid', invoiceUrl: '#' },
  { id: 'p2', date: '2024-11-01', description: 'Deposit - Toyota Avanza', amount: 1000000, method: 'Virtual Account BCA', status: 'paid', invoiceUrl: '#' },
  { id: 'p3', date: '2024-10-01', description: 'Sewa Bulanan - Honda Brio (Sep)', amount: 3600000, method: 'GoPay', status: 'paid', invoiceUrl: '#' },
  { id: 'p4', date: '2024-09-01', description: 'Sewa Bulanan - Daihatsu Sigra (Ags)', amount: 3500000, method: 'QRIS', status: 'paid', invoiceUrl: '#' },
  { id: 'p5', date: '2024-08-01', description: 'Sewa Bulanan - Toyota Calya (Jul)', amount: 3300000, method: 'Virtual Account BNI', status: 'paid', invoiceUrl: '#' },
  { id: 'p6', date: '2024-07-15', description: 'Sewa Mingguan - Alva One', amount: 300000, method: 'OVO', status: 'paid', invoiceUrl: '#' },
  { id: 'p7', date: '2024-07-15', description: 'Deposit - Alva One', amount: 500000, method: 'OVO', status: 'paid', invoiceUrl: '#' },
  { id: 'p8', date: '2024-11-25', description: 'Sewa Bulanan - Toyota Avanza (Des)', amount: 3500000, method: '-', status: 'pending', invoiceUrl: null },
  { id: 'p9', date: '2024-11-20', description: 'Denda Keterlambatan', amount: 150000, method: '-', status: 'overdue', invoiceUrl: null },
  { id: 'p10', date: '2024-12-01', description: 'Sewa Bulanan - Jan 2025', amount: 4000000, method: '-', status: 'pending', invoiceUrl: null },
];

export const supportTickets: SupportTicket[] = [
  {
    id: 'st1',
    subject: 'AC mobil kurang dingin',
    category: 'Kendaraan',
    priority: 'normal',
    status: 'in_progress',
    createdAt: '2024-11-10',
    lastMessage: 'Tim kami akan datang besok untuk pengecekan.',
    messages: [
      { id: 'm1', sender: 'user', message: 'Selamat siang, AC mobil Avanza saya kurang dingin sejak kemarin. Mohon bantuan.', timestamp: '2024-11-10T10:00:00' },
      { id: 'm2', sender: 'admin', message: 'Baik Pak Budi, kami akan kirim teknisi untuk pengecekan. Apakah besok pagi bisa?', timestamp: '2024-11-10T10:30:00' },
      { id: 'm3', sender: 'user', message: 'Bisa, saya standby di lokasi mulai jam 8 pagi.', timestamp: '2024-11-10T11:00:00' },
      { id: 'm4', sender: 'admin', message: 'Tim kami akan datang besok untuk pengecekan.', timestamp: '2024-11-10T11:15:00' },
    ],
  },
  {
    id: 'st2',
    subject: 'Konfirmasi pembayaran belum masuk',
    category: 'Pembayaran',
    priority: 'urgent',
    status: 'open',
    createdAt: '2024-11-12',
    lastMessage: 'Sudah transfer via BCA tapi belum terkonfirmasi.',
    messages: [
      { id: 'm5', sender: 'user', message: 'Sudah transfer via BCA tapi belum terkonfirmasi. Ini bukti transfernya.', timestamp: '2024-11-12T14:00:00' },
    ],
  },
  {
    id: 'st3',
    subject: 'Cara perpanjang masa sewa',
    category: 'Lainnya',
    priority: 'normal',
    status: 'closed',
    createdAt: '2024-10-20',
    lastMessage: 'Terima kasih, sudah saya perpanjang.',
    messages: [
      { id: 'm6', sender: 'user', message: 'Bagaimana cara perpanjang masa sewa? Saya ingin lanjut bulan depan.', timestamp: '2024-10-20T09:00:00' },
      { id: 'm7', sender: 'admin', message: 'Bisa langsung dari menu Rental > Perpanjang. Atau hubungi kami via WhatsApp.', timestamp: '2024-10-20T09:30:00' },
      { id: 'm8', sender: 'user', message: 'Terima kasih, sudah saya perpanjang.', timestamp: '2024-10-20T10:00:00' },
    ],
  },
];

export const checkpointRecords: CheckpointRecord[] = [
  { id: 'cp1', bookingId: 'b1', vehicle: 'Toyota Avanza', date: '2024-11-01', type: 'pickup', status: 'completed', odometerReading: 35000, fuelLevel: 'full' },
  { id: 'cp2', bookingId: 'b3', vehicle: 'Daihatsu Sigra', date: '2024-09-01', type: 'pickup', status: 'completed', odometerReading: 40000, fuelLevel: '3/4' },
  { id: 'cp3', bookingId: 'b3', vehicle: 'Daihatsu Sigra', date: '2024-09-30', type: 'return', status: 'completed', odometerReading: 42500, fuelLevel: '1/2' },
];

export const earningsData = [
  { day: 'Sen', earnings: 350000 },
  { day: 'Sel', earnings: 420000 },
  { day: 'Rab', earnings: 380000 },
  { day: 'Kam', earnings: 450000 },
  { day: 'Jum', earnings: 520000 },
  { day: 'Sab', earnings: 600000 },
  { day: 'Min', earnings: 480000 },
];
