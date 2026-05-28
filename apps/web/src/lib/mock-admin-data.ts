export interface DashboardStats {
  totalRevenue: number;
  activeRentals: number;
  pendingBookings: number;
  fleetUtilization: number;
  totalDrivers: number;
  totalVehicles: number;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  bookings: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  expenses: number;
}

export interface FleetStatus {
  available: number;
  rented: number;
  maintenance: number;
  inactive: number;
}

export interface AdminBooking {
  id: string;
  driverName: string;
  vehicleName: string;
  startDate: string;
  endDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
}

export interface AdminVehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: 'mobil' | 'motor-listrik';
  transmission: 'manual' | 'otomatis';
  fuelType: string;
  seats: number;
  priceDaily: number;
  priceWeekly: number;
  priceMonthly: number;
  year: number;
  plateNumber: string;
  color: string;
  status: 'tersedia' | 'disewa' | 'maintenance' | 'nonaktif';
  utilization: number;
  revenueEarned: number;
  lastMaintenance: string;
  features: string[];
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  verificationStatus: 'verified' | 'pending' | 'rejected';
  totalRentals: number;
  joinDate: string;
  status: 'active' | 'suspended' | 'banned';
  fraudFlag: boolean;
}

export interface PendingVerification {
  id: string;
  name: string;
  email: string;
  submittedDate: string;
  documents: { ktp: boolean; sim: boolean; selfie: boolean };
}

export interface PaymentRecord {
  id: string;
  date: string;
  driverName: string;
  bookingId: string;
  amount: number;
  method: string;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
}

export interface MaintenanceRecord {
  id: string;
  vehicleName: string;
  type: string;
  description: string;
  cost: number;
  date: string;
  technician: string;
  nextService: string;
}

export interface PromoItem {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  validFrom: string;
  validUntil: string;
  used: number;
  maxUses: number;
  status: 'active' | 'expired';
  target: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: 'draft' | 'published';
  date: string;
}

export interface BannerItem {
  id: string;
  title: string;
  position: 'hero' | 'sidebar' | 'footer';
  active: boolean;
  startDate: string;
  endDate: string;
  linkUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'inactive';
}


export const dashboardStats: DashboardStats = {
  totalRevenue: 450000000,
  activeRentals: 45,
  pendingBookings: 12,
  fleetUtilization: 78,
  totalDrivers: 156,
  totalVehicles: 52,
};

export const revenueData: RevenueDataPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    revenue: Math.floor(Math.random() * 10000000) + 10000000,
    bookings: Math.floor(Math.random() * 10) + 5,
  };
});

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 350000000, expenses: 120000000 },
  { month: 'Feb', revenue: 380000000, expenses: 130000000 },
  { month: 'Mar', revenue: 420000000, expenses: 140000000 },
  { month: 'Apr', revenue: 390000000, expenses: 125000000 },
  { month: 'Mei', revenue: 410000000, expenses: 135000000 },
  { month: 'Jun', revenue: 450000000, expenses: 145000000 },
  { month: 'Jul', revenue: 470000000, expenses: 150000000 },
  { month: 'Agu', revenue: 430000000, expenses: 140000000 },
  { month: 'Sep', revenue: 460000000, expenses: 148000000 },
  { month: 'Okt', revenue: 480000000, expenses: 155000000 },
  { month: 'Nov', revenue: 500000000, expenses: 160000000 },
  { month: 'Des', revenue: 520000000, expenses: 170000000 },
];

export const fleetStatus: FleetStatus = {
  available: 30,
  rented: 45,
  maintenance: 7,
  inactive: 3,
};

const driverNames = ['Budi Santoso', 'Ahmad Rizki', 'Dewi Rahayu', 'Hendra Wijaya', 'Siti Nurhaliza', 'Rudi Hermawan', 'Agus Pratama', 'Dian Sari', 'Eko Prasetyo', 'Fitri Handayani', 'Gunawan Setiadi', 'Hari Susanto', 'Indra Lesmana', 'Joko Widodo', 'Kartini Putri', 'Lukman Hakim', 'Maya Sari', 'Nana Supriatna', 'Oki Setiawan', 'Putra Ramadhan'];

const vehicleNames = ['Toyota Avanza', 'Honda Brio', 'Daihatsu Sigra', 'Toyota Calya', 'Suzuki Ertiga', 'Honda Mobilio', 'Toyota Agya', 'Alva One', 'Gesits Raya', 'Volta 401', 'Mitsubishi Xpander', 'Nissan Livina', 'Toyota Innova', 'Wuling Air EV', 'Hyundai Stargazer'];

