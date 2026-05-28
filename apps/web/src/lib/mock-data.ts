export interface Vehicle {
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
  imageUrl: string;
  features: string[];
  status: 'tersedia' | 'disewa' | 'maintenance';
  description: string;
  year: number;
  mileage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  platform: 'Gojek' | 'Grab' | 'Maxim' | 'InDrive';
  quote: string;
  rating: number;
  avatar: string;
}

export interface FAQ {
  id: string;
  category: 'Pendaftaran' | 'Pembayaran' | 'Kendaraan' | 'Pengembalian';
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface Stats {
  totalDrivers: string;
  totalVehicles: string;
  totalCities: number;
  satisfactionRate: string;
}

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Toyota Avanza',
    brand: 'Toyota',
    model: 'Avanza 1.3 E MT',
    category: 'mobil',
    transmission: 'manual',
    fuelType: 'Bensin',
    seats: 7,
    priceDaily: 200000,
    priceWeekly: 1200000,
    priceMonthly: 4000000,
    imageUrl: '/images/vehicles/avanza.jpg',
    features: ['AC Double Blower', 'Power Steering', 'Bluetooth Audio', 'USB Charger', 'Kaca Film'],
    status: 'tersedia',
    description: 'Toyota Avanza 1.3 E MT cocok untuk driver online yang membutuhkan kapasitas penumpang besar. Irit bahan bakar dan nyaman untuk perjalanan jauh.',
    year: 2022,
    mileage: '35.000 km',
  },
  {
    id: 'v2',
    name: 'Honda Brio',
    brand: 'Honda',
    model: 'Brio Satya E CVT',
    category: 'mobil',
    transmission: 'otomatis',
    fuelType: 'Bensin',
    seats: 5,
    priceDaily: 180000,
    priceWeekly: 1080000,
    priceMonthly: 3600000,
    imageUrl: '/images/vehicles/brio.jpg',
    features: ['AC Digital', 'Transmisi CVT', 'Eco Mode', 'Bluetooth Audio', 'Airbag'],
    status: 'tersedia',
    description: 'Honda Brio Satya sangat irit bahan bakar dan lincah di perkotaan. Pilihan tepat untuk driver Grab dan Gojek di area urban.',
    year: 2023,
    mileage: '20.000 km',
  },
  {
    id: 'v3',
    name: 'Daihatsu Sigra',
    brand: 'Daihatsu',
    model: 'Sigra 1.2 R AT',
    category: 'mobil',
    transmission: 'otomatis',
    fuelType: 'Bensin',
    seats: 7,
    priceDaily: 175000,
    priceWeekly: 1050000,
    priceMonthly: 3500000,
    imageUrl: '/images/vehicles/sigra.jpg',
    features: ['AC Double Blower', 'Transmisi Otomatis', 'Touchscreen Head Unit', 'Rear Parking Camera', 'USB Port'],
    status: 'tersedia',
    description: 'Daihatsu Sigra menawarkan ruang kabin luas dengan konsumsi bahan bakar hemat. Ideal untuk layanan ride-hailing dengan banyak penumpang.',
    year: 2022,
    mileage: '40.000 km',
  },
  {
    id: 'v4',
    name: 'Toyota Calya',
    brand: 'Toyota',
    model: 'Calya 1.2 G MT',
    category: 'mobil',
    transmission: 'manual',
    fuelType: 'Bensin',
    seats: 7,
    priceDaily: 165000,
    priceWeekly: 990000,
    priceMonthly: 3300000,
    imageUrl: '/images/vehicles/calya.jpg',
    features: ['AC', 'Power Window', 'Central Lock', 'Audio 2-DIN', 'Fog Lamp'],
    status: 'tersedia',
    description: 'Toyota Calya hadir dengan keandalan Toyota dan harga terjangkau. Sempurna untuk driver online yang ingin memulai dengan modal ringan.',
    year: 2021,
    mileage: '55.000 km',
  },
  {
    id: 'v5',
    name: 'Suzuki Ertiga',
    brand: 'Suzuki',
    model: 'Ertiga GX AT',
    category: 'mobil',
    transmission: 'otomatis',
    fuelType: 'Bensin',
    seats: 7,
    priceDaily: 220000,
    priceWeekly: 1320000,
    priceMonthly: 4400000,
    imageUrl: '/images/vehicles/ertiga.jpg',
    features: ['AC Auto', 'Cruise Control', 'Push Start', 'Rear AC', 'Suzuki Connect'],
    status: 'disewa',
    description: 'Suzuki Ertiga GX menawarkan kenyamanan premium dengan fitur lengkap. Penumpang puas, rating naik, penghasilan bertambah.',
    year: 2023,
    mileage: '15.000 km',
  },
  {
    id: 'v6',
    name: 'Honda Mobilio',
    brand: 'Honda',
    model: 'Mobilio E CVT',
    category: 'mobil',
    transmission: 'otomatis',
    fuelType: 'Bensin',
    seats: 7,
    priceDaily: 190000,
    priceWeekly: 1140000,
    priceMonthly: 3800000,
    imageUrl: '/images/vehicles/mobilio.jpg',
    features: ['AC Digital', 'Eco Mode', 'Immobilizer', 'Power Mirror', 'Sliding Door'],
    status: 'tersedia',
    description: 'Honda Mobilio dengan pintu geser memberikan kemudahan akses penumpang. Sangat diminati untuk layanan GrabCar dan GoCar.',
    year: 2022,
    mileage: '30.000 km',
  },
  {
    id: 'v7',
    name: 'Toyota Agya',
    brand: 'Toyota',
    model: 'Agya 1.2 G AT',
    category: 'mobil',
    transmission: 'otomatis',
    fuelType: 'Bensin',
    seats: 5,
    priceDaily: 150000,
    priceWeekly: 900000,
    priceMonthly: 3000000,
    imageUrl: '/images/vehicles/agya.jpg',
    features: ['AC', 'Transmisi Otomatis', 'Audio Bluetooth', 'Airbag', 'ABS'],
    status: 'tersedia',
    description: 'Toyota Agya adalah pilihan terhemat untuk memulai karir driver online. Irit, andal, dan mudah perawatannya.',
    year: 2023,
    mileage: '10.000 km',
  },
  {
    id: 'v8',
    name: 'Alva One',
    brand: 'Alva',
    model: 'Alva One',
    category: 'motor-listrik',
    transmission: 'otomatis',
    fuelType: 'Listrik',
    seats: 2,
    priceDaily: 50000,
    priceWeekly: 300000,
    priceMonthly: 1000000,
    imageUrl: '/images/vehicles/alva-one.jpg',
    features: ['Motor Listrik', 'Swap Battery', 'Digital Dashboard', 'USB Charging', 'Anti-theft Alarm'],
    status: 'tersedia',
    description: 'Alva One motor listrik dengan sistem swap battery. Biaya operasional sangat rendah, cocok untuk driver ojek online.',
    year: 2024,
    mileage: '5.000 km',
  },
  {
    id: 'v9',
    name: 'Gesits Raya',
    brand: 'Gesits',
    model: 'Gesits Raya',
    category: 'motor-listrik',
    transmission: 'otomatis',
    fuelType: 'Listrik',
    seats: 2,
    priceDaily: 45000,
    priceWeekly: 270000,
    priceMonthly: 900000,
    imageUrl: '/images/vehicles/gesits-raya.jpg',
    features: ['Motor Listrik', 'Portable Battery', 'LCD Speedometer', 'Regenerative Braking', 'Keyless'],
    status: 'tersedia',
    description: 'Gesits Raya produksi Indonesia dengan performa handal. Hemat biaya operasional hingga 80% dibanding motor bensin.',
    year: 2024,
    mileage: '3.000 km',
  },
  {
    id: 'v10',
    name: 'Volta 401',
    brand: 'Volta',
    model: 'Volta 401',
    category: 'motor-listrik',
    transmission: 'otomatis',
    fuelType: 'Listrik',
    seats: 2,
    priceDaily: 55000,
    priceWeekly: 330000,
    priceMonthly: 1100000,
    imageUrl: '/images/vehicles/volta-401.jpg',
    features: ['Motor Listrik', 'Fast Charging', 'GPS Tracker', 'Digital Display', 'Dual Disc Brake'],
    status: 'maintenance',
    description: 'Volta 401 dengan fast charging dan jarak tempuh hingga 100km per charge. Motor listrik premium untuk driver profesional.',
    year: 2024,
    mileage: '8.000 km',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Budi Santoso',
    platform: 'Gojek',
    quote: 'Sejak sewa di Karya Kreatif, penghasilan saya naik 40%. Mobilnya terawat dan prosesnya cepat banget!',
    rating: 5,
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 't2',
    name: 'Ahmad Rizki',
    platform: 'Grab',
    quote: 'Harga sewanya paling bersaing dibanding tempat lain. Kualitas mobilnya juga bagus, penumpang selalu puas.',
    rating: 5,
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 't3',
    name: 'Dewi Rahayu',
    platform: 'Maxim',
    quote: 'Sebagai driver wanita, saya merasa aman karena kondisi kendaraan selalu prima. Tim support-nya juga responsif.',
    rating: 5,
    avatar: '/images/avatars/avatar-3.jpg',
  },
  {
    id: 't4',
    name: 'Hendra Wijaya',
    platform: 'Gojek',
    quote: 'Sudah 2 tahun sewa motor listrik di sini. Hemat banget biaya bensin, penghasilan jadi lebih bersih.',
    rating: 4,
    avatar: '/images/avatars/avatar-4.jpg',
  },
  {
    id: 't5',
    name: 'Siti Nurhaliza',
    platform: 'Grab',
    quote: 'Proses pendaftarannya gampang, cuma butuh KTP dan SIM. Dalam 24 jam sudah bisa mulai narik.',
    rating: 5,
    avatar: '/images/avatars/avatar-5.jpg',
  },
  {
    id: 't6',
    name: 'Rudi Hermawan',
    platform: 'InDrive',
    quote: 'Maintenance rutin bikin saya tenang di jalan. Tidak pernah mogok dan selalu siap pakai setiap hari.',
    rating: 5,
    avatar: '/images/avatars/avatar-6.jpg',
  },
];

