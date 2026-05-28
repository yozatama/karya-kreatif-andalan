export const currentUser = {
  id: "1",
  firstName: "Budi",
  lastName: "Santoso",
  email: "budi@email.com",
  phone: "081234567890",
  role: "user" as const,
  avatar: "/placeholder/64x64.svg",
  platform: "Gojek",
  isVerified: true,
  joinDate: "2024-01-15",
  emergencyContact: "082345678901",
  activeRentalId: "r1",
};

export const activeRentals = [
  {
    id: "r1",
    vehicleId: "1",
    vehicleName: "Toyota Avanza 2023",
    vehicleImage: "/placeholder/400x300.svg",
    vehicleType: "car",
    licensePlate: "B 1234 XYZ",
    startDate: "2024-12-01",
    endDate: "2025-01-01",
    remainingDays: 18,
    totalDays: 31,
    dailyRate: 250000,
    totalAmount: 7750000,
    paidAmount: 5000000,
    status: "ACTIVE" as const,
    nextPaymentDate: "2024-12-20",
    nextPaymentAmount: 1750000,
  },
  {
    id: "r2",
    vehicleId: "9",
    vehicleName: "Gesits G1 2024",
    vehicleImage: "/placeholder/400x300.svg",
    vehicleType: "motorcycle",
    licensePlate: "B 5678 ABC",
    startDate: "2024-12-10",
    endDate: "2025-01-10",
    remainingDays: 27,
    totalDays: 31,
    dailyRate: 75000,
    totalAmount: 2325000,
    paidAmount: 750000,
    status: "APPROVED" as const,
    nextPaymentDate: "2024-12-17",
    nextPaymentAmount: 525000,
  },
];

export const paymentHistory = [
  { id: "p1", date: "2024-12-01", description: "Pembayaran Rental - Toyota Avanza", amount: 1750000, method: "Transfer BCA", status: "PAID" as const, invoiceId: "INV-001" },
  { id: "p2", date: "2024-11-25", description: "Deposit Kendaraan - Toyota Avanza", amount: 3000000, method: "Transfer Mandiri", status: "PAID" as const, invoiceId: "INV-002" },
  { id: "p3", date: "2024-11-20", description: "Pembayaran Rental Minggu 4", amount: 1750000, method: "GoPay", status: "PAID" as const, invoiceId: "INV-003" },
  { id: "p4", date: "2024-11-13", description: "Pembayaran Rental Minggu 3", amount: 1750000, method: "Transfer BCA", status: "PAID" as const, invoiceId: "INV-004" },
  { id: "p5", date: "2024-11-06", description: "Pembayaran Rental Minggu 2", amount: 1750000, method: "OVO", status: "PAID" as const, invoiceId: "INV-005" },
  { id: "p6", date: "2024-10-30", description: "Pembayaran Rental Minggu 1", amount: 1750000, method: "Transfer BCA", status: "PAID" as const, invoiceId: "INV-006" },
  { id: "p7", date: "2024-12-20", description: "Pembayaran Rental - Toyota Avanza", amount: 1750000, method: "-", status: "PENDING" as const, invoiceId: "INV-007" },
  { id: "p8", date: "2024-12-10", description: "Deposit Kendaraan - Gesits G1", amount: 500000, method: "Dana", status: "PAID" as const, invoiceId: "INV-008" },
  { id: "p9", date: "2024-10-15", description: "Denda Keterlambatan", amount: 175000, method: "Transfer BCA", status: "PAID" as const, invoiceId: "INV-009" },
  { id: "p10", date: "2024-12-27", description: "Pembayaran Rental - Gesits G1", amount: 525000, method: "-", status: "OVERDUE" as const, invoiceId: "INV-010" },
];