export const recentBookings: AdminBooking[] = Array.from({ length: 20 }, (_, i) => {
  const statuses: AdminBooking['status'][] = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 7);
  return {
    id: `BK-${String(i + 1).padStart(4, '0')}`,
    driverName: driverNames[i % driverNames.length],
    vehicleName: vehicleNames[i % vehicleNames.length],
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    amount: (Math.floor(Math.random() * 5) + 3) * 1000000,
    status: statuses[i % statuses.length],
  };
});

export const allVehicles: AdminVehicle[] = [
  { id: 'v1', name: 'Toyota Avanza', brand: 'Toyota', model: 'Avanza 1.3 E MT', category: 'mobil', transmission: 'manual', fuelType: 'Bensin', seats: 7, priceDaily: 200000, priceWeekly: 1200000, priceMonthly: 4000000, year: 2022, plateNumber: 'B 1234 ABC', color: 'Putih', status: 'disewa', utilization: 85, revenueEarned: 48000000, lastMaintenance: '2024-12-01', features: ['AC Double Blower', 'Power Steering', 'Bluetooth Audio'], description: 'Toyota Avanza 1.3 E MT cocok untuk driver online.' },
  { id: 'v2', name: 'Honda Brio', brand: 'Honda', model: 'Brio Satya E CVT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 5, priceDaily: 180000, priceWeekly: 1080000, priceMonthly: 3600000, year: 2023, plateNumber: 'B 2345 DEF', color: 'Merah', status: 'tersedia', utilization: 72, revenueEarned: 36000000, lastMaintenance: '2024-11-15', features: ['AC Digital', 'Transmisi CVT', 'Eco Mode'], description: 'Honda Brio Satya sangat irit bahan bakar.' },
  { id: 'v3', name: 'Daihatsu Sigra', brand: 'Daihatsu', model: 'Sigra 1.2 R AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 175000, priceWeekly: 1050000, priceMonthly: 3500000, year: 2022, plateNumber: 'B 3456 GHI', color: 'Silver', status: 'disewa', utilization: 80, revenueEarned: 42000000, lastMaintenance: '2024-11-20', features: ['AC Double Blower', 'Rear Parking Camera'], description: 'Daihatsu Sigra ruang kabin luas.' },
  { id: 'v4', name: 'Toyota Calya', brand: 'Toyota', model: 'Calya 1.2 G MT', category: 'mobil', transmission: 'manual', fuelType: 'Bensin', seats: 7, priceDaily: 165000, priceWeekly: 990000, priceMonthly: 3300000, year: 2021, plateNumber: 'B 4567 JKL', color: 'Hitam', status: 'tersedia', utilization: 65, revenueEarned: 30000000, lastMaintenance: '2024-10-30', features: ['AC', 'Power Window', 'Central Lock'], description: 'Toyota Calya harga terjangkau.' },
  { id: 'v5', name: 'Suzuki Ertiga', brand: 'Suzuki', model: 'Ertiga GX AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 220000, priceWeekly: 1320000, priceMonthly: 4400000, year: 2023, plateNumber: 'B 5678 MNO', color: 'Abu-abu', status: 'disewa', utilization: 90, revenueEarned: 55000000, lastMaintenance: '2024-12-05', features: ['AC Auto', 'Cruise Control', 'Push Start'], description: 'Suzuki Ertiga GX kenyamanan premium.' },
  { id: 'v6', name: 'Honda Mobilio', brand: 'Honda', model: 'Mobilio E CVT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 190000, priceWeekly: 1140000, priceMonthly: 3800000, year: 2022, plateNumber: 'B 6789 PQR', color: 'Biru', status: 'maintenance', utilization: 55, revenueEarned: 28000000, lastMaintenance: '2025-01-02', features: ['AC Digital', 'Eco Mode', 'Sliding Door'], description: 'Honda Mobilio pintu geser.' },
  { id: 'v7', name: 'Toyota Agya', brand: 'Toyota', model: 'Agya 1.2 G AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 5, priceDaily: 150000, priceWeekly: 900000, priceMonthly: 3000000, year: 2023, plateNumber: 'B 7890 STU', color: 'Kuning', status: 'tersedia', utilization: 70, revenueEarned: 32000000, lastMaintenance: '2024-11-10', features: ['AC', 'Transmisi Otomatis', 'Audio Bluetooth'], description: 'Toyota Agya pilihan terhemat.' },
  { id: 'v8', name: 'Alva One', brand: 'Alva', model: 'Alva One', category: 'motor-listrik', transmission: 'otomatis', fuelType: 'Listrik', seats: 2, priceDaily: 50000, priceWeekly: 300000, priceMonthly: 1000000, year: 2024, plateNumber: 'B 8901 VWX', color: 'Putih', status: 'tersedia', utilization: 60, revenueEarned: 12000000, lastMaintenance: '2024-12-15', features: ['Motor Listrik', 'Swap Battery', 'Digital Dashboard'], description: 'Alva One motor listrik swap battery.' },
  { id: 'v9', name: 'Gesits Raya', brand: 'Gesits', model: 'Gesits Raya', category: 'motor-listrik', transmission: 'otomatis', fuelType: 'Listrik', seats: 2, priceDaily: 45000, priceWeekly: 270000, priceMonthly: 900000, year: 2024, plateNumber: 'B 9012 YZA', color: 'Hijau', status: 'disewa', utilization: 75, revenueEarned: 15000000, lastMaintenance: '2024-12-20', features: ['Motor Listrik', 'Portable Battery', 'LCD'], description: 'Gesits Raya produksi Indonesia.' },
  { id: 'v10', name: 'Volta 401', brand: 'Volta', model: 'Volta 401', category: 'motor-listrik', transmission: 'otomatis', fuelType: 'Listrik', seats: 2, priceDaily: 55000, priceWeekly: 330000, priceMonthly: 1100000, year: 2024, plateNumber: 'B 0123 BCD', color: 'Hitam', status: 'maintenance', utilization: 40, revenueEarned: 8000000, lastMaintenance: '2025-01-05', features: ['Fast Charging', 'GPS Tracker', 'Digital Display'], description: 'Volta 401 fast charging.' },
  { id: 'v11', name: 'Mitsubishi Xpander', brand: 'Mitsubishi', model: 'Xpander GLS AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 250000, priceWeekly: 1500000, priceMonthly: 5000000, year: 2023, plateNumber: 'B 1111 CDE', color: 'Putih', status: 'disewa', utilization: 92, revenueEarned: 60000000, lastMaintenance: '2024-12-10', features: ['AC Auto', 'Head Unit 8 inch', 'Cruise Control'], description: 'Mitsubishi Xpander terlaris.' },
  { id: 'v12', name: 'Nissan Livina', brand: 'Nissan', model: 'Livina VE AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 195000, priceWeekly: 1170000, priceMonthly: 3900000, year: 2022, plateNumber: 'B 2222 EFG', color: 'Abu-abu', status: 'tersedia', utilization: 68, revenueEarned: 35000000, lastMaintenance: '2024-11-25', features: ['AC Auto', 'Around View Monitor', 'Keyless'], description: 'Nissan Livina VE fitur lengkap.' },
  { id: 'v13', name: 'Toyota Innova', brand: 'Toyota', model: 'Innova Reborn G AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Diesel', seats: 8, priceDaily: 350000, priceWeekly: 2100000, priceMonthly: 7000000, year: 2023, plateNumber: 'B 3333 HIJ', color: 'Hitam', status: 'disewa', utilization: 88, revenueEarned: 72000000, lastMaintenance: '2024-12-08', features: ['AC Auto Dual Zone', 'Captain Seat', 'Diesel Turbo'], description: 'Toyota Innova Reborn premium.' },
  { id: 'v14', name: 'Wuling Air EV', brand: 'Wuling', model: 'Air EV Long Range', category: 'mobil', transmission: 'otomatis', fuelType: 'Listrik', seats: 4, priceDaily: 180000, priceWeekly: 1080000, priceMonthly: 3600000, year: 2024, plateNumber: 'B 4444 KLM', color: 'Biru Muda', status: 'tersedia', utilization: 50, revenueEarned: 18000000, lastMaintenance: '2024-12-18', features: ['Full Electric', 'AC', 'Touchscreen'], description: 'Wuling Air EV mobil listrik mini.' },
  { id: 'v15', name: 'Hyundai Stargazer', brand: 'Hyundai', model: 'Stargazer Prime AT', category: 'mobil', transmission: 'otomatis', fuelType: 'Bensin', seats: 7, priceDaily: 270000, priceWeekly: 1620000, priceMonthly: 5400000, year: 2023, plateNumber: 'B 5555 NOP', color: 'Coklat', status: 'nonaktif', utilization: 30, revenueEarned: 20000000, lastMaintenance: '2024-10-15', features: ['AC Auto', 'Panoramic Roof', 'ADAS'], description: 'Hyundai Stargazer desain futuristik.' },
];

export const allUsers: AdminUser[] = [
  { id: 'u1', name: 'Budi Santoso', email: 'budi@email.com', phone: '081234567890', verificationStatus: 'verified', totalRentals: 12, joinDate: '2023-06-15', status: 'active', fraudFlag: false },
  { id: 'u2', name: 'Ahmad Rizki', email: 'ahmad@email.com', phone: '081234567891', verificationStatus: 'verified', totalRentals: 8, joinDate: '2023-07-20', status: 'active', fraudFlag: false },
  { id: 'u3', name: 'Dewi Rahayu', email: 'dewi@email.com', phone: '081234567892', verificationStatus: 'pending', totalRentals: 0, joinDate: '2024-12-01', status: 'active', fraudFlag: false },
  { id: 'u4', name: 'Hendra Wijaya', email: 'hendra@email.com', phone: '081234567893', verificationStatus: 'verified', totalRentals: 15, joinDate: '2023-03-10', status: 'active', fraudFlag: false },
  { id: 'u5', name: 'Siti Nurhaliza', email: 'siti@email.com', phone: '081234567894', verificationStatus: 'verified', totalRentals: 5, joinDate: '2023-09-05', status: 'active', fraudFlag: false },
  { id: 'u6', name: 'Rudi Hermawan', email: 'rudi@email.com', phone: '081234567895', verificationStatus: 'rejected', totalRentals: 0, joinDate: '2024-11-20', status: 'active', fraudFlag: true },
  { id: 'u7', name: 'Agus Pratama', email: 'agus@email.com', phone: '081234567896', verificationStatus: 'verified', totalRentals: 20, joinDate: '2023-01-15', status: 'active', fraudFlag: false },
  { id: 'u8', name: 'Dian Sari', email: 'dian@email.com', phone: '081234567897', verificationStatus: 'pending', totalRentals: 0, joinDate: '2024-12-10', status: 'active', fraudFlag: false },
  { id: 'u9', name: 'Eko Prasetyo', email: 'eko@email.com', phone: '081234567898', verificationStatus: 'verified', totalRentals: 3, joinDate: '2024-05-22', status: 'suspended', fraudFlag: true },
  { id: 'u10', name: 'Fitri Handayani', email: 'fitri@email.com', phone: '081234567899', verificationStatus: 'verified', totalRentals: 7, joinDate: '2023-11-30', status: 'active', fraudFlag: false },
  { id: 'u11', name: 'Gunawan Setiadi', email: 'gunawan@email.com', phone: '081234567800', verificationStatus: 'verified', totalRentals: 10, joinDate: '2023-04-18', status: 'active', fraudFlag: false },
  { id: 'u12', name: 'Hari Susanto', email: 'hari@email.com', phone: '081234567801', verificationStatus: 'pending', totalRentals: 0, joinDate: '2025-01-02', status: 'active', fraudFlag: false },
  { id: 'u13', name: 'Indra Lesmana', email: 'indra@email.com', phone: '081234567802', verificationStatus: 'verified', totalRentals: 6, joinDate: '2023-08-12', status: 'active', fraudFlag: false },
  { id: 'u14', name: 'Joko Widodo', email: 'joko@email.com', phone: '081234567803', verificationStatus: 'verified', totalRentals: 9, joinDate: '2023-05-25', status: 'active', fraudFlag: false },
  { id: 'u15', name: 'Kartini Putri', email: 'kartini@email.com', phone: '081234567804', verificationStatus: 'pending', totalRentals: 0, joinDate: '2025-01-05', status: 'active', fraudFlag: false },
  { id: 'u16', name: 'Lukman Hakim', email: 'lukman@email.com', phone: '081234567805', verificationStatus: 'verified', totalRentals: 4, joinDate: '2024-02-14', status: 'active', fraudFlag: false },
  { id: 'u17', name: 'Maya Sari', email: 'maya@email.com', phone: '081234567806', verificationStatus: 'verified', totalRentals: 11, joinDate: '2023-07-08', status: 'active', fraudFlag: false },
  { id: 'u18', name: 'Nana Supriatna', email: 'nana@email.com', phone: '081234567807', verificationStatus: 'rejected', totalRentals: 0, joinDate: '2024-10-30', status: 'active', fraudFlag: true },
  { id: 'u19', name: 'Oki Setiawan', email: 'oki@email.com', phone: '081234567808', verificationStatus: 'verified', totalRentals: 2, joinDate: '2024-08-19', status: 'active', fraudFlag: false },
  { id: 'u20', name: 'Putra Ramadhan', email: 'putra@email.com', phone: '081234567809', verificationStatus: 'pending', totalRentals: 0, joinDate: '2025-01-08', status: 'active', fraudFlag: false },
];

export const pendingVerifications: PendingVerification[] = [
  { id: 'u3', name: 'Dewi Rahayu', email: 'dewi@email.com', submittedDate: '2024-12-01', documents: { ktp: true, sim: true, selfie: true } },
  { id: 'u8', name: 'Dian Sari', email: 'dian@email.com', submittedDate: '2024-12-10', documents: { ktp: true, sim: true, selfie: false } },
  { id: 'u12', name: 'Hari Susanto', email: 'hari@email.com', submittedDate: '2025-01-02', documents: { ktp: true, sim: false, selfie: false } },
  { id: 'u15', name: 'Kartini Putri', email: 'kartini@email.com', submittedDate: '2025-01-05', documents: { ktp: true, sim: true, selfie: true } },
  { id: 'u20', name: 'Putra Ramadhan', email: 'putra@email.com', submittedDate: '2025-01-08', documents: { ktp: true, sim: true, selfie: true } },
];

export const paymentRecords: PaymentRecord[] = [
  { id: 'PAY-001', date: '2025-01-08', driverName: 'Budi Santoso', bookingId: 'BK-0001', amount: 4000000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-002', date: '2025-01-07', driverName: 'Ahmad Rizki', bookingId: 'BK-0002', amount: 3600000, method: 'GoPay', status: 'paid' },
  { id: 'PAY-003', date: '2025-01-07', driverName: 'Hendra Wijaya', bookingId: 'BK-0003', amount: 4400000, method: 'Transfer Bank', status: 'pending' },
  { id: 'PAY-004', date: '2025-01-06', driverName: 'Agus Pratama', bookingId: 'BK-0004', amount: 3800000, method: 'OVO', status: 'paid' },
  { id: 'PAY-005', date: '2025-01-06', driverName: 'Siti Nurhaliza', bookingId: 'BK-0005', amount: 3000000, method: 'QRIS', status: 'overdue' },
  { id: 'PAY-006', date: '2025-01-05', driverName: 'Gunawan Setiadi', bookingId: 'BK-0006', amount: 5000000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-007', date: '2025-01-05', driverName: 'Indra Lesmana', bookingId: 'BK-0007', amount: 3500000, method: 'DANA', status: 'paid' },
  { id: 'PAY-008', date: '2025-01-04', driverName: 'Joko Widodo', bookingId: 'BK-0008', amount: 7000000, method: 'Transfer Bank', status: 'pending' },
  { id: 'PAY-009', date: '2025-01-04', driverName: 'Maya Sari', bookingId: 'BK-0009', amount: 4000000, method: 'GoPay', status: 'paid' },
  { id: 'PAY-010', date: '2025-01-03', driverName: 'Eko Prasetyo', bookingId: 'BK-0010', amount: 3300000, method: 'OVO', status: 'overdue' },
  { id: 'PAY-011', date: '2025-01-03', driverName: 'Fitri Handayani', bookingId: 'BK-0011', amount: 3600000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-012', date: '2025-01-02', driverName: 'Lukman Hakim', bookingId: 'BK-0012', amount: 5400000, method: 'QRIS', status: 'refunded' },
  { id: 'PAY-013', date: '2025-01-02', driverName: 'Oki Setiawan', bookingId: 'BK-0013', amount: 1000000, method: 'GoPay', status: 'paid' },
  { id: 'PAY-014', date: '2025-01-01', driverName: 'Budi Santoso', bookingId: 'BK-0014', amount: 4000000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-015', date: '2025-01-01', driverName: 'Ahmad Rizki', bookingId: 'BK-0015', amount: 3600000, method: 'OVO', status: 'pending' },
  { id: 'PAY-016', date: '2024-12-31', driverName: 'Hendra Wijaya', bookingId: 'BK-0016', amount: 4400000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-017', date: '2024-12-31', driverName: 'Agus Pratama', bookingId: 'BK-0017', amount: 3800000, method: 'DANA', status: 'paid' },
  { id: 'PAY-018', date: '2024-12-30', driverName: 'Siti Nurhaliza', bookingId: 'BK-0018', amount: 3000000, method: 'GoPay', status: 'paid' },
  { id: 'PAY-019', date: '2024-12-30', driverName: 'Gunawan Setiadi', bookingId: 'BK-0019', amount: 5000000, method: 'Transfer Bank', status: 'overdue' },
  { id: 'PAY-020', date: '2024-12-29', driverName: 'Indra Lesmana', bookingId: 'BK-0020', amount: 3500000, method: 'QRIS', status: 'paid' },
  { id: 'PAY-021', date: '2024-12-29', driverName: 'Joko Widodo', bookingId: 'BK-0021', amount: 7000000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-022', date: '2024-12-28', driverName: 'Maya Sari', bookingId: 'BK-0022', amount: 4000000, method: 'OVO', status: 'paid' },
  { id: 'PAY-023', date: '2024-12-28', driverName: 'Eko Prasetyo', bookingId: 'BK-0023', amount: 3300000, method: 'GoPay', status: 'refunded' },
  { id: 'PAY-024', date: '2024-12-27', driverName: 'Fitri Handayani', bookingId: 'BK-0024', amount: 3600000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-025', date: '2024-12-27', driverName: 'Lukman Hakim', bookingId: 'BK-0025', amount: 5400000, method: 'DANA', status: 'paid' },
  { id: 'PAY-026', date: '2024-12-26', driverName: 'Budi Santoso', bookingId: 'BK-0026', amount: 4000000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-027', date: '2024-12-26', driverName: 'Ahmad Rizki', bookingId: 'BK-0027', amount: 3600000, method: 'OVO', status: 'pending' },
  { id: 'PAY-028', date: '2024-12-25', driverName: 'Hendra Wijaya', bookingId: 'BK-0028', amount: 4400000, method: 'GoPay', status: 'paid' },
  { id: 'PAY-029', date: '2024-12-25', driverName: 'Agus Pratama', bookingId: 'BK-0029', amount: 3800000, method: 'Transfer Bank', status: 'paid' },
  { id: 'PAY-030', date: '2024-12-24', driverName: 'Siti Nurhaliza', bookingId: 'BK-0030', amount: 3000000, method: 'QRIS', status: 'paid' },
];

export const maintenanceRecords: MaintenanceRecord[] = [
  { id: 'm1', vehicleName: 'Honda Mobilio', type: 'Servis Berkala', description: 'Ganti oli, filter oli, filter udara', cost: 850000, date: '2025-01-02', technician: 'Pak Darto', nextService: '2025-04-02' },
  { id: 'm2', vehicleName: 'Volta 401', type: 'Perbaikan', description: 'Perbaikan sistem charging', cost: 1200000, date: '2025-01-05', technician: 'Pak Wahyu', nextService: '2025-03-05' },
  { id: 'm3', vehicleName: 'Toyota Avanza', type: 'Servis Berkala', description: 'Ganti oli mesin dan transmisi', cost: 750000, date: '2024-12-01', technician: 'Pak Darto', nextService: '2025-03-01' },
  { id: 'm4', vehicleName: 'Suzuki Ertiga', type: 'Ganti Ban', description: 'Ganti 4 ban Bridgestone', cost: 3200000, date: '2024-12-05', technician: 'Pak Agung', nextService: '2025-06-05' },
  { id: 'm5', vehicleName: 'Daihatsu Sigra', type: 'Perbaikan', description: 'Perbaikan AC tidak dingin', cost: 650000, date: '2024-11-20', technician: 'Pak Wahyu', nextService: '2025-02-20' },
  { id: 'm6', vehicleName: 'Toyota Innova', type: 'Servis Berkala', description: 'Servis berkala 40.000km', cost: 1500000, date: '2024-12-08', technician: 'Pak Darto', nextService: '2025-03-08' },
  { id: 'm7', vehicleName: 'Alva One', type: 'Inspeksi', description: 'Inspeksi battery health', cost: 200000, date: '2024-12-15', technician: 'Pak Wahyu', nextService: '2025-03-15' },
  { id: 'm8', vehicleName: 'Gesits Raya', type: 'Ganti Oli', description: 'Ganti minyak rem', cost: 150000, date: '2024-12-20', technician: 'Pak Agung', nextService: '2025-06-20' },
  { id: 'm9', vehicleName: 'Mitsubishi Xpander', type: 'Servis Berkala', description: 'Tune up dan cek kelistrikan', cost: 900000, date: '2024-12-10', technician: 'Pak Darto', nextService: '2025-03-10' },
  { id: 'm10', vehicleName: 'Honda Brio', type: 'Perbaikan', description: 'Ganti kampas rem depan', cost: 450000, date: '2024-11-15', technician: 'Pak Agung', nextService: '2025-05-15' },
];

export const promoList: PromoItem[] = [
  { id: 'p1', code: 'WELCOME20', type: 'percentage', value: 20, validFrom: '2025-01-01', validUntil: '2025-03-31', used: 45, maxUses: 100, status: 'active', target: 'Semua' },
  { id: 'p2', code: 'HEMAT500K', type: 'fixed', value: 500000, validFrom: '2025-01-01', validUntil: '2025-02-28', used: 20, maxUses: 50, status: 'active', target: 'Mobil saja' },
  { id: 'p3', code: 'MOTOR10', type: 'percentage', value: 10, validFrom: '2025-01-01', validUntil: '2025-06-30', used: 30, maxUses: 200, status: 'active', target: 'Motor saja' },
  { id: 'p4', code: 'LONGTERM15', type: 'percentage', value: 15, validFrom: '2024-10-01', validUntil: '2025-01-31', used: 80, maxUses: 100, status: 'active', target: 'Semua' },
  { id: 'p5', code: 'NEWUSER', type: 'fixed', value: 200000, validFrom: '2024-06-01', validUntil: '2024-12-31', used: 150, maxUses: 150, status: 'expired', target: 'Semua' },
  { id: 'p6', code: 'FLASH30', type: 'percentage', value: 30, validFrom: '2024-11-11', validUntil: '2024-11-11', used: 50, maxUses: 50, status: 'expired', target: 'Semua' },
  { id: 'p7', code: 'TAHUNBARU', type: 'fixed', value: 1000000, validFrom: '2024-12-25', validUntil: '2025-01-05', used: 25, maxUses: 30, status: 'expired', target: 'Mobil saja' },
  { id: 'p8', code: 'REFERRAL5', type: 'percentage', value: 5, validFrom: '2025-01-01', validUntil: '2025-12-31', used: 10, maxUses: 500, status: 'active', target: 'Semua' },
];

export const supportTicketsList: SupportTicket[] = [
  { id: 'TK-001', userId: 'u1', userName: 'Budi Santoso', subject: 'AC mobil tidak dingin', category: 'Kendaraan', priority: 'high', status: 'open', createdAt: '2025-01-08' },
  { id: 'TK-002', userId: 'u2', userName: 'Ahmad Rizki', subject: 'Pembayaran gagal diproses', category: 'Pembayaran', priority: 'high', status: 'in_progress', createdAt: '2025-01-07' },
  { id: 'TK-003', userId: 'u4', userName: 'Hendra Wijaya', subject: 'Perpanjangan sewa', category: 'Booking', priority: 'medium', status: 'open', createdAt: '2025-01-07' },
  { id: 'TK-004', userId: 'u5', userName: 'Siti Nurhaliza', subject: 'Dokumen belum diverifikasi', category: 'Verifikasi', priority: 'medium', status: 'closed', createdAt: '2025-01-05' },
  { id: 'TK-005', userId: 'u7', userName: 'Agus Pratama', subject: 'Refund deposit belum diterima', category: 'Pembayaran', priority: 'high', status: 'in_progress', createdAt: '2025-01-06' },
  { id: 'TK-006', userId: 'u10', userName: 'Fitri Handayani', subject: 'Ban bocor di jalan', category: 'Kendaraan', priority: 'high', status: 'closed', createdAt: '2025-01-04' },
  { id: 'TK-007', userId: 'u11', userName: 'Gunawan Setiadi', subject: 'Pertanyaan tentang asuransi', category: 'Umum', priority: 'low', status: 'open', createdAt: '2025-01-08' },
  { id: 'TK-008', userId: 'u13', userName: 'Indra Lesmana', subject: 'Ganti jadwal pickup', category: 'Booking', priority: 'medium', status: 'closed', createdAt: '2025-01-03' },
  { id: 'TK-009', userId: 'u14', userName: 'Joko Widodo', subject: 'Motor listrik mati mendadak', category: 'Kendaraan', priority: 'high', status: 'in_progress', createdAt: '2025-01-07' },
  { id: 'TK-010', userId: 'u17', userName: 'Maya Sari', subject: 'Cara menggunakan promo', category: 'Umum', priority: 'low', status: 'open', createdAt: '2025-01-08' },
];

export const blogPosts: AdminBlogPost[] = [
  { id: 'blog-1', title: 'Tips Maksimalkan Penghasilan Driver Online', slug: 'tips-maksimalkan-penghasilan', excerpt: 'Strategi jitu meningkatkan pendapatan harian.', content: 'Konten lengkap tentang tips penghasilan...', author: 'Admin', status: 'published', date: '2025-01-05' },
  { id: 'blog-2', title: 'Keuntungan Motor Listrik untuk Ojol', slug: 'keuntungan-motor-listrik', excerpt: 'Hemat biaya operasional hingga 80%.', content: 'Konten lengkap tentang motor listrik...', author: 'Admin', status: 'published', date: '2025-01-03' },
  { id: 'blog-3', title: 'Panduan Daftar Driver Online 2025', slug: 'panduan-daftar-driver', excerpt: 'Langkah demi langkah daftar mitra.', content: 'Konten lengkap panduan...', author: 'Admin', status: 'published', date: '2024-12-28' },
  { id: 'blog-4', title: 'Cara Jaga Rating Bintang 5', slug: 'cara-jaga-rating', excerpt: 'Rating tinggi = lebih banyak order.', content: 'Konten lengkap tentang rating...', author: 'Admin', status: 'draft', date: '2025-01-08' },
  { id: 'blog-5', title: 'Fitur Baru: Sewa Bulanan Hemat', slug: 'fitur-sewa-bulanan', excerpt: 'Nikmati diskon khusus sewa bulanan.', content: 'Konten lengkap fitur baru...', author: 'Admin', status: 'draft', date: '2025-01-09' },
];

export const bannerList: BannerItem[] = [
  { id: 'ban-1', title: 'Promo Tahun Baru 2025', position: 'hero', active: true, startDate: '2025-01-01', endDate: '2025-01-31', linkUrl: '/promo/tahun-baru' },
  { id: 'ban-2', title: 'Motor Listrik Baru', position: 'sidebar', active: true, startDate: '2025-01-01', endDate: '2025-03-31', linkUrl: '/fleet?category=motor-listrik' },
  { id: 'ban-3', title: 'Referral Program', position: 'footer', active: false, startDate: '2024-12-01', endDate: '2025-02-28', linkUrl: '/referral' },
];

export const faqList: FAQItem[] = [
  { id: 'faq-1', question: 'Apa syarat untuk menyewa kendaraan?', answer: 'KTP, SIM yang berlaku, dan terdaftar di platform ojek online.', category: 'Pendaftaran', order: 1, status: 'active' },
  { id: 'faq-2', question: 'Berapa lama proses verifikasi?', answer: 'Proses verifikasi memakan waktu 1x24 jam kerja.', category: 'Pendaftaran', order: 2, status: 'active' },
  { id: 'faq-3', question: 'Metode pembayaran apa saja?', answer: 'Transfer bank, e-wallet (GoPay, OVO, DANA), QRIS, dan tunai.', category: 'Pembayaran', order: 3, status: 'active' },
  { id: 'faq-4', question: 'Apakah ada deposit?', answer: 'Deposit Rp 1.000.000 untuk mobil dan Rp 500.000 untuk motor.', category: 'Pembayaran', order: 4, status: 'active' },
  { id: 'faq-5', question: 'Bagaimana jika kendaraan rusak?', answer: 'Kerusakan normal ditanggung kami. Kelalaian penyewa dipotong dari deposit.', category: 'Kendaraan', order: 5, status: 'active' },
  { id: 'faq-6', question: 'Apakah kendaraan sudah diasuransi?', answer: 'Ya, semua kendaraan dilengkapi asuransi all-risk.', category: 'Kendaraan', order: 6, status: 'active' },
  { id: 'faq-7', question: 'Bagaimana prosedur pengembalian?', answer: 'Pengembalian di lokasi pickup yang sama. Inspeksi digital dilakukan saat serah terima.', category: 'Pengembalian', order: 7, status: 'active' },
  { id: 'faq-8', question: 'Bisa perpanjang masa sewa?', answer: 'Ya, ajukan perpanjangan minimal 2 hari sebelum berakhir.', category: 'Pengembalian', order: 8, status: 'active' },
  { id: 'faq-9', question: 'Bagaimana cara mendaftar?', answer: 'Download aplikasi, upload dokumen, dan tunggu verifikasi.', category: 'Pendaftaran', order: 9, status: 'active' },
  { id: 'faq-10', question: 'Apakah bisa sewa harian?', answer: 'Ya, tersedia paket harian, mingguan, dan bulanan.', category: 'Kendaraan', order: 10, status: 'active' },
];
