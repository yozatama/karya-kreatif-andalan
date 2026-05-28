import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const roles = await Promise.all([
    prisma.role.create({ data: { name: 'super_admin', description: 'Super Administrator dengan akses penuh' } }),
    prisma.role.create({ data: { name: 'operational_admin', description: 'Admin operasional untuk manajemen booking dan kendaraan' } }),
    prisma.role.create({ data: { name: 'finance_admin', description: 'Admin keuangan untuk manajemen pembayaran dan invoice' } }),
    prisma.role.create({ data: { name: 'maintenance_team', description: 'Tim maintenance kendaraan' } }),
    prisma.role.create({ data: { name: 'driver', description: 'Penyewa kendaraan' } }),
  ]);

  console.log(`Created ${roles.length} roles`);

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // Create admin users
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@karya.id',
      name: 'Super Admin',
      phone: '081234567890',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  const opsAdmin = await prisma.user.create({
    data: {
      email: 'ops@karya.id',
      name: 'Admin Operasional',
      phone: '081234567891',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  const finAdmin = await prisma.user.create({
    data: {
      email: 'finance@karya.id',
      name: 'Admin Keuangan',
      phone: '081234567892',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  const maintUser = await prisma.user.create({
    data: {
      email: 'maintenance@karya.id',
      name: 'Tim Maintenance',
      phone: '081234567893',
      passwordHash,
      status: 'ACTIVE',
    },
  });

  // Create driver users
  const drivers = await Promise.all([
    prisma.user.create({ data: { email: 'budi@gmail.com', name: 'Budi Santoso', phone: '081345678901', passwordHash, status: 'ACTIVE' } }),
    prisma.user.create({ data: { email: 'siti@gmail.com', name: 'Siti Nurhaliza', phone: '081345678902', passwordHash, status: 'ACTIVE' } }),
    prisma.user.create({ data: { email: 'agus@gmail.com', name: 'Agus Prasetyo', phone: '081345678903', passwordHash, status: 'ACTIVE' } }),
    prisma.user.create({ data: { email: 'dewi@gmail.com', name: 'Dewi Lestari', phone: '081345678904', passwordHash, status: 'ACTIVE' } }),
    prisma.user.create({ data: { email: 'rudi@gmail.com', name: 'Rudi Hermawan', phone: '081345678905', passwordHash, status: 'ACTIVE' } }),
  ]);

  console.log(`Created ${4 + drivers.length} users`);

  // Assign roles
  await Promise.all([
    prisma.userRole.create({ data: { userId: superAdmin.id, roleId: roles[0].id } }),
    prisma.userRole.create({ data: { userId: opsAdmin.id, roleId: roles[1].id } }),
    prisma.userRole.create({ data: { userId: finAdmin.id, roleId: roles[2].id } }),
    prisma.userRole.create({ data: { userId: maintUser.id, roleId: roles[3].id } }),
    ...drivers.map((driver) => prisma.userRole.create({ data: { userId: driver.id, roleId: roles[4].id } })),
  ]);

  console.log('Assigned roles to users');

  // Create vehicle categories
  const categories = await Promise.all([
    prisma.vehicleCategory.create({
      data: { name: 'Sedan/Hatchback', slug: 'sedan-hatchback', description: 'Mobil sedan dan hatchback untuk perjalanan personal' },
    }),
    prisma.vehicleCategory.create({
      data: { name: 'MPV/Minivan', slug: 'mpv-minivan', description: 'Mobil keluarga dengan kapasitas besar' },
    }),
    prisma.vehicleCategory.create({
      data: { name: 'Motor Listrik', slug: 'motor-listrik', description: 'Sepeda motor listrik ramah lingkungan' },
    }),
  ]);

  console.log(`Created ${categories.length} vehicle categories`);

  // Create vehicles
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        categoryId: categories[1].id,
        name: 'Toyota Avanza 2023',
        brand: 'Toyota',
        model: 'Avanza',
        year: 2023,
        licensePlate: 'B 1234 KRA',
        color: 'Putih',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        priceDaily: 350000,
        priceWeekly: 2100000,
        priceMonthly: 7500000,
        status: 'AVAILABLE',
        description: 'Toyota Avanza terbaru dengan fitur lengkap',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering', 'Airbag', 'ABS']),
        mileage: 15000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[0].id,
        name: 'Honda Brio 2023',
        brand: 'Honda',
        model: 'Brio',
        year: 2023,
        licensePlate: 'B 2345 KRA',
        color: 'Merah',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 5,
        priceDaily: 200000,
        priceWeekly: 1200000,
        priceMonthly: 4200000,
        status: 'AVAILABLE',
        description: 'Honda Brio city car yang irit dan nyaman',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering', 'Airbag']),
        mileage: 8000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[0].id,
        name: 'Daihatsu Sigra 2022',
        brand: 'Daihatsu',
        model: 'Sigra',
        year: 2022,
        licensePlate: 'B 3456 KRA',
        color: 'Silver',
        transmission: 'MANUAL',
        fuelType: 'GASOLINE',
        seats: 7,
        priceDaily: 180000,
        priceWeekly: 1080000,
        priceMonthly: 3800000,
        status: 'AVAILABLE',
        description: 'Daihatsu Sigra LCGC dengan kapasitas 7 penumpang',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering']),
        mileage: 25000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[0].id,
        name: 'Toyota Calya 2023',
        brand: 'Toyota',
        model: 'Calya',
        year: 2023,
        licensePlate: 'B 4567 KRA',
        color: 'Hitam',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        priceDaily: 200000,
        priceWeekly: 1200000,
        priceMonthly: 4000000,
        status: 'RENTED',
        description: 'Toyota Calya LCGC irit bahan bakar',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering', 'Airbag']),
        mileage: 12000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[1].id,
        name: 'Suzuki Ertiga 2023',
        brand: 'Suzuki',
        model: 'Ertiga',
        year: 2023,
        licensePlate: 'B 5678 KRA',
        color: 'Abu-abu',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        priceDaily: 300000,
        priceWeekly: 1800000,
        priceMonthly: 6500000,
        status: 'AVAILABLE',
        description: 'Suzuki Ertiga MPV keluarga nyaman',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering', 'Airbag', 'ABS', 'Rear Camera']),
        mileage: 10000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[1].id,
        name: 'Honda Mobilio 2022',
        brand: 'Honda',
        model: 'Mobilio',
        year: 2022,
        licensePlate: 'B 6789 KRA',
        color: 'Putih',
        transmission: 'AUTOMATIC',
        fuelType: 'GASOLINE',
        seats: 7,
        priceDaily: 280000,
        priceWeekly: 1680000,
        priceMonthly: 6000000,
        status: 'MAINTENANCE',
        description: 'Honda Mobilio MPV dengan kabin luas',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering', 'Airbag']),
        mileage: 35000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[0].id,
        name: 'Toyota Agya 2023',
        brand: 'Toyota',
        model: 'Agya',
        year: 2023,
        licensePlate: 'B 7890 KRA',
        color: 'Kuning',
        transmission: 'MANUAL',
        fuelType: 'GASOLINE',
        seats: 5,
        priceDaily: 150000,
        priceWeekly: 900000,
        priceMonthly: 3000000,
        status: 'AVAILABLE',
        description: 'Toyota Agya city car paling terjangkau',
        features: JSON.stringify(['AC', 'Audio', 'Power Steering']),
        mileage: 5000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[2].id,
        name: 'Alva One 2024',
        brand: 'Alva',
        model: 'One',
        year: 2024,
        licensePlate: 'B 8901 KRA',
        color: 'Hitam',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        priceDaily: 150000,
        priceWeekly: 900000,
        priceMonthly: 3200000,
        status: 'AVAILABLE',
        description: 'Motor listrik Alva One dengan jarak tempuh 100km',
        features: JSON.stringify(['Digital Display', 'USB Charging', 'Keyless']),
        mileage: 2000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[2].id,
        name: 'Gesits Raya 2024',
        brand: 'Gesits',
        model: 'Raya',
        year: 2024,
        licensePlate: 'B 9012 KRA',
        color: 'Biru',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        priceDaily: 175000,
        priceWeekly: 1050000,
        priceMonthly: 3500000,
        status: 'AVAILABLE',
        description: 'Gesits Raya motor listrik lokal berkualitas',
        features: JSON.stringify(['Digital Display', 'GPS Tracker', 'Anti-theft']),
        mileage: 3000,
      },
    }),
    prisma.vehicle.create({
      data: {
        categoryId: categories[2].id,
        name: 'Volta 401 2024',
        brand: 'Volta',
        model: '401',
        year: 2024,
        licensePlate: 'B 0123 KRA',
        color: 'Putih',
        transmission: 'AUTOMATIC',
        fuelType: 'ELECTRIC',
        seats: 2,
        priceDaily: 160000,
        priceWeekly: 960000,
        priceMonthly: 3400000,
        status: 'AVAILABLE',
        description: 'Volta 401 motor listrik untuk mobilitas urban',
        features: JSON.stringify(['Digital Display', 'Regenerative Braking', 'Fast Charging']),
        mileage: 1500,
      },
    }),
  ]);

  console.log(`Created ${vehicles.length} vehicles`);

  // Create sample bookings
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        userId: drivers[0].id,
        vehicleId: vehicles[0].id,
        startDate: new Date('2024-12-01'),
        endDate: new Date('2024-12-07'),
        pickupLocation: 'Kantor Karya - Jakarta Selatan',
        status: 'COMPLETED',
        totalAmount: 2100000,
        depositAmount: 500000,
        notes: 'Rental untuk liburan keluarga',
      },
    }),
    prisma.booking.create({
      data: {
        userId: drivers[1].id,
        vehicleId: vehicles[3].id,
        startDate: new Date('2024-12-15'),
        endDate: new Date('2024-12-20'),
        pickupLocation: 'Kantor Karya - Jakarta Selatan',
        status: 'ACTIVE',
        totalAmount: 1000000,
        depositAmount: 300000,
      },
    }),
    prisma.booking.create({
      data: {
        userId: drivers[2].id,
        vehicleId: vehicles[4].id,
        startDate: new Date('2025-01-05'),
        endDate: new Date('2025-01-10'),
        pickupLocation: 'Kantor Karya - Tangerang',
        status: 'CONFIRMED',
        totalAmount: 1500000,
        depositAmount: 400000,
      },
    }),
    prisma.booking.create({
      data: {
        userId: drivers[3].id,
        vehicleId: vehicles[7].id,
        startDate: new Date('2025-01-10'),
        endDate: new Date('2025-01-12'),
        pickupLocation: 'Kantor Karya - Jakarta Selatan',
        status: 'PENDING',
        totalAmount: 300000,
        depositAmount: 100000,
      },
    }),
    prisma.booking.create({
      data: {
        userId: drivers[4].id,
        vehicleId: vehicles[1].id,
        startDate: new Date('2024-11-20'),
        endDate: new Date('2024-11-25'),
        pickupLocation: 'Kantor Karya - Jakarta Selatan',
        status: 'CANCELLED',
        totalAmount: 1000000,
        depositAmount: 300000,
        notes: 'Dibatalkan oleh pelanggan',
      },
    }),
  ]);

  console.log(`Created ${bookings.length} bookings`);

  // Create promo codes
  const promos = await Promise.all([
    prisma.promo.create({
      data: {
        code: 'WELCOME10',
        type: 'PERCENTAGE',
        value: 10,
        minRentalDays: 3,
        maxUses: 100,
        usedCount: 12,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'HEMAT50K',
        type: 'FIXED_AMOUNT',
        value: 50000,
        minRentalDays: 1,
        maxUses: 50,
        usedCount: 5,
        validFrom: new Date('2024-06-01'),
        validUntil: new Date('2025-06-30'),
        isActive: true,
      },
    }),
    prisma.promo.create({
      data: {
        code: 'LONGRENT',
        type: 'FREE_DAY',
        value: 1,
        minRentalDays: 7,
        maxUses: 30,
        usedCount: 3,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2025-12-31'),
        isActive: true,
      },
    }),
  ]);

  console.log(`Created ${promos.length} promo codes`);

  // Create FAQ entries in Indonesian
  await Promise.all([
    prisma.fAQ.create({
      data: {
        question: 'Bagaimana cara menyewa kendaraan di Karya Kreatif Andalan?',
        answer: 'Anda cukup membuat akun, pilih kendaraan yang diinginkan, tentukan tanggal sewa, dan lakukan pembayaran. Kendaraan akan disiapkan di lokasi pickup yang dipilih.',
        category: 'Umum',
        order: 1,
        isActive: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Apa saja dokumen yang diperlukan untuk menyewa?',
        answer: 'Anda memerlukan KTP yang masih berlaku dan SIM yang sesuai dengan jenis kendaraan yang disewa. Semua dokumen akan diverifikasi oleh tim kami.',
        category: 'Persyaratan',
        order: 2,
        isActive: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana), kartu kredit, dan pembayaran tunai di kantor kami.',
        category: 'Pembayaran',
        order: 3,
        isActive: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Bagaimana kebijakan pembatalan sewa?',
        answer: 'Pembatalan H-3 sebelum tanggal mulai sewa akan mendapat refund 100%. H-1 mendapat refund 50%. Pembatalan di hari yang sama tidak mendapat refund.',
        category: 'Kebijakan',
        order: 4,
        isActive: true,
      },
    }),
    prisma.fAQ.create({
      data: {
        question: 'Apakah ada biaya tambahan jika terlambat mengembalikan?',
        answer: 'Ya, keterlambatan akan dikenakan denda sebesar 150% dari harga harian per hari keterlambatan. Harap kembalikan kendaraan tepat waktu.',
        category: 'Kebijakan',
        order: 5,
        isActive: true,
      },
    }),
  ]);

  console.log('Created 5 FAQ entries');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