export const notifications = [
  { id: "n1", title: "Pembayaran Berhasil", message: "Pembayaran rental Rp 1.750.000 telah berhasil diproses.", type: "success" as const, read: false, createdAt: "2024-12-15T10:30:00" },
  { id: "n2", title: "Jadwal Service", message: "Kendaraan Toyota Avanza dijadwalkan service pada 20 Desember 2024.", type: "info" as const, read: false, createdAt: "2024-12-14T08:00:00" },
  { id: "n3", title: "Pembayaran Jatuh Tempo", message: "Pembayaran rental sebesar Rp 1.750.000 akan jatuh tempo pada 20 Desember.", type: "warning" as const, read: false, createdAt: "2024-12-13T09:00:00" },
  { id: "n4", title: "Promo Spesial", message: "Dapatkan diskon 10% untuk perpanjangan rental bulan Januari!", type: "info" as const, read: true, createdAt: "2024-12-12T14:00:00" },
  { id: "n5", title: "Verifikasi Berhasil", message: "Dokumen SIM Anda telah berhasil diverifikasi.", type: "success" as const, read: true, createdAt: "2024-12-10T11:00:00" },
  { id: "n6", title: "Booking Disetujui", message: "Booking Gesits G1 2024 telah disetujui. Silakan ambil kendaraan.", type: "success" as const, read: true, createdAt: "2024-12-09T16:00:00" },
  { id: "n7", title: "Maintenance Selesai", message: "Service berkala kendaraan Anda telah selesai dilakukan.", type: "info" as const, read: true, createdAt: "2024-12-08T13:00:00" },
  { id: "n8", title: "Update Kebijakan", message: "Terdapat update pada kebijakan rental. Silakan baca informasi terbaru.", type: "info" as const, read: true, createdAt: "2024-12-05T10:00:00" },
];

export const revenueData = [
  { month: "Jan", revenue: 185000000, expenses: 45000000 },
  { month: "Feb", revenue: 192000000, expenses: 48000000 },
  { month: "Mar", revenue: 210000000, expenses: 52000000 },
  { month: "Apr", revenue: 198000000, expenses: 47000000 },
  { month: "Mei", revenue: 225000000, expenses: 55000000 },
  { month: "Jun", revenue: 240000000, expenses: 58000000 },
  { month: "Jul", revenue: 235000000, expenses: 56000000 },
  { month: "Agu", revenue: 248000000, expenses: 60000000 },
  { month: "Sep", revenue: 260000000, expenses: 62000000 },
  { month: "Okt", revenue: 275000000, expenses: 65000000 },
  { month: "Nov", revenue: 290000000, expenses: 68000000 },
  { month: "Des", revenue: 310000000, expenses: 72000000 },
];

export const fleetData = [
  { category: "MPV", total: 25, rented: 20, utilization: 80 },
  { category: "Hatchback", total: 10, rented: 7, utilization: 70 },
  { category: "Motor Listrik", total: 30, rented: 24, utilization: 80 },
  { category: "SUV", total: 5, rented: 4, utilization: 80 },
  { category: "Sedan", total: 8, rented: 5, utilization: 62 },
];

