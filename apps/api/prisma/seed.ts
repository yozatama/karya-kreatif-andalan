import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'SUPER_ADMIN' },
      update: {},
      create: { name: 'SUPER_ADMIN', description: 'Super administrator with full access' },
    }),
    prisma.role.upsert({
      where: { name: 'OPERATIONAL_ADMIN' },
      update: {},
      create: { name: 'OPERATIONAL_ADMIN', description: 'Operational administration' },
    }),
    prisma.role.upsert({
      where: { name: 'FINANCE_ADMIN' },
      update: {},
      create: { name: 'FINANCE_ADMIN', description: 'Finance administration' },
    }),
    prisma.role.upsert({
      where: { name: 'MAINTENANCE_TEAM' },
      update: {},
      create: { name: 'MAINTENANCE_TEAM', description: 'Vehicle maintenance team' },
    }),
    prisma.role.upsert({
      where: { name: 'DRIVER' },
      update: {},
      create: { name: 'DRIVER', description: 'Driver/customer user' },
    }),
  ]);

  const [superAdmin, opAdmin, finAdmin, maintenance, driver] = roles;

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@karyakreatif.co.id' },
      update: {},
      create: {
        email: 'admin@karyakreatif.co.id',
        password: hashedPassword,
        firstName: 'Budi',
        lastName: 'Santoso',
        phone: '+6281234567890',
        platform: 'OTHER',
        roleId: superAdmin.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'ops@karyakreatif.co.id' },
      update: {},
      create: {
        email: 'ops@karyakreatif.co.id',
        password: hashedPassword,
        firstName: 'Siti',
        lastName: 'Rahayu',
        phone: '+6281234567891',
        platform: 'OTHER',
        roleId: opAdmin.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'finance@karyakreatif.co.id' },
      update: {},
      create: {
        email: 'finance@karyakreatif.co.id',
        password: hashedPassword,
        firstName: 'Ahmad',
        lastName: 'Hidayat',
        phone: '+6281234567892',
        platform: 'OTHER',
        roleId: finAdmin.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'maintenance@karyakreatif.co.id' },
      update: {},
      create: {
        email: 'maintenance@karyakreatif.co.id',
        password: hashedPassword,
        firstName: 'Joko',
        lastName: 'Widodo',
        phone: '+6281234567893',
        platform: 'OTHER',
        roleId: maintenance.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver1@gmail.com' },
      update: {},
      create: {
        email: 'driver1@gmail.com',
        password: hashedPassword,
        firstName: 'Andi',
        lastName: 'Pratama',
        phone: '+6281345678901',
        platform: 'GRAB',
        roleId: driver.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver2@gmail.com' },
      update: {},
      create: {
        email: 'driver2@gmail.com',
        password: hashedPassword,
        firstName: 'Dewi',
        lastName: 'Lestari',
        phone: '+6281345678902',
        platform: 'GOJEK',
        roleId: driver.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver3@gmail.com' },
      update: {},
      create: {
        email: 'driver3@gmail.com',
        password: hashedPassword,
        firstName: 'Rudi',
        lastName: 'Hartono',
        phone: '+6281345678903',
        platform: 'MAXIM',
        roleId: driver.id,
        isVerified: false,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver4@gmail.com' },
      update: {},
      create: {
        email: 'driver4@gmail.com',
        password: hashedPassword,
        firstName: 'Maya',
        lastName: 'Sari',
        phone: '+6281345678904',
        platform: 'GRAB',
        roleId: driver.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver5@gmail.com' },
      update: {},
      create: {
        email: 'driver5@gmail.com',
        password: hashedPassword,
        firstName: 'Fahri',
        lastName: 'Ramadhan',
        phone: '+6281345678905',
        platform: 'INDRIVER',
        roleId: driver.id,
        isVerified: true,
      },
    }),
    prisma.user.upsert({
      where: { email: 'driver6@gmail.com' },
      update: {},
      create: {
        email: 'driver6@gmail.com',
        password: hashedPassword,
        firstName: 'Nisa',
        lastName: 'Putri',
        phone: '+6281345678906',
        platform: 'GOJEK',
        roleId: driver.id,
        isVerified: true,
      },
    }),
  ]);

  // Create vehicle categories
  const categories = await Promise.all([
    prisma.vehicleCategory.upsert({
      where: { name: 'City Car' },
      update: {},
      create: { name: 'City Car', description: 'Compact cars for city driving', icon: 'car' },
    }),
    prisma.vehicleCategory.upsert({
      where: { name: 'SUV' },
      update: {},
      create: { name: 'SUV', description: 'Sport Utility Vehicles', icon: 'truck' },
    }),
    prisma.vehicleCategory.upsert({
      where: { name: 'MPV' },
      update: {},
      create: { name: 'MPV', description: 'Multi-Purpose Vehicles', icon: 'bus' },
    }),
    prisma.vehicleCategory.upsert({
      where: { name: 'Electric Motorcycle' },
      update: {},
      create: { name: 'Electric Motorcycle', description: 'Electric-powered motorcycles', icon: 'zap' },
    }),
    prisma.vehicleCategory.upsert({
      where: { name: 'Premium' },
      update: {},
      create: { name: 'Premium', description: 'Premium and luxury vehicles', icon: 'star' },
    }),
  ]);

  const [cityCar, suv, mpv, electricMotorcycle, premium] = categories;

  // Create vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        name: 'Toyota Avanza 2023',
        brand: 'Toyota',
        model: 'Avanza',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 1234 KKA',
        color: 'Silver',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 350000,
        pricePerWeek: 2100000,
        pricePerMonth: 7500000,
        deposit: 1000000,
        categoryId: mpv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Honda Brio 2023',
        brand: 'Honda',
        model: 'Brio',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 5678 KKA',
        color: 'White',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 5,
        pricePerDay: 280000,
        pricePerWeek: 1700000,
        pricePerMonth: 6000000,
        deposit: 800000,
        categoryId: cityCar.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Daihatsu Xenia 2022',
        brand: 'Daihatsu',
        model: 'Xenia',
        year: 2022,
        type: 'CAR',
        licensePlate: 'B 9012 KKA',
        color: 'Black',
        transmission: 'MANUAL',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 300000,
        pricePerWeek: 1800000,
        pricePerMonth: 6500000,
        deposit: 900000,
        categoryId: mpv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Suzuki Ertiga 2023',
        brand: 'Suzuki',
        model: 'Ertiga',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 3456 KKA',
        color: 'Red',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 320000,
        pricePerWeek: 1900000,
        pricePerMonth: 7000000,
        deposit: 900000,
        categoryId: mpv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Toyota Rush 2023',
        brand: 'Toyota',
        model: 'Rush',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 7890 KKA',
        color: 'Grey',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 400000,
        pricePerWeek: 2400000,
        pricePerMonth: 8500000,
        deposit: 1200000,
        categoryId: suv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Toyota Innova Zenix 2024',
        brand: 'Toyota',
        model: 'Innova Zenix',
        year: 2024,
        type: 'CAR',
        licensePlate: 'B 1111 KKA',
        color: 'Black',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 550000,
        pricePerWeek: 3300000,
        pricePerMonth: 12000000,
        deposit: 2000000,
        categoryId: premium.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Honda Brio RS 2024',
        brand: 'Honda',
        model: 'Brio RS',
        year: 2024,
        type: 'CAR',
        licensePlate: 'B 2222 KKA',
        color: 'Yellow',
        transmission: 'CVT',
        fuelType: 'GASOLINE',
        seats: 5,
        pricePerDay: 320000,
        pricePerWeek: 1900000,
        pricePerMonth: 6800000,
        deposit: 850000,
        categoryId: cityCar.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Daihatsu Terios 2023',
        brand: 'Daihatsu',
        model: 'Terios',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 3333 KKA',
        color: 'White',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 380000,
        pricePerWeek: 2280000,
        pricePerMonth: 8000000,
        deposit: 1100000,
        categoryId: suv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Suzuki XL7 2023',
        brand: 'Suzuki',
        model: 'XL7',
        year: 2023,
        type: 'CAR',
        licensePlate: 'B 4444 KKA',
        color: 'Blue',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 370000,
        pricePerWeek: 2200000,
        pricePerMonth: 7800000,
        deposit: 1050000,
        categoryId: suv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Toyota Avanza 2022',
        brand: 'Toyota',
        model: 'Avanza',
        year: 2022,
        type: 'CAR',
        licensePlate: 'B 5555 KKA',
        color: 'Silver',
        transmission: 'MANUAL',
        fuelType: 'GASOLINE',
        seats: 7,
        pricePerDay: 300000,
        pricePerWeek: 1800000,
        pricePerMonth: 6500000,
        deposit: 900000,
        categoryId: mpv.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Viar Q1 2024',
        brand: 'Viar',
        model: 'Q1',
        year: 2024,
        type: 'MOTORCYCLE',
        licensePlate: 'B 6666 KKA',
        color: 'Green',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        pricePerDay: 75000,
        pricePerWeek: 450000,
        pricePerMonth: 1500000,
        deposit: 500000,
        categoryId: electricMotorcycle.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Gesits G1 2024',
        brand: 'Gesits',
        model: 'G1',
        year: 2024,
        type: 'MOTORCYCLE',
        licensePlate: 'B 7777 KKA',
        color: 'White',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        pricePerDay: 85000,
        pricePerWeek: 500000,
        pricePerMonth: 1700000,
        deposit: 500000,
        categoryId: electricMotorcycle.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Selis E-Max 2024',
        brand: 'Selis',
        model: 'E-Max',
        year: 2024,
        type: 'MOTORCYCLE',
        licensePlate: 'B 8888 KKA',
        color: 'Red',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        pricePerDay: 70000,
        pricePerWeek: 420000,
        pricePerMonth: 1400000,
        deposit: 400000,
        categoryId: electricMotorcycle.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Viar N1 2023',
        brand: 'Viar',
        model: 'N1',
        year: 2023,
        type: 'MOTORCYCLE',
        licensePlate: 'B 9999 KKA',
        color: 'Blue',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        pricePerDay: 65000,
        pricePerWeek: 390000,
        pricePerMonth: 1300000,
        deposit: 400000,
        categoryId: electricMotorcycle.id,
      },
    }),
    prisma.vehicle.create({
      data: {
        name: 'Gesits Raya 2024',
        brand: 'Gesits',
        model: 'Raya',
        year: 2024,
        type: 'MOTORCYCLE',
        licensePlate: 'B 1010 KKA',
        color: 'Black',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        pricePerDay: 90000,
        pricePerWeek: 540000,
        pricePerMonth: 1800000,
        deposit: 600000,
        categoryId: electricMotorcycle.id,
      },
    }),
  ]);

  // Create bookings in different states
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: users[4].id, // driver1
        vehicleId: vehicles[0].id,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-08'),
        duration: 7,
        totalPrice: 2450000,
        depositAmount: 1000000,
        status: 'PENDING',
        pickupLocation: 'Jl. Sudirman No. 1, Jakarta Pusat',
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[5].id, // driver2
        vehicleId: vehicles[1].id,
        startDate: new Date('2024-02-05'),
        endDate: new Date('2024-02-12'),
        duration: 7,
        totalPrice: 1960000,
        depositAmount: 800000,
        status: 'APPROVED',
        pickupLocation: 'Jl. Gatot Subroto No. 15, Jakarta Selatan',
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[6].id, // driver3
        vehicleId: vehicles[10].id,
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-02-20'),
        duration: 30,
        totalPrice: 1500000,
        depositAmount: 500000,
        status: 'ACTIVE',
        pickupLocation: 'Jl. Kemang Raya No. 8, Jakarta Selatan',
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[7].id, // driver4
        vehicleId: vehicles[3].id,
        startDate: new Date('2024-01-10'),
        endDate: new Date('2024-01-17'),
        duration: 7,
        totalPrice: 2240000,
        depositAmount: 900000,
        status: 'COMPLETED',
        pickupLocation: 'Jl. Thamrin No. 20, Jakarta Pusat',
      },
    }),
    prisma.booking.create({
      data: {
        userId: users[8].id, // driver5
        vehicleId: vehicles[4].id,
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-17'),
        duration: 7,
        totalPrice: 2800000,
        depositAmount: 1200000,
        status: 'CANCELLED',
        pickupLocation: 'Jl. Rasuna Said No. 5, Jakarta Selatan',
        notes: 'Customer cancelled due to schedule change',
      },
    }),
  ]);

  // Create payments for bookings
  await Promise.all([
    prisma.payment.create({
      data: {
        bookingId: bookings[1].id,
        amount: 800000,
        method: 'VIRTUAL_ACCOUNT',
        status: 'PAID',
        xenditId: 'va_seed_001',
        paidAt: new Date('2024-02-04'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[2].id,
        amount: 500000,
        method: 'EWALLET',
        status: 'PAID',
        xenditId: 'ew_seed_002',
        paidAt: new Date('2024-01-19'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[2].id,
        amount: 1500000,
        method: 'QRIS',
        status: 'PAID',
        xenditId: 'qr_seed_003',
        paidAt: new Date('2024-01-20'),
      },
    }),
    prisma.payment.create({
      data: {
        bookingId: bookings[3].id,
        amount: 3140000,
        method: 'VIRTUAL_ACCOUNT',
        status: 'PAID',
        xenditId: 'va_seed_004',
        paidAt: new Date('2024-01-09'),
      },
    }),
  ]);

  // Create promo codes
  await Promise.all([
    prisma.promo.create({
      data: {
        code: 'WELCOME25',
        type: 'PERCENTAGE',
        value: 25,
        minRentalDays: 3,
        maxDiscount: 500000,
        usageLimit: 100,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'MOTOR50K',
        type: 'FIXED',
        value: 50000,
        minRentalDays: 7,
        maxDiscount: null,
        usageLimit: 50,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-06-30'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'LONGTERM15',
        type: 'PERCENTAGE',
        value: 15,
        minRentalDays: 30,
        maxDiscount: 2000000,
        usageLimit: null,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31'),
        isActive: true,
      },
    }),
  ]);

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
