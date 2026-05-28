export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: 'car' | 'motorcycle';
  image: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  transmission: 'manual' | 'automatic';
  year: number;
  seats: number;
  rating: number;
  isAvailable: boolean;
  category: string;
  fuelType: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  platform: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Payment' | 'Vehicle' | 'Account';
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

export interface RentalStep {
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface PartnershipTier {
  name: string;
  benefits: string[];
  requirements: string[];
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Avanza 2023',
    brand: 'Toyota',
    model: 'Avanza',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 250000,
    pricePerWeek: 1500000,
    pricePerMonth: 5000000,
    transmission: 'automatic',
    year: 2023,
    seats: 7,
    rating: 4.8,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Hitam',
  },
  {
    id: '2',
    name: 'Daihatsu Xenia 2023',
    brand: 'Daihatsu',
    model: 'Xenia',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 220000,
    pricePerWeek: 1350000,
    pricePerMonth: 4500000,
    transmission: 'automatic',
    year: 2023,
    seats: 7,
    rating: 4.6,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Putih',
  },
  {
    id: '3',
    name: 'Honda Brio 2024',
    brand: 'Honda',
    model: 'Brio',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 200000,
    pricePerWeek: 1200000,
    pricePerMonth: 4000000,
    transmission: 'automatic',
    year: 2024,
    seats: 5,
    rating: 4.7,
    isAvailable: true,
    category: 'Hatchback',
    fuelType: 'Bensin',
    color: 'Silver',
  },
  {
    id: '4',
    name: 'Toyota Calya 2023',
    brand: 'Toyota',
    model: 'Calya',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 200000,
    pricePerWeek: 1200000,
    pricePerMonth: 4000000,
    transmission: 'manual',
    year: 2023,
    seats: 7,
    rating: 4.5,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Hitam',
  },
  {
    id: '5',
    name: 'Suzuki Ertiga 2023',
    brand: 'Suzuki',
    model: 'Ertiga',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 260000,
    pricePerWeek: 1600000,
    pricePerMonth: 5200000,
    transmission: 'automatic',
    year: 2023,
    seats: 7,
    rating: 4.7,
    isAvailable: false,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Abu-abu',
  },
  {
    id: '6',
    name: 'Daihatsu Sigra 2023',
    brand: 'Daihatsu',
    model: 'Sigra',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 190000,
    pricePerWeek: 1100000,
    pricePerMonth: 3800000,
    transmission: 'manual',
    year: 2023,
    seats: 7,
    rating: 4.4,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Merah',
  },
  {
    id: '7',
    name: 'Toyota Innova Reborn 2022',
    brand: 'Toyota',
    model: 'Innova',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 350000,
    pricePerWeek: 2100000,
    pricePerMonth: 7000000,
    transmission: 'automatic',
    year: 2022,
    seats: 7,
    rating: 4.9,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Diesel',
    color: 'Hitam',
  },
  {
    id: '8',
    name: 'Mitsubishi Xpander 2023',
    brand: 'Mitsubishi',
    model: 'Xpander',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 280000,
    pricePerWeek: 1700000,
    pricePerMonth: 5500000,
    transmission: 'automatic',
    year: 2023,
    seats: 7,
    rating: 4.8,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Putih',
  },
  {
    id: '9',
    name: 'Gesits G1 2024',
    brand: 'Gesits',
    model: 'G1',
    type: 'motorcycle',
    image: '/placeholder/400x300.svg',
    pricePerDay: 75000,
    pricePerWeek: 450000,
    pricePerMonth: 1500000,
    transmission: 'automatic',
    year: 2024,
    seats: 2,
    rating: 4.5,
    isAvailable: true,
    category: 'Motor Listrik',
    fuelType: 'Listrik',
    color: 'Putih',
  },
  {
    id: '10',
    name: 'Viar Q1 2024',
    brand: 'Viar',
    model: 'Q1',
    type: 'motorcycle',
    image: '/placeholder/400x300.svg',
    pricePerDay: 65000,
    pricePerWeek: 400000,
    pricePerMonth: 1300000,
    transmission: 'automatic',
    year: 2024,
    seats: 2,
    rating: 4.3,
    isAvailable: true,
    category: 'Motor Listrik',
    fuelType: 'Listrik',
    color: 'Hitam',
  },
  {
    id: '11',
    name: 'Selis E-Max 2024',
    brand: 'Selis',
    model: 'E-Max',
    type: 'motorcycle',
    image: '/placeholder/400x300.svg',
    pricePerDay: 70000,
    pricePerWeek: 420000,
    pricePerMonth: 1400000,
    transmission: 'automatic',
    year: 2024,
    seats: 2,
    rating: 4.4,
    isAvailable: true,
    category: 'Motor Listrik',
    fuelType: 'Listrik',
    color: 'Biru',
  },
  {
    id: '12',
    name: 'Volta 401 2024',
    brand: 'Volta',
    model: '401',
    type: 'motorcycle',
    image: '/placeholder/400x300.svg',
    pricePerDay: 80000,
    pricePerWeek: 480000,
    pricePerMonth: 1600000,
    transmission: 'automatic',
    year: 2024,
    seats: 2,
    rating: 4.6,
    isAvailable: false,
    category: 'Motor Listrik',
    fuelType: 'Listrik',
    color: 'Merah',
  },
  {
    id: '13',
    name: 'Honda PCX Electric 2024',
    brand: 'Honda',
    model: 'PCX Electric',
    type: 'motorcycle',
    image: '/placeholder/400x300.svg',
    pricePerDay: 90000,
    pricePerWeek: 540000,
    pricePerMonth: 1800000,
    transmission: 'automatic',
    year: 2024,
    seats: 2,
    rating: 4.8,
    isAvailable: true,
    category: 'Motor Listrik',
    fuelType: 'Listrik',
    color: 'Putih',
  },
  {
    id: '14',
    name: 'Nissan Livina 2023',
    brand: 'Nissan',
    model: 'Livina',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 240000,
    pricePerWeek: 1450000,
    pricePerMonth: 4800000,
    transmission: 'automatic',
    year: 2023,
    seats: 7,
    rating: 4.5,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Silver',
  },
  {
    id: '15',
    name: 'Wuling Confero 2023',
    brand: 'Wuling',
    model: 'Confero',
    type: 'car',
    image: '/placeholder/400x300.svg',
    pricePerDay: 210000,
    pricePerWeek: 1250000,
    pricePerMonth: 4200000,
    transmission: 'manual',
    year: 2023,
    seats: 7,
    rating: 4.3,
    isAvailable: true,
    category: 'MPV',
    fuelType: 'Bensin',
    color: 'Putih',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Budi Santoso',
    role: 'Driver GoCar',
    platform: 'Gojek',
    content: 'Sudah 2 tahun rental mobil di sini. Prosesnya cepat, mobil selalu terawat, dan harga sangat bersaing. Penghasilan saya meningkat 40% sejak bergabung.',
    avatar: '/placeholder/64x64.svg',
    rating: 5,
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Driver GrabCar',
    platform: 'Grab',
    content: 'Pelayanan luar biasa! Tim support selalu responsif kapanpun saya butuh bantuan. Kendaraan berkualitas dan proses perpanjangan sangat mudah.',
    avatar: '/placeholder/64x64.svg',
    rating: 5,
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Driver Maxim',
    platform: 'Maxim',
    content: 'Saya mulai dengan modal minim tapi bisa langsung kerja berkat kemudahan rental di sini. Sekarang sudah bisa mencicil mobil sendiri.',
    avatar: '/placeholder/64x64.svg',
    rating: 4,
  },
  {
    name: 'Dewi Rahayu',
    role: 'Driver GrabBike Electric',
    platform: 'Grab',
    content: 'Motor listriknya keren banget! Hemat biaya operasional dan ramah lingkungan. Pelanggan juga suka naik motor listrik.',
    avatar: '/placeholder/64x64.svg',
    rating: 5,
  },
  {
    name: 'Riko Pratama',
    role: 'Driver InDrive',
    platform: 'InDrive',
    content: 'Harga rental paling terjangkau se-Jabodetabek. Syaratnya juga gampang, cuma KTP dan SIM. Recommended banget!',
    avatar: '/placeholder/64x64.svg',
    rating: 4,
  },
  {
    name: 'Joko Widodo',
    role: 'Driver GoCar',
    platform: 'Gojek',
    content: 'Armadanya lengkap dari yang murah sampai premium. Saya bisa pilih sesuai budget dan target penghasilan saya.',
    avatar: '/placeholder/64x64.svg',
    rating: 5,
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'Apa saja syarat untuk rental kendaraan?',
    answer: 'Syarat utama adalah KTP, SIM (SIM A untuk mobil, SIM C untuk motor), dan deposit sesuai paket yang dipilih. Untuk driver online, diperlukan juga akun aktif di platform ride-hailing (Gojek, Grab, Maxim, atau InDrive).',
    category: 'General',
  },
  {
    question: 'Apakah bisa rental tanpa menjadi driver online?',
    answer: 'Saat ini layanan kami difokuskan untuk driver online yang terdaftar di platform ride-hailing. Namun, kami juga melayani rental untuk keperluan pribadi dengan syarat dan ketentuan yang berbeda.',
    category: 'General',
  },
  {
    question: 'Berapa lama proses approval rental?',
    answer: 'Proses approval biasanya memakan waktu 1-2 hari kerja setelah semua dokumen lengkap. Untuk driver dengan histori baik, proses bisa lebih cepat dalam hitungan jam.',
    category: 'General',
  },
  {
    question: 'Bagaimana cara melakukan booking kendaraan?',
    answer: 'Anda bisa booking melalui website kami, menghubungi WhatsApp, atau datang langsung ke kantor kami. Pilih kendaraan, tentukan durasi, dan lengkapi dokumen yang diperlukan.',
    category: 'Booking',
  },
  {
    question: 'Apakah bisa membatalkan booking?',
    answer: 'Pembatalan bisa dilakukan maksimal 24 jam sebelum jadwal pengambilan kendaraan tanpa dikenakan biaya. Pembatalan kurang dari 24 jam akan dikenakan biaya administrasi sebesar 10% dari total rental.',
    category: 'Booking',
  },
  {
    question: 'Berapa deposit yang diperlukan?',
    answer: 'Deposit bervariasi tergantung jenis kendaraan. Untuk mobil berkisar Rp 2-5 juta, dan untuk motor listrik Rp 500rb-1 juta. Deposit akan dikembalikan penuh saat pengembalian kendaraan dalam kondisi baik.',
    category: 'Booking',
  },
  {
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima pembayaran via transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, Dana), dan pembayaran tunai di kantor kami.',
    category: 'Payment',
  },
  {
    question: 'Apakah bisa cicilan atau bayar mingguan?',
    answer: 'Ya! Untuk paket bulanan, kami menyediakan opsi pembayaran mingguan. Untuk paket tahunan, tersedia cicilan bulanan dengan persyaratan tertentu.',
    category: 'Payment',
  },
  {
    question: 'Bagaimana jika terlambat membayar?',
    answer: 'Keterlambatan pembayaran akan dikenakan denda 1% per hari dari total tagihan. Jika terlambat lebih dari 7 hari, kendaraan akan ditarik sementara hingga pembayaran diselesaikan.',
    category: 'Payment',
  },
  {
    question: 'Siapa yang menanggung biaya perawatan?',
    answer: 'Perawatan rutin (service berkala, ganti oli) ditanggung oleh kami. Namun, kerusakan akibat kelalaian driver menjadi tanggung jawab penyewa sesuai ketentuan dalam kontrak.',
    category: 'Vehicle',
  },
  {
    question: 'Bagaimana jika kendaraan mogok atau rusak?',
    answer: 'Hubungi hotline darurat kami 24/7. Tim kami akan segera membantu, baik dengan perbaikan di lokasi atau penggantian kendaraan sementara agar Anda tetap bisa bekerja.',
    category: 'Vehicle',
  },
  {
    question: 'Berapa jarak tempuh maksimal per hari?',
    answer: 'Untuk paket harian, batas jarak tempuh adalah 200 km/hari. Untuk paket mingguan dan bulanan, tidak ada batasan jarak tempuh selama digunakan wajar untuk operasional ride-hailing.',
    category: 'Vehicle',
  },
  {
    question: 'Bagaimana cara mendaftar akun?',
    answer: 'Klik tombol "Daftar" di halaman utama, isi data diri lengkap, upload dokumen (KTP, SIM, foto selfie), dan tunggu verifikasi dari tim kami dalam 1-2 hari kerja.',
    category: 'Account',
  },
  {
    question: 'Apakah data saya aman?',
    answer: 'Ya, kami menggunakan enkripsi end-to-end untuk semua data pribadi. Kami tidak akan membagikan data Anda kepada pihak ketiga tanpa persetujuan Anda.',
    category: 'Account',
  },
  {
    question: 'Bagaimana cara mengubah paket rental?',
    answer: 'Anda bisa mengubah paket rental dengan menghubungi customer service kami minimal 3 hari sebelum periode rental berakhir. Perbedaan biaya akan dihitung prorata.',
    category: 'Account',
  },
];