export const bookingStats = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1} Des`,
  bookings: Math.floor(Math.random() * 8) + 2,
  completed: Math.floor(Math.random() * 6) + 1,
}));

export const adminUsers = [
  { id: "u1", firstName: "Budi", lastName: "Santoso", email: "budi@email.com", phone: "081234567890", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-01-15", avatar: "/placeholder/64x64.svg" },
  { id: "u2", firstName: "Siti", lastName: "Nurhaliza", email: "siti@email.com", phone: "082345678901", platform: "Grab", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-02-20", avatar: "/placeholder/64x64.svg" },
  { id: "u3", firstName: "Ahmad", lastName: "Fauzi", email: "ahmad@email.com", phone: "083456789012", platform: "Maxim", role: "user" as const, verificationStatus: "pending" as const, joinDate: "2024-03-10", avatar: "/placeholder/64x64.svg" },
  { id: "u4", firstName: "Dewi", lastName: "Rahayu", email: "dewi@email.com", phone: "084567890123", platform: "Grab", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-03-25", avatar: "/placeholder/64x64.svg" },
  { id: "u5", firstName: "Riko", lastName: "Pratama", email: "riko@email.com", phone: "085678901234", platform: "InDrive", role: "user" as const, verificationStatus: "rejected" as const, joinDate: "2024-04-05", avatar: "/placeholder/64x64.svg" },
  { id: "u6", firstName: "Joko", lastName: "Widodo", email: "joko@email.com", phone: "086789012345", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-04-18", avatar: "/placeholder/64x64.svg" },
  { id: "u7", firstName: "Maya", lastName: "Putri", email: "maya@email.com", phone: "087890123456", platform: "Grab", role: "user" as const, verificationStatus: "pending" as const, joinDate: "2024-05-01", avatar: "/placeholder/64x64.svg" },
  { id: "u8", firstName: "Andi", lastName: "Wijaya", email: "andi@email.com", phone: "088901234567", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-05-15", avatar: "/placeholder/64x64.svg" },
  { id: "u9", firstName: "Rina", lastName: "Sari", email: "rina@email.com", phone: "089012345678", platform: "Maxim", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-06-02", avatar: "/placeholder/64x64.svg" },
  { id: "u10", firstName: "Hendra", lastName: "Gunawan", email: "hendra@email.com", phone: "081123456789", platform: "InDrive", role: "user" as const, verificationStatus: "pending" as const, joinDate: "2024-06-20", avatar: "/placeholder/64x64.svg" },
  { id: "u11", firstName: "Lina", lastName: "Susanti", email: "lina@email.com", phone: "082234567890", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-07-05", avatar: "/placeholder/64x64.svg" },
  { id: "u12", firstName: "Doni", lastName: "Setiawan", email: "doni@email.com", phone: "083345678901", platform: "Grab", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-07-18", avatar: "/placeholder/64x64.svg" },
  { id: "u13", firstName: "Fitri", lastName: "Handayani", email: "fitri@email.com", phone: "084456789012", platform: "Maxim", role: "user" as const, verificationStatus: "rejected" as const, joinDate: "2024-08-01", avatar: "/placeholder/64x64.svg" },
  { id: "u14", firstName: "Wahyu", lastName: "Hidayat", email: "wahyu@email.com", phone: "085567890123", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-08-15", avatar: "/placeholder/64x64.svg" },
  { id: "u15", firstName: "Novi", lastName: "Anggraini", email: "novi@email.com", phone: "086678901234", platform: "Grab", role: "user" as const, verificationStatus: "pending" as const, joinDate: "2024-09-01", avatar: "/placeholder/64x64.svg" },
  { id: "u16", firstName: "Agus", lastName: "Suryadi", email: "agus@email.com", phone: "087789012345", platform: "InDrive", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-09-15", avatar: "/placeholder/64x64.svg" },
  { id: "u17", firstName: "Putri", lastName: "Wulandari", email: "putri@email.com", phone: "088890123456", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-10-01", avatar: "/placeholder/64x64.svg" },
  { id: "u18", firstName: "Rizky", lastName: "Maulana", email: "rizky@email.com", phone: "089901234567", platform: "Grab", role: "user" as const, verificationStatus: "pending" as const, joinDate: "2024-10-15", avatar: "/placeholder/64x64.svg" },
  { id: "u19", firstName: "Yuni", lastName: "Astuti", email: "yuni@email.com", phone: "081012345678", platform: "Maxim", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-11-01", avatar: "/placeholder/64x64.svg" },
  { id: "u20", firstName: "Fajar", lastName: "Rahman", email: "fajar@email.com", phone: "082123456789", platform: "Gojek", role: "user" as const, verificationStatus: "verified" as const, joinDate: "2024-11-15", avatar: "/placeholder/64x64.svg" },
];

export const maintenanceSchedule = [
  { id: "m1", vehicleId: "1", vehicleName: "Toyota Avanza 2023", type: "Service Berkala", description: "Ganti oli, filter, dan pengecekan rem", scheduledDate: "2024-12-20", cost: 850000, status: "scheduled" as const },
  { id: "m2", vehicleId: "3", vehicleName: "Honda Brio 2024", type: "Perbaikan", description: "Penggantian kampas rem depan", scheduledDate: "2024-12-22", cost: 450000, status: "scheduled" as const },
  { id: "m3", vehicleId: "5", vehicleName: "Suzuki Ertiga 2023", type: "Service Berkala", description: "Service 20.000 km - ganti oli, filter udara, busi", scheduledDate: "2024-12-25", cost: 1200000, status: "scheduled" as const },
  { id: "m4", vehicleId: "9", vehicleName: "Gesits G1 2024", type: "Inspeksi", description: "Pengecekan baterai dan sistem kelistrikan", scheduledDate: "2024-12-28", cost: 350000, status: "scheduled" as const },
  { id: "m5", vehicleId: "7", vehicleName: "Toyota Innova Reborn 2022", type: "Perbaikan", description: "Perbaikan AC dan penggantian compressor", scheduledDate: "2025-01-02", cost: 2500000, status: "scheduled" as const },
];