export const faqs: FAQ[] = [
  {
    id: 'f1',
    category: 'Pendaftaran',
    question: 'Apa syarat untuk menyewa kendaraan?',
    answer: 'Syarat utama adalah memiliki KTP, SIM yang masih berlaku (SIM A untuk mobil, SIM C untuk motor), dan sudah terdaftar sebagai mitra di platform ojek online (Gojek, Grab, Maxim, atau InDrive). Usia minimal 21 tahun.',
  },
  {
    id: 'f2',
    category: 'Pendaftaran',
    question: 'Berapa lama proses verifikasi dokumen?',
    answer: 'Proses verifikasi dokumen biasanya memakan waktu 1x24 jam kerja. Setelah dokumen diverifikasi, Anda bisa langsung memilih kendaraan dan mulai menyewa.',
  },
  {
    id: 'f3',
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima pembayaran via transfer bank (BCA, BNI, BRI, Mandiri), e-wallet (GoPay, OVO, DANA, ShopeePay), QRIS, dan pembayaran tunai di kantor kami.',
  },
  {
    id: 'f4',
    category: 'Pembayaran',
    question: 'Apakah ada deposit yang harus dibayar?',
    answer: 'Ya, deposit sebesar Rp 1.000.000 untuk mobil dan Rp 500.000 untuk motor listrik. Deposit akan dikembalikan saat pengembalian kendaraan dalam kondisi baik.',
  },
  {
    id: 'f5',
    category: 'Kendaraan',
    question: 'Bagaimana jika kendaraan mengalami kerusakan?',
    answer: 'Untuk kerusakan akibat pemakaian normal, kami yang menanggung biaya perbaikan. Untuk kerusakan akibat kelalaian penyewa, biaya akan dipotong dari deposit atau ditagihkan terpisah.',
  },
  {
    id: 'f6',
    category: 'Kendaraan',
    question: 'Apakah kendaraan sudah termasuk asuransi?',
    answer: 'Ya, semua kendaraan kami sudah dilengkapi asuransi all-risk. Anda tidak perlu khawatir tentang risiko kecelakaan atau kehilangan selama masa sewa.',
  },
  {
    id: 'f7',
    category: 'Pengembalian',
    question: 'Bagaimana prosedur pengembalian kendaraan?',
    answer: 'Pengembalian dilakukan di lokasi pickup yang sama. Tim kami akan melakukan inspeksi digital (foto kondisi kendaraan) saat serah terima. Deposit dikembalikan dalam 1-3 hari kerja.',
  },
  {
    id: 'f8',
    category: 'Pengembalian',
    question: 'Apakah bisa perpanjang masa sewa?',
    answer: 'Tentu! Anda bisa mengajukan perpanjangan minimal 2 hari sebelum masa sewa berakhir melalui aplikasi atau menghubungi tim kami via WhatsApp.',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'tips-maksimalkan-penghasilan-driver-online',
    title: 'Tips Maksimalkan Penghasilan sebagai Driver Online',
    excerpt: 'Pelajari strategi jitu untuk meningkatkan pendapatan harian Anda sebagai driver ojek online di Jakarta.',
    content: 'Menjadi driver online bukan hanya soal mengendarai kendaraan. Ada banyak strategi yang bisa Anda terapkan untuk memaksimalkan penghasilan harian. Pertama, pilih jam-jam sibuk (peak hours) seperti pagi hari (06.00-09.00) dan sore hari (16.00-20.00). Kedua, posisikan diri di area dengan permintaan tinggi seperti perkantoran, mall, dan stasiun. Ketiga, jaga rating Anda tetap tinggi dengan memberikan pelayanan terbaik. Rating tinggi berarti lebih banyak order masuk.',
    category: 'Tips Driver',
    author: 'Tim Karya Kreatif',
    date: '2024-01-15',
    imageUrl: '/images/blog/tips-penghasilan.jpg',
  },
  {
    id: 'b2',
    slug: 'keuntungan-motor-listrik-untuk-ojol',
    title: 'Keuntungan Motor Listrik untuk Driver Ojek Online',
    excerpt: 'Motor listrik bisa menghemat biaya operasional hingga 80%. Simak analisis lengkapnya di sini.',
    content: 'Motor listrik semakin populer di kalangan driver ojek online. Dengan biaya pengisian yang hanya Rp 3.000-5.000 per charge (setara 50-80km), Anda bisa menghemat hingga 80% dibandingkan motor bensin. Selain itu, motor listrik minim perawatan karena tidak ada oli mesin, filter, atau busi yang perlu diganti. Dengan sewa motor listrik di Karya Kreatif Andalan mulai dari Rp 45.000/hari, Anda bisa mulai merasakan keuntungan ini segera.',
    category: 'Kendaraan Listrik',
    author: 'Tim Karya Kreatif',
    date: '2024-02-01',
    imageUrl: '/images/blog/motor-listrik.jpg',
  },
  {
    id: 'b3',
    slug: 'panduan-lengkap-daftar-driver-online',
    title: 'Panduan Lengkap Daftar Menjadi Driver Online 2024',
    excerpt: 'Langkah demi langkah cara mendaftar sebagai mitra Gojek, Grab, Maxim, dan InDrive.',
    content: 'Ingin memulai karir sebagai driver online? Berikut panduan lengkap pendaftaran di berbagai platform. Untuk Gojek: download aplikasi GoCar/GoBike Driver, siapkan KTP, SIM, STNK, dan SKCK. Untuk Grab: daftar via website resmi, upload dokumen, dan tunggu verifikasi. Proses biasanya memakan waktu 3-7 hari kerja. Di Karya Kreatif Andalan, kami membantu proses pendaftaran Anda agar lebih cepat dan mudah.',
    category: 'Panduan',
    author: 'Tim Karya Kreatif',
    date: '2024-02-15',
    imageUrl: '/images/blog/panduan-daftar.jpg',
  },
  {
    id: 'b4',
    slug: 'cara-jaga-rating-tinggi-driver',
    title: 'Cara Menjaga Rating Tinggi sebagai Driver Online',
    excerpt: 'Rating tinggi = lebih banyak order. Pelajari cara mempertahankan rating bintang 5 Anda.',
    content: 'Rating adalah aset terpenting seorang driver online. Rating tinggi membuat Anda prioritas mendapat order dan bisa mengakses bonus. Tips menjaga rating: 1) Selalu jaga kebersihan kendaraan, 2) Sapa penumpang dengan ramah, 3) Gunakan AC dan pastikan kendaraan nyaman, 4) Ikuti rute yang disarankan penumpang, 5) Sediakan air mineral dan permen. Dengan kendaraan terawat dari Karya Kreatif Andalan, poin 1 dan 3 sudah terjamin!',
    category: 'Tips Driver',
    author: 'Tim Karya Kreatif',
    date: '2024-03-01',
    imageUrl: '/images/blog/rating-driver.jpg',
  },
];

export const stats: Stats = {
  totalDrivers: '500+',
  totalVehicles: '150+',
  totalCities: 3,
  satisfactionRate: '98%',
};