export const blogPosts: BlogPost[] = [
  {
    title: 'Tips Memaksimalkan Penghasilan sebagai Driver Online di 2024',
    slug: 'tips-memaksimalkan-penghasilan-driver-online-2024',
    excerpt: 'Pelajari strategi terbaru untuk meningkatkan pendapatan Anda sebagai driver online. Dari jam sibuk hingga area strategis.',
    category: 'Tips Penghasilan',
    date: '2024-12-15',
    readTime: '5 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    title: 'Keuntungan Motor Listrik untuk Driver Ojol',
    slug: 'keuntungan-motor-listrik-driver-ojol',
    excerpt: 'Motor listrik bisa menghemat biaya operasional hingga 70%. Simak analisis lengkap perbandingan biaya motor listrik vs konvensional.',
    category: 'Tips Driver',
    date: '2024-12-10',
    readTime: '7 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Panduan Lengkap Memilih Mobil untuk GoCar dan GrabCar',
    slug: 'panduan-memilih-mobil-gocar-grabcar',
    excerpt: 'Tidak semua mobil cocok untuk ride-hailing. Ketahui kriteria mobil ideal untuk memaksimalkan kenyamanan penumpang dan keuntungan Anda.',
    category: 'Panduan Rental',
    date: '2024-12-05',
    readTime: '8 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Cara Merawat Mobil Rental Agar Tetap Prima',
    slug: 'cara-merawat-mobil-rental',
    excerpt: 'Perawatan rutin yang benar bisa memperpanjang usia kendaraan dan menghindari biaya perbaikan besar. Berikut tips dari mekanik profesional kami.',
    category: 'Tips Driver',
    date: '2024-11-28',
    readTime: '6 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Strategi Mengelola Keuangan untuk Driver Online',
    slug: 'strategi-mengelola-keuangan-driver-online',
    excerpt: 'Banyak driver online yang penghasilannya besar tapi tabungannya minim. Pelajari cara mengelola keuangan dengan bijak.',
    category: 'Tips Penghasilan',
    date: '2024-11-20',
    readTime: '6 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Update Regulasi Kendaraan Online 2024: Yang Perlu Anda Ketahui',
    slug: 'update-regulasi-kendaraan-online-2024',
    excerpt: 'Pemerintah mengeluarkan regulasi baru terkait kendaraan online. Ketahui perubahan apa saja yang mempengaruhi aktivitas Anda.',
    category: 'Panduan Rental',
    date: '2024-11-15',
    readTime: '4 menit',
    image: '/placeholder/800x400.svg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

export const rentalSteps: RentalStep[] = [
  {
    title: 'Pilih Kendaraan',
    description: 'Jelajahi armada kami dan pilih kendaraan yang sesuai dengan kebutuhan dan budget Anda.',
    icon: 'Car',
  },
  {
    title: 'Lengkapi Dokumen',
    description: 'Siapkan KTP, SIM, dan dokumen pendukung lainnya untuk proses verifikasi.',
    icon: 'FileText',
  },
  {
    title: 'Verifikasi Data',
    description: 'Tim kami akan memverifikasi dokumen Anda dalam 1-2 hari kerja.',
    icon: 'CheckCircle',
  },
  {
    title: 'Bayar Deposit',
    description: 'Lakukan pembayaran deposit sesuai paket yang dipilih melalui metode yang tersedia.',
    icon: 'CreditCard',
  },
  {
    title: 'Ambil Kendaraan',
    description: 'Datang ke kantor kami atau pilih layanan antar untuk mengambil kendaraan.',
    icon: 'MapPin',
  },
  {
    title: 'Mulai Menghasilkan',
    description: 'Kendaraan siap digunakan untuk bekerja di platform ride-hailing pilihan Anda.',
    icon: 'Rocket',
  },
];

export const benefits: Benefit[] = [
  {
    title: 'Harga Terjangkau',
    description: 'Tarif rental kompetitif yang dirancang khusus untuk driver online agar tetap menguntungkan.',
    icon: 'Wallet',
  },
  {
    title: 'Kendaraan Berkualitas',
    description: 'Semua armada terawat dengan baik dan menjalani inspeksi rutin untuk keamanan dan kenyamanan.',
    icon: 'Shield',
  },
  {
    title: 'Proses Cepat',
    description: 'Pendaftaran mudah dan approval cepat. Anda bisa mulai bekerja dalam hitungan hari.',
    icon: 'Zap',
  },
  {
    title: 'Support 24/7',
    description: 'Tim support kami siap membantu kapanpun Anda membutuhkan, termasuk bantuan darurat di jalan.',
    icon: 'Headphones',
  },
  {
    title: 'Tanpa BI Checking',
    description: 'Kami tidak memerlukan BI Checking. Cukup KTP, SIM, dan niat kerja yang kuat.',
    icon: 'UserCheck',
  },
  {
    title: 'Bonus Loyalitas',
    description: 'Program reward untuk driver setia dengan berbagai benefit eksklusif dan diskon perpanjangan.',
    icon: 'Gift',
  },
];

export const stats = {
  totalDrivers: 2500,
  totalVehicles: 500,
  totalCities: 12,
  totalYears: 5,
};

export const partnershipTiers: PartnershipTier[] = [
  {
    name: 'Silver Partner',
    benefits: [
      'Diskon 5% untuk semua rental',
      'Prioritas booking kendaraan',
      'Akses laporan kinerja bulanan',
      'Customer service dedicated',
    ],
    requirements: [
      'Minimal 5 unit kendaraan',
      'Bergabung minimal 6 bulan',
      'Rating driver minimal 4.5',
    ],
  },
  {
    name: 'Gold Partner',
    benefits: [
      'Diskon 10% untuk semua rental',
      'Kendaraan premium priority',
      'Asuransi all-risk gratis',
      'Program pelatihan driver',
      'Bonus referral Rp 500.000',
    ],
    requirements: [
      'Minimal 15 unit kendaraan',
      'Bergabung minimal 1 tahun',
      'Rating driver minimal 4.7',
      'Revenue minimal Rp 50 juta/bulan',
    ],
  },
  {
    name: 'Platinum Partner',
    benefits: [
      'Diskon 15% untuk semua rental',
      'Fleet management dashboard',
      'Kendaraan baru setiap tahun',
      'Asuransi comprehensive gratis',
      'Bonus referral Rp 1.000.000',
      'Event eksklusif partner',
      'Opsi kepemilikan kendaraan',
    ],
    requirements: [
      'Minimal 30 unit kendaraan',
      'Bergabung minimal 2 tahun',
      'Rating driver minimal 4.8',
      'Revenue minimal Rp 150 juta/bulan',
    ],
  },
];
