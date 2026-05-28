import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.supportMessage.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.vehicleCheckpoint.deleteMany();
  await prisma.driverVerification.deleteMany();
  await prisma.document.deleteMany();
  await prisma.penalty.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.maintenanceLog.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleCategory.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();

  const passwordHash = await bcrypt.hash('password123', 10);

  // Create Roles
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'SUPER_ADMIN', description: 'Super Administrator with full system access' } }),
    prisma.role.create({ data: { name: 'ADMIN', description: 'Operational administrator' } }),
    prisma.role.create({ data: { name: 'FINANCE_ADMIN', description: 'Finance and billing administrator' } }),
    prisma.role.create({ data: { name: 'MAINTENANCE', description: 'Vehicle maintenance staff' } }),
    prisma.role.create({ data: { name: 'DRIVER', description: 'Registered driver / customer' } }),
  ]);

  const [superAdminRole, adminRole, financeRole, maintenanceRole, driverRole] = roles;

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@karyakreatif.id',
        phone: '081234567890',
        name: 'Super Admin',
        passwordHash,
        roleId: superAdminRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ops1@karyakreatif.id',
        phone: '081234567891',
        name: 'Rina Wijaya',
        passwordHash,
        roleId: adminRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ops2@karyakreatif.id',
        phone: '081234567892',
        name: 'Hendra Gunawan',
        passwordHash,
        roleId: adminRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'finance@karyakreatif.id',
        phone: '081234567893',
        name: 'Putri Handayani',
        passwordHash,
        roleId: financeRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'maintenance@karyakreatif.id',
        phone: '081234567894',
        name: 'Agus Prasetyo',
        passwordHash,
        roleId: maintenanceRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'budi.santoso@gmail.com',
        phone: '081345678901',
        name: 'Budi Santoso',
        passwordHash,
        roleId: driverRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'dewi.lestari@gmail.com',
        phone: '081345678902',
        name: 'Dewi Lestari',
        passwordHash,
        roleId: driverRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'ahmad.hidayat@gmail.com',
        phone: '081345678903',
        name: 'Ahmad Hidayat',
        passwordHash,
        roleId: driverRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'siti.rahayu@gmail.com',
        phone: '081345678904',
        name: 'Siti Rahayu',
        passwordHash,
        roleId: driverRole.id,
        isVerified: false,
        isActive: true,
      },
    }),
    prisma.user.create({
      data: {
        email: 'rudi.hermawan@gmail.com',
        phone: '081345678905',
        name: 'Rudi Hermawan',
        passwordHash,
        roleId: driverRole.id,
        isVerified: true,
        isActive: true,
      },
    }),
  ]);

  const [superAdmin, ops1, ops2, finance, maintenance, budi, dewi, ahmad, siti, rudi] = users;

  console.log('Created roles and users');

  // Create Vehicle Categories
  const categories = await Promise.all([
    prisma.vehicleCategory.create({ data: { name: 'Sedan', slug: 'sedan', description: 'Comfortable sedan cars for city driving', icon: 'car' } }),
    prisma.vehicleCategory.create({ data: { name: 'MPV', slug: 'mpv', description: 'Multi-purpose vehicles for families', icon: 'van' } }),
    prisma.vehicleCategory.create({ data: { name: 'SUV', slug: 'suv', description: 'Sport utility vehicles for all terrain', icon: 'truck' } }),
    prisma.vehicleCategory.create({ data: { name: 'Motor Listrik', slug: 'motor-listrik', description: 'Electric motorcycles for eco-friendly rides', icon: 'zap' } }),
    prisma.vehicleCategory.create({ data: { name: 'LCGC', slug: 'lcgc', description: 'Low Cost Green Car - affordable and fuel efficient', icon: 'leaf' } }),
  ]);

  const [sedan, mpv, suv, motorListrik, lcgc] = categories;

  // Create Vehicles (20 vehicles)
  const vehicles = await Promise.all([
    // Sedan (4)
    prisma.vehicle.create({
      data: {
        categoryId: sedan.id, name: 'Toyota Vios 2023', brand: 'Toyota', model: 'Vios', year: 2023,
        plateNumber: 'B 1234 KKA', color: 'Silver', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 350000, weeklyRate: 2100000, monthlyRate: 7500000, depositAmount: 500000,
        images: JSON.stringify(['/vehicles/vios-1.jpg']), description: 'Toyota Vios terbaru, nyaman untuk perjalanan kota', mileage: 15000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: sedan.id, name: 'Honda City 2023', brand: 'Honda', model: 'City', year: 2023,
        plateNumber: 'B 1235 KKA', color: 'Putih', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 375000, weeklyRate: 2250000, monthlyRate: 8000000, depositAmount: 500000,
        images: JSON.stringify(['/vehicles/city-1.jpg']), description: 'Honda City Hatchback RS, sporty dan irit', mileage: 12000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: sedan.id, name: 'Toyota Corolla Altis 2022', brand: 'Toyota', model: 'Corolla Altis', year: 2022,
        plateNumber: 'B 1236 KKA', color: 'Hitam', transmission: 'AUTOMATIC', fuelType: 'HYBRID',
        seats: 5, dailyRate: 450000, weeklyRate: 2700000, monthlyRate: 9500000, depositAmount: 750000,
        images: JSON.stringify(['/vehicles/altis-1.jpg']), description: 'Corolla Altis Hybrid, mewah dan ramah lingkungan', mileage: 20000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: sedan.id, name: 'Honda Civic 2023', brand: 'Honda', model: 'Civic', year: 2023,
        plateNumber: 'B 1237 KKA', color: 'Merah', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 500000, weeklyRate: 3000000, monthlyRate: 10000000, depositAmount: 750000,
        images: JSON.stringify(['/vehicles/civic-1.jpg']), description: 'Honda Civic RS Turbo, performa tinggi', mileage: 8000,
      },
    }),
    // MPV (5)
    prisma.vehicle.create({
      data: {
        categoryId: mpv.id, name: 'Toyota Avanza 2023', brand: 'Toyota', model: 'Avanza', year: 2023,
        plateNumber: 'B 2001 KKA', color: 'Silver', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 7, dailyRate: 300000, weeklyRate: 1800000, monthlyRate: 6500000, depositAmount: 400000,
        images: JSON.stringify(['/vehicles/avanza-1.jpg']), description: 'Toyota Avanza terbaru, luas dan nyaman', mileage: 25000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: mpv.id, name: 'Daihatsu Xenia 2023', brand: 'Daihatsu', model: 'Xenia', year: 2023,
        plateNumber: 'B 2002 KKA', color: 'Putih', transmission: 'MANUAL', fuelType: 'PETROL',
        seats: 7, dailyRate: 275000, weeklyRate: 1650000, monthlyRate: 6000000, depositAmount: 400000,
        images: JSON.stringify(['/vehicles/xenia-1.jpg']), description: 'Daihatsu Xenia, andalan keluarga Indonesia', mileage: 30000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: mpv.id, name: 'Toyota Innova Zenix 2023', brand: 'Toyota', model: 'Innova Zenix', year: 2023,
        plateNumber: 'B 2003 KKA', color: 'Hitam', transmission: 'AUTOMATIC', fuelType: 'HYBRID',
        seats: 7, dailyRate: 550000, weeklyRate: 3300000, monthlyRate: 11000000, depositAmount: 750000,
        images: JSON.stringify(['/vehicles/zenix-1.jpg']), description: 'Innova Zenix Hybrid, MPV premium', mileage: 10000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: mpv.id, name: 'Mitsubishi Xpander 2023', brand: 'Mitsubishi', model: 'Xpander', year: 2023,
        plateNumber: 'B 2004 KKA', color: 'Abu-abu', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 7, dailyRate: 325000, weeklyRate: 1950000, monthlyRate: 7000000, depositAmount: 450000,
        images: JSON.stringify(['/vehicles/xpander-1.jpg']), description: 'Mitsubishi Xpander Cross, tangguh dan stylish', mileage: 18000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: mpv.id, name: 'Suzuki Ertiga 2023', brand: 'Suzuki', model: 'Ertiga', year: 2023,
        plateNumber: 'B 2005 KKA', color: 'Biru', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 7, dailyRate: 300000, weeklyRate: 1800000, monthlyRate: 6500000, depositAmount: 400000,
        images: JSON.stringify(['/vehicles/ertiga-1.jpg']), description: 'Suzuki Ertiga Sport, MPV yang fun to drive', mileage: 22000,
      },
    }),
    // SUV (4)
    prisma.vehicle.create({
      data: {
        categoryId: suv.id, name: 'Toyota Fortuner 2023', brand: 'Toyota', model: 'Fortuner', year: 2023,
        plateNumber: 'B 3001 KKA', color: 'Hitam', transmission: 'AUTOMATIC', fuelType: 'DIESEL',
        seats: 7, dailyRate: 700000, weeklyRate: 4200000, monthlyRate: 14000000, depositAmount: 1000000,
        images: JSON.stringify(['/vehicles/fortuner-1.jpg']), description: 'Toyota Fortuner VRZ, SUV premium', mileage: 35000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: suv.id, name: 'Hyundai Creta 2023', brand: 'Hyundai', model: 'Creta', year: 2023,
        plateNumber: 'B 3002 KKA', color: 'Putih', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 400000, weeklyRate: 2400000, monthlyRate: 8500000, depositAmount: 500000,
        images: JSON.stringify(['/vehicles/creta-1.jpg']), description: 'Hyundai Creta, compact SUV modern', mileage: 8000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: suv.id, name: 'Honda HR-V 2023', brand: 'Honda', model: 'HR-V', year: 2023,
        plateNumber: 'B 3003 KKA', color: 'Merah', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 425000, weeklyRate: 2550000, monthlyRate: 9000000, depositAmount: 500000,
        images: JSON.stringify(['/vehicles/hrv-1.jpg']), description: 'Honda HR-V SE, SUV stylish dan nyaman', mileage: 12000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: suv.id, name: 'Mazda CX-5 2022', brand: 'Mazda', model: 'CX-5', year: 2022,
        plateNumber: 'B 3004 KKA', color: 'Merah Maroon', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 550000, weeklyRate: 3300000, monthlyRate: 11000000, depositAmount: 750000,
        images: JSON.stringify(['/vehicles/cx5-1.jpg']), description: 'Mazda CX-5 Elite, premium SUV Jepang', mileage: 25000,
      },
    }),
    // Motor Listrik (4)
    prisma.vehicle.create({
      data: {
        categoryId: motorListrik.id, name: 'Alva One 2024', brand: 'Alva', model: 'One', year: 2024,
        plateNumber: 'B 4001 KKA', color: 'Hijau', transmission: 'AUTOMATIC', fuelType: 'ELECTRIC',
        seats: 2, dailyRate: 75000, weeklyRate: 450000, monthlyRate: 1500000, depositAmount: 200000,
        images: JSON.stringify(['/vehicles/alva-1.jpg']), description: 'Alva One, motor listrik buatan Indonesia', mileage: 2000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: motorListrik.id, name: 'Gesits G1 2024', brand: 'Gesits', model: 'G1', year: 2024,
        plateNumber: 'B 4002 KKA', color: 'Biru', transmission: 'AUTOMATIC', fuelType: 'ELECTRIC',
        seats: 2, dailyRate: 65000, weeklyRate: 390000, monthlyRate: 1300000, depositAmount: 150000,
        images: JSON.stringify(['/vehicles/gesits-1.jpg']), description: 'Gesits G1, motor listrik nasional', mileage: 3000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: motorListrik.id, name: 'Viar N1 2024', brand: 'Viar', model: 'N1', year: 2024,
        plateNumber: 'B 4003 KKA', color: 'Putih', transmission: 'AUTOMATIC', fuelType: 'ELECTRIC',
        seats: 2, dailyRate: 60000, weeklyRate: 360000, monthlyRate: 1200000, depositAmount: 150000,
        images: JSON.stringify(['/vehicles/viar-1.jpg']), description: 'Viar N1, motor listrik terjangkau', mileage: 5000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: motorListrik.id, name: 'Volta 401 2024', brand: 'Volta', model: '401', year: 2024,
        plateNumber: 'B 4004 KKA', color: 'Hitam', transmission: 'AUTOMATIC', fuelType: 'ELECTRIC',
        seats: 2, dailyRate: 70000, weeklyRate: 420000, monthlyRate: 1400000, depositAmount: 200000,
        images: JSON.stringify(['/vehicles/volta-1.jpg']), description: 'Volta 401, motor listrik bergaya retro', mileage: 1500,
      },
    }),
    // LCGC (3)
    prisma.vehicle.create({
      data: {
        categoryId: lcgc.id, name: 'Toyota Agya 2023', brand: 'Toyota', model: 'Agya', year: 2023,
        plateNumber: 'B 5001 KKA', color: 'Merah', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 200000, weeklyRate: 1200000, monthlyRate: 4000000, depositAmount: 300000,
        images: JSON.stringify(['/vehicles/agya-1.jpg']), description: 'Toyota Agya GR Sport, city car lincah', mileage: 15000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: lcgc.id, name: 'Honda Brio 2023', brand: 'Honda', model: 'Brio', year: 2023,
        plateNumber: 'B 5002 KKA', color: 'Kuning', transmission: 'AUTOMATIC', fuelType: 'PETROL',
        seats: 5, dailyRate: 225000, weeklyRate: 1350000, monthlyRate: 4500000, depositAmount: 300000,
        images: JSON.stringify(['/vehicles/brio-1.jpg']), description: 'Honda Brio RS, LCGC terlaris', mileage: 20000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: lcgc.id, name: 'Wuling Air EV 2024', brand: 'Wuling', model: 'Air EV', year: 2024,
        plateNumber: 'B 5003 KKA', color: 'Biru Muda', transmission: 'AUTOMATIC', fuelType: 'ELECTRIC',
        seats: 4, dailyRate: 250000, weeklyRate: 1500000, monthlyRate: 5000000, depositAmount: 400000,
        images: JSON.stringify(['/vehicles/airev-1.jpg']), description: 'Wuling Air EV, mobil listrik mini terjangkau', mileage: 5000,
      },
    }),
  ]);

  console.log('Created ' + vehicles.length + ' vehicles');

  // Create Bookings (15 bookings in various states)
  const now = new Date();
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: budi.id, vehicleId: vehicles[4].id, startDate: new Date('2024-01-15'), endDate: new Date('2024-01-18'),
        durationDays: 3, totalAmount: 900000, depositAmount: 400000, status: 'COMPLETED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops1.id, approvedAt: new Date('2024-01-14'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: dewi.id, vehicleId: vehicles[0].id, startDate: new Date('2024-01-20'), endDate: new Date('2024-01-25'),
        durationDays: 5, totalAmount: 1750000, depositAmount: 500000, status: 'COMPLETED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops1.id, approvedAt: new Date('2024-01-19'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: ahmad.id, vehicleId: vehicles[6].id, startDate: new Date('2024-02-01'), endDate: new Date('2024-02-08'),
        durationDays: 7, totalAmount: 3850000, depositAmount: 750000, status: 'COMPLETED',
        pickupLocation: 'Bandara Soekarno-Hatta', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops2.id, approvedAt: new Date('2024-01-31'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: rudi.id, vehicleId: vehicles[9].id, startDate: new Date('2024-02-10'), endDate: new Date('2024-02-17'),
        durationDays: 7, totalAmount: 4900000, depositAmount: 1000000, status: 'COMPLETED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops1.id, approvedAt: new Date('2024-02-09'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: budi.id, vehicleId: vehicles[14].id, startDate: new Date('2024-02-20'), endDate: new Date('2024-02-27'),
        durationDays: 7, totalAmount: 525000, depositAmount: 200000, status: 'COMPLETED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops2.id, approvedAt: new Date('2024-02-19'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: dewi.id, vehicleId: vehicles[7].id, startDate: new Date('2024-03-01'), endDate: new Date('2024-03-05'),
        durationDays: 4, totalAmount: 1300000, depositAmount: 450000, status: 'ACTIVE',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Cabang - Jl. Gatot Subroto',
        approvedBy: ops1.id, approvedAt: new Date('2024-02-28'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: ahmad.id, vehicleId: vehicles[1].id, startDate: new Date('2024-03-05'), endDate: new Date('2024-03-10'),
        durationDays: 5, totalAmount: 1875000, depositAmount: 500000, status: 'ACTIVE',
        pickupLocation: 'Bandara Soekarno-Hatta', returnLocation: 'Bandara Soekarno-Hatta',
        approvedBy: ops2.id, approvedAt: new Date('2024-03-04'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: rudi.id, vehicleId: vehicles[16].id, startDate: new Date('2024-03-10'), endDate: new Date('2024-03-17'),
        durationDays: 7, totalAmount: 420000, depositAmount: 150000, status: 'APPROVED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops1.id, approvedAt: new Date('2024-03-09'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: siti.id, vehicleId: vehicles[18].id, startDate: new Date('2024-03-15'), endDate: new Date('2024-03-18'),
        durationDays: 3, totalAmount: 675000, depositAmount: 300000, status: 'APPROVED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops2.id, approvedAt: new Date('2024-03-14'),
      },
    }),
    prisma.booking.create({
      data: {
        userId: budi.id, vehicleId: vehicles[3].id, startDate: new Date('2024-03-20'), endDate: new Date('2024-03-25'),
        durationDays: 5, totalAmount: 2500000, depositAmount: 750000, status: 'PENDING',
        pickupLocation: 'Kantor Cabang - Jl. Gatot Subroto', returnLocation: 'Kantor Cabang - Jl. Gatot Subroto',
      },
    }),
    prisma.booking.create({
      data: {
        userId: dewi.id, vehicleId: vehicles[10].id, startDate: new Date('2024-03-22'), endDate: new Date('2024-03-29'),
        durationDays: 7, totalAmount: 2975000, depositAmount: 500000, status: 'PENDING',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
      },
    }),
    prisma.booking.create({
      data: {
        userId: ahmad.id, vehicleId: vehicles[13].id, startDate: new Date('2024-03-25'), endDate: new Date('2024-03-30'),
        durationDays: 5, totalAmount: 375000, depositAmount: 200000, status: 'PENDING',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
      },
    }),
    prisma.booking.create({
      data: {
        userId: siti.id, vehicleId: vehicles[5].id, startDate: new Date('2024-01-10'), endDate: new Date('2024-01-12'),
        durationDays: 2, totalAmount: 550000, depositAmount: 400000, status: 'CANCELLED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        notes: 'Dibatalkan oleh customer karena perubahan rencana',
      },
    }),
    prisma.booking.create({
      data: {
        userId: rudi.id, vehicleId: vehicles[2].id, startDate: new Date('2024-01-20'), endDate: new Date('2024-01-22'),
        durationDays: 2, totalAmount: 900000, depositAmount: 750000, status: 'REJECTED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        notes: 'Ditolak - dokumen belum lengkap',
      },
    }),
    prisma.booking.create({
      data: {
        userId: budi.id, vehicleId: vehicles[19].id, startDate: new Date('2024-03-01'), endDate: new Date('2024-03-04'),
        durationDays: 3, totalAmount: 750000, depositAmount: 400000, status: 'COMPLETED',
        pickupLocation: 'Kantor Pusat - Jl. Sudirman No. 1', returnLocation: 'Kantor Pusat - Jl. Sudirman No. 1',
        approvedBy: ops1.id, approvedAt: new Date('2024-02-28'),
      },
    }),
  ]);

  console.log('Created ' + bookings.length + ' bookings');

  // Create Payments (10 payments)
  const payments = await Promise.all([
    prisma.payment.create({
      data: {
        bookingId: bookings[0].id, userId: budi.id, amount: 900000,
        paymentMethod: 'BANK_TRANSFER', paymentChannel: 'BCA', externalId: 'PAY-001-XND',
        status: 'PAID', paidAt: new Date('2024-01-14'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[1].id, userId: dewi.id, amount: 1750000,
        paymentMethod: 'VIRTUAL_ACCOUNT', paymentChannel: 'BNI VA', externalId: 'PAY-002-XND',
        status: 'PAID', paidAt: new Date('2024-01-19'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[2].id, userId: ahmad.id, amount: 3850000,
        paymentMethod: 'EWALLET', paymentChannel: 'GoPay', externalId: 'PAY-003-XND',
        status: 'PAID', paidAt: new Date('2024-01-31'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[3].id, userId: rudi.id, amount: 4900000,
        paymentMethod: 'BANK_TRANSFER', paymentChannel: 'Mandiri', externalId: 'PAY-004-XND',
        status: 'PAID', paidAt: new Date('2024-02-09'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[4].id, userId: budi.id, amount: 525000,
        paymentMethod: 'EWALLET', paymentChannel: 'OVO', externalId: 'PAY-005-XND',
        status: 'PAID', paidAt: new Date('2024-02-19'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[5].id, userId: dewi.id, amount: 1300000,
        paymentMethod: 'VIRTUAL_ACCOUNT', paymentChannel: 'BCA VA', externalId: 'PAY-006-XND',
        status: 'PAID', paidAt: new Date('2024-02-28'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[6].id, userId: ahmad.id, amount: 1875000,
        paymentMethod: 'CREDIT_CARD', paymentChannel: 'Visa', externalId: 'PAY-007-XND',
        status: 'PAID', paidAt: new Date('2024-03-04'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[7].id, userId: rudi.id, amount: 420000,
        paymentMethod: 'EWALLET', paymentChannel: 'DANA', externalId: 'PAY-008-XND',
        status: 'PENDING',
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[14].id, userId: budi.id, amount: 750000,
        paymentMethod: 'BANK_TRANSFER', paymentChannel: 'BRI', externalId: 'PAY-009-XND',
        status: 'PAID', paidAt: new Date('2024-02-28'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[9].id, userId: budi.id, amount: 2500000,
        paymentMethod: 'VIRTUAL_ACCOUNT', paymentChannel: 'Permata VA', externalId: 'PAY-010-XND',
        status: 'EXPIRED', expiredAt: new Date('2024-03-21'),
      },
    }),
  ]);

  console.log('Created ' + payments.length + ' payments');

  // Create Maintenance Logs (5)
  await Promise.all([
    prisma.maintenanceLog.create({
      data: {
        vehicleId: vehicles[4].id, type: 'ROUTINE', description: 'Ganti oli mesin dan filter udara',
        cost: 750000, performedBy: maintenance.name, performedAt: new Date('2024-01-10'),
        nextMaintenanceAt: new Date('2024-04-10'),
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        vehicleId: vehicles[0].id, type: 'ROUTINE', description: 'Service berkala 20.000 km - ganti oli, filter, dan brake pad',
        cost: 1500000, performedBy: maintenance.name, performedAt: new Date('2024-01-20'),
        nextMaintenanceAt: new Date('2024-04-20'),
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        vehicleId: vehicles[9].id, type: 'REPAIR', description: 'Perbaikan AC - ganti kompresor',
        cost: 3500000, performedBy: maintenance.name, performedAt: new Date('2024-02-05'),
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        vehicleId: vehicles[14].id, type: 'INSPECTION', description: 'Inspeksi baterai dan motor listrik',
        cost: 250000, performedBy: maintenance.name, performedAt: new Date('2024-02-15'),
        nextMaintenanceAt: new Date('2024-05-15'),
      },
    }),
    prisma.maintenanceLog.create({
      data: {
        vehicleId: vehicles[6].id, type: 'EMERGENCY', description: 'Ban pecah - ganti ban depan kiri dan kanan',
        cost: 2000000, performedBy: maintenance.name, performedAt: new Date('2024-02-25'),
      },
    }),
  ]);

  console.log('Created 5 maintenance logs');

  // Create Promos (3)
  await Promise.all([
    prisma.promo.create({
      data: {
        code: 'NEWDRIVER', name: 'Driver Baru', description: 'Diskon 20% untuk driver baru yang pertama kali booking',
        discountType: 'PERCENTAGE', discountValue: 20, minRentalDays: 1, maxDiscount: 200000,
        usageLimit: 100, usedCount: 23, validFrom: new Date('2024-01-01'), validUntil: new Date('2024-12-31'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'WEEKLY10', name: 'Mingguan Hemat', description: 'Diskon 10% untuk sewa mingguan (7 hari atau lebih)',
        discountType: 'PERCENTAGE', discountValue: 10, minRentalDays: 7, maxDiscount: 500000,
        usageLimit: 50, usedCount: 8, validFrom: new Date('2024-01-01'), validUntil: new Date('2024-06-30'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'MOTORLISTRIK', name: 'Go Electric', description: 'Potongan Rp 50.000 untuk sewa motor listrik',
        discountType: 'FIXED', discountValue: 50000, minRentalDays: 1, maxDiscount: 50000,
        usageLimit: 200, usedCount: 45, validFrom: new Date('2024-01-01'), validUntil: new Date('2024-12-31'),
        isActive: true,
      },
    }),
  ]);

  console.log('Created 3 promos');

  // Create Notifications (5)
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: budi.id, title: 'Booking Disetujui', message: 'Booking Anda untuk Toyota Avanza telah disetujui. Silakan lakukan pembayaran.',
        type: 'BOOKING', isRead: true, data: JSON.stringify({ bookingId: bookings[0].id }),
      },
    }),
    prisma.notification.create({
      data: {
        userId: dewi.id, title: 'Pembayaran Berhasil', message: 'Pembayaran sebesar Rp 1.750.000 telah dikonfirmasi untuk booking Honda City.',
        type: 'PAYMENT', isRead: true, data: JSON.stringify({ paymentId: payments[1].id }),
      },
    }),
    prisma.notification.create({
      data: {
        userId: ahmad.id, title: 'Promo Baru!', message: 'Gunakan kode MOTORLISTRIK untuk potongan Rp 50.000 sewa motor listrik. Berlaku hingga akhir tahun!',
        type: 'PROMO', isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: siti.id, title: 'Verifikasi Diperlukan', message: 'Silakan lengkapi dokumen verifikasi (KTP, SIM, Selfie) untuk mulai booking kendaraan.',
        type: 'VERIFICATION', isRead: false,
      },
    }),
    prisma.notification.create({
      data: {
        userId: rudi.id, title: 'Pengingat Pengembalian', message: 'Kendaraan Toyota Fortuner harus dikembalikan besok pukul 10:00 WIB.',
        type: 'SYSTEM', isRead: false, data: JSON.stringify({ bookingId: bookings[3].id }),
      },
    }),
  ]);

  console.log('Created 5 notifications');

  // Create Support Tickets with Messages (3)
  const ticket1 = await prisma.supportTicket.create({
    data: {
      userId: budi.id, subject: 'Masalah pembayaran tidak terproses',
      description: 'Saya sudah transfer melalui BCA tapi status masih pending setelah 2 jam.',
      category: 'PAYMENT_ISSUE', priority: 'HIGH', status: 'RESOLVED', assignedTo: ops1.id,
    },
  });

  const ticket2 = await prisma.supportTicket.create({
    data: {
      userId: dewi.id, subject: 'Permintaan perpanjangan sewa',
      description: 'Saya ingin memperpanjang sewa Honda City dari 5 hari menjadi 7 hari. Apakah bisa?',
      category: 'BOOKING_ISSUE', priority: 'MEDIUM', status: 'IN_PROGRESS', assignedTo: ops2.id,
    },
  });

  const ticket3 = await prisma.supportTicket.create({
    data: {
      userId: ahmad.id, subject: 'AC mobil tidak dingin',
      description: 'AC mobil Innova Zenix tidak dingin saat perjalanan ke Bandung. Mohon ditindaklanjuti.',
      category: 'VEHICLE_ISSUE', priority: 'HIGH', status: 'OPEN',
    },
  });

  // Create Support Messages
  await Promise.all([
    prisma.supportMessage.create({
      data: {
        ticketId: ticket1.id, senderId: budi.id,
        message: 'Saya sudah transfer Rp 900.000 ke BCA jam 14:00 tadi. Bukti transfer terlampir.',
        attachments: JSON.stringify(['/uploads/bukti-transfer-001.jpg']),
      },
    }),
    prisma.supportMessage.create({
      data: {
        ticketId: ticket1.id, senderId: ops1.id,
        message: 'Terima kasih informasinya. Kami sudah cek dan pembayaran telah dikonfirmasi. Status booking sudah diupdate.',
      },
    }),
    prisma.supportMessage.create({
      data: {
        ticketId: ticket2.id, senderId: dewi.id,
        message: 'Saya butuh mobilnya sampai hari Minggu. Mohon info biaya tambahannya.',
      },
    }),
    prisma.supportMessage.create({
      data: {
        ticketId: ticket2.id, senderId: ops2.id,
        message: 'Bisa, Bu Dewi. Biaya tambahan 2 hari x Rp 350.000 = Rp 700.000. Apakah setuju?',
      },
    }),
    prisma.supportMessage.create({
      data: {
        ticketId: ticket3.id, senderId: ahmad.id,
        message: 'AC hanya keluar angin biasa, tidak dingin sama sekali. Saya sedang dalam perjalanan ke Bandung dan sangat tidak nyaman.',
      },
    }),
  ]);

  console.log('Created 3 support tickets with messages');
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
