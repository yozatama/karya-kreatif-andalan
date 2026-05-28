export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  category: "mobil" | "motor-listrik";
  transmission: "manual" | "automatic";
  fuel: "bensin" | "listrik" | "hybrid";
  seats: number;
  year: number;
  km: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  deposit: number;
  available: boolean;
  color: string;
  description: string;
  platforms: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  platform: "Gojek" | "Grab" | "Maxim" | "InDrive";
  rating: number;
  quote: string;
  duration: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "rental" | "pembayaran" | "kendaraan" | "kemitraan";
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "tips-driver" | "panduan-rental" | "produktivitas" | "berita";
  date: string;
  author: string;
  readTime: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface RentalStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  period: string;
  priceRange: string;
  features: string[];
  popular: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: "1",
    name: "Toyota Avanza",
    brand: "Toyota",
    category: "mobil",
    transmission: "manual",
    fuel: "bensin",
    seats: 7,
    year: 2022,
    km: 35000,
    dailyRate: 250000,
    weeklyRate: 1500000,
    monthlyRate: 5000000,
    deposit: 2000000,
    available: true,
    color: "bg-blue-500",
    description: "MPV terpopuler untuk driver online. Kabin luas dan nyaman untuk penumpang.",
    platforms: ["Gojek", "Grab", "Maxim"],
  },
  {
    id: "2",
    name: "Honda Brio",
    brand: "Honda",
    category: "mobil",
    transmission: "automatic",
    fuel: "bensin",
    seats: 5,
    year: 2023,
    km: 15000,
    dailyRate: 200000,
    weeklyRate: 1200000,
    monthlyRate: 4000000,
    deposit: 1500000,
    available: true,
    color: "bg-red-500",
    description: "City car irit BBM, cocok untuk driver online di perkotaan.",
    platforms: ["Gojek", "Grab", "InDrive"],
  },
  {
    id: "3",
    name: "Daihatsu Sigra",
    brand: "Daihatsu",
    category: "mobil",
    transmission: "manual",
    fuel: "bensin",
    seats: 7,
    year: 2022,
    km: 40000,
    dailyRate: 200000,
    weeklyRate: 1200000,
    monthlyRate: 4000000,
    deposit: 1500000,
    available: true,
    color: "bg-gray-600",
    description: "LMPV ekonomis dengan kapasitas 7 penumpang. Hemat BBM.",
    platforms: ["Gojek", "Grab", "Maxim"],
  },
  {
    id: "4",
    name: "Toyota Calya",
    brand: "Toyota",
    category: "mobil",
    transmission: "automatic",
    fuel: "bensin",
    seats: 7,
    year: 2023,
    km: 20000,
    dailyRate: 220000,
    weeklyRate: 1300000,
    monthlyRate: 4500000,
    deposit: 1500000,
    available: false,
    color: "bg-emerald-600",
    description: "MPV kompak dari Toyota, matic yang nyaman untuk berkendara seharian.",
    platforms: ["Gojek", "Grab"],
  },
  {
    id: "5",
    name: "Suzuki Ertiga",
    brand: "Suzuki",
    category: "mobil",
    transmission: "automatic",
    fuel: "bensin",
    seats: 7,
    year: 2022,
    km: 30000,
    dailyRate: 280000,
    weeklyRate: 1600000,
    monthlyRate: 5500000,
    deposit: 2000000,
    available: true,
    color: "bg-indigo-500",
    description: "MPV premium dengan kabin luas dan fitur keselamatan lengkap.",
    platforms: ["Gojek", "Grab", "Maxim", "InDrive"],
  },
  {
    id: "6",
    name: "Toyota Innova Reborn",
    brand: "Toyota",
    category: "mobil",
    transmission: "automatic",
    fuel: "bensin",
    seats: 7,
    year: 2021,
    km: 55000,
    dailyRate: 400000,
    weeklyRate: 2400000,
    monthlyRate: 8000000,
    deposit: 3000000,
    available: true,
    color: "bg-navy-700",
    description: "MPV premium untuk layanan GrabCar Premium dan GoCar Plus.",
    platforms: ["Grab", "Gojek"],
  },
  {
    id: "7",
    name: "Wuling Air EV",
    brand: "Wuling",
    category: "motor-listrik",
    transmission: "automatic",
    fuel: "listrik",
    seats: 4,
    year: 2023,
    km: 10000,
    dailyRate: 180000,
    weeklyRate: 1100000,
    monthlyRate: 3500000,
    deposit: 1500000,
    available: true,
    color: "bg-teal-400",
    description: "Mobil listrik mini hemat energi, cocok untuk perjalanan dalam kota.",
    platforms: ["Gojek", "Grab"],
  },
  {
    id: "8",
    name: "Alva One",
    brand: "Alva",
    category: "motor-listrik",
    transmission: "automatic",
    fuel: "listrik",
    seats: 2,
    year: 2023,
    km: 5000,
    dailyRate: 150000,
    weeklyRate: 900000,
    monthlyRate: 3000000,
    deposit: 1000000,
    available: true,
    color: "bg-green-400",
    description: "Motor listrik dengan jarak tempuh hingga 70km per charge. Ideal untuk GoRide.",
    platforms: ["Gojek", "Grab"],
  },
  {
    id: "9",
    name: "Volta 401",
    brand: "Volta",
    category: "motor-listrik",
    transmission: "automatic",
    fuel: "listrik",
    seats: 2,
    year: 2023,
    km: 8000,
    dailyRate: 150000,
    weeklyRate: 900000,
    monthlyRate: 2800000,
    deposit: 1000000,
    available: false,
    color: "bg-yellow-500",
    description: "Motor listrik performa tinggi dengan swap battery system.",
    platforms: ["Gojek", "Grab"],
  },
  {
    id: "10",
    name: "Selis E-Max",
    brand: "Selis",
    category: "motor-listrik",
    transmission: "automatic",
    fuel: "listrik",
    seats: 2,
    year: 2023,
    km: 3000,
    dailyRate: 130000,
    weeklyRate: 800000,
    monthlyRate: 2500000,
    deposit: 800000,
    available: true,
    color: "bg-orange-400",
    description: "Motor listrik ekonomis dengan biaya operasional sangat rendah.",
    platforms: ["Gojek"],
  },
  {
    id: "11",
    name: "Daihatsu Xenia",
    brand: "Daihatsu",
    category: "mobil",
    transmission: "manual",
    fuel: "bensin",
    seats: 7,
    year: 2022,
    km: 45000,
    dailyRate: 230000,
    weeklyRate: 1400000,
    monthlyRate: 4800000,
    deposit: 1500000,
    available: true,
    color: "bg-purple-500",
    description: "MPV handal untuk driver online, perawatan murah dan spare part mudah didapat.",
    platforms: ["Gojek", "Grab", "Maxim"],
  },
  {
    id: "12",
    name: "Honda Mobilio",
    brand: "Honda",
    category: "mobil",
    transmission: "automatic",
    fuel: "bensin",
    seats: 7,
    year: 2022,
    km: 38000,
    dailyRate: 260000,
    weeklyRate: 1500000,
    monthlyRate: 5200000,
    deposit: 2000000,
    available: true,
    color: "bg-sky-500",
    description: "MPV stylish dengan handling nyaman untuk berkendara seharian penuh.",
    platforms: ["Gojek", "Grab", "InDrive"],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Budi Santoso",
    platform: "Gojek",
    rating: 5,
    quote: "Sudah 2 tahun rental di Karya Kreatif Andalan. Mobil selalu terawat, harga terjangkau, dan support-nya responsif 24 jam.",
    duration: "2 tahun",
  },
  {
    id: "2",
    name: "Ahmad Rizki",
    platform: "Grab",
    rating: 5,
    quote: "Sebagai driver GrabCar, pendapatan saya meningkat 40% setelah upgrade ke Innova dari Karya Kreatif Andalan.",
    duration: "1.5 tahun",
  },
  {
    id: "3",
    name: "Dewi Lestari",
    platform: "Gojek",
    rating: 4,
    quote: "Motor listrik dari sini sangat hemat. Dulu habis Rp 50.000/hari untuk bensin, sekarang cuma Rp 10.000 untuk listrik.",
    duration: "8 bulan",
  },
  {
    id: "4",
    name: "Eko Prasetyo",
    platform: "Maxim",
    rating: 5,
    quote: "Proses rental mudah dan cepat. Dalam sehari sudah bisa langsung narik. Recommended banget!",
    duration: "1 tahun",
  },
  {
    id: "5",
    name: "Siti Nurhaliza",
    platform: "Grab",
    rating: 5,
    quote: "Sebagai driver wanita, saya merasa aman karena semua armada di sini rutin di-service dan ada asuransi.",
    duration: "1 tahun",
  },
  {
    id: "6",
    name: "Rudi Hermawan",
    platform: "InDrive",
    rating: 4,
    quote: "Flexible banget, bisa rental harian atau bulanan. Kalau lagi sepi tinggal switch ke harian.",
    duration: "6 bulan",
  },
  {
    id: "7",
    name: "Agus Widodo",
    platform: "Gojek",
    rating: 5,
    quote: "Alva One dari sini mantap. Charging-nya cepat dan jarak tempuhnya cukup buat narik seharian.",
    duration: "4 bulan",
  },
  {
    id: "8",
    name: "Fajar Nugroho",
    platform: "Grab",
    rating: 5,
    quote: "Customer service-nya the best. Pernah mogok malam-malam, 30 menit sudah datang bantuan.",
    duration: "1.5 tahun",
  },
];

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Apa saja persyaratan untuk rental kendaraan?",
    answer: "Persyaratan utama: KTP aktif, SIM A/C sesuai kendaraan, foto selfie, dan deposit sesuai kendaraan yang dipilih. Proses verifikasi memakan waktu 1-2 jam pada hari kerja.",
    category: "rental",
  },
  {
    id: "2",
    question: "Berapa lama proses persetujuan rental?",
    answer: "Setelah dokumen lengkap diverifikasi, proses persetujuan memakan waktu 1-24 jam. Untuk driver yang sudah pernah rental sebelumnya, prosesnya lebih cepat.",
    category: "rental",
  },
  {
    id: "3",
    question: "Apakah bisa rental tanpa deposit?",
    answer: "Saat ini semua rental memerlukan deposit sebagai jaminan. Namun, untuk driver dengan track record baik selama 6 bulan+, deposit bisa dikurangi hingga 50%.",
    category: "rental",
  },
  {
    id: "4",
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI), e-wallet (OVO, GoPay, Dana), dan pembayaran tunai di kantor. Pembayaran bulanan jatuh tempo setiap tanggal 1.",
    category: "pembayaran",
  },
  {
    id: "5",
    question: "Apakah ada denda keterlambatan pembayaran?",
    answer: "Ya, keterlambatan pembayaran dikenakan denda 1% per hari dari total tagihan. Jika terlambat lebih dari 7 hari, kendaraan akan ditarik dan deposit hangus.",
    category: "pembayaran",
  },
  {
    id: "6",
    question: "Bagaimana jika terjadi kerusakan pada kendaraan?",
    answer: "Kerusakan akibat pemakaian normal ditanggung kami. Untuk kerusakan akibat kelalaian driver, biaya perbaikan dibebankan kepada driver sesuai estimasi bengkel resmi.",
    category: "kendaraan",
  },
  {
    id: "7",
    question: "Apakah kendaraan sudah termasuk asuransi?",
    answer: "Ya, semua kendaraan sudah dilengkapi asuransi all-risk. Premi asuransi sudah termasuk dalam harga rental bulanan.",
    category: "kendaraan",
  },
  {
    id: "8",
    question: "Seberapa sering kendaraan di-service?",
    answer: "Semua kendaraan mendapat service rutin setiap 5.000 km atau 1 bulan (mana yang lebih dulu). Service meliputi ganti oli, cek rem, ban, dan komponen penting lainnya.",
    category: "kendaraan",
  },
  {
    id: "9",
    question: "Bagaimana cara menjadi mitra armada?",
    answer: "Anda bisa mendaftarkan kendaraan Anda sebagai armada mitra. Minimal memiliki 1 kendaraan berusia maksimal 5 tahun. Hubungi tim kami via WhatsApp untuk info lebih lanjut.",
    category: "kemitraan",
  },
  {
    id: "10",
    question: "Berapa bagi hasil untuk mitra armada?",
    answer: "Bagi hasil untuk mitra armada adalah 70:30 (mitra mendapat 70% dari pendapatan rental). Kami menangani manajemen driver, pemasaran, dan maintenance.",
    category: "kemitraan",
  },
  {
    id: "11",
    question: "Apakah ada minimal kontrak rental?",
    answer: "Minimal rental adalah 1 hari. Untuk mendapatkan harga terbaik, kami rekomendasikan paket bulanan yang bisa menghemat hingga 30% dibanding harian.",
    category: "rental",
  },
  {
    id: "12",
    question: "Bagaimana sistem deposit dikembalikan?",
    answer: "Deposit dikembalikan penuh dalam 3-5 hari kerja setelah kendaraan dikembalikan dalam kondisi baik. Pengembalian via transfer ke rekening yang didaftarkan.",
    category: "pembayaran",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "tips-hemat-bbm-driver-online",
    title: "10 Tips Hemat BBM untuk Driver Online yang Wajib Dicoba",
    excerpt: "Pengeluaran BBM bisa memakan 30-40% pendapatan driver online. Berikut tips ampuh untuk menghemat konsumsi BBM harian Anda.",
    content: "<p>Sebagai driver online, BBM adalah salah satu pengeluaran terbesar yang harus dikelola dengan bijak. Dengan strategi yang tepat, Anda bisa menghemat hingga 20% pengeluaran BBM bulanan.</p><h2>1. Jaga Tekanan Ban</h2><p>Ban yang kurang angin bisa meningkatkan konsumsi BBM hingga 3%. Cek tekanan ban setiap minggu.</p><h2>2. Hindari Akselerasi Mendadak</h2><p>Akselerasi halus dan konsisten lebih hemat BBM dibanding gas mendadak dan rem mendadak.</p><h2>3. Matikan Mesin Saat Idle</h2><p>Jika menunggu order lebih dari 2 menit, matikan mesin untuk menghemat BBM.</p>",
    category: "tips-driver",
    date: "2024-01-15",
    author: "Tim Karya Kreatif Andalan",
    readTime: "5 menit",
  },
  {
    id: "2",
    slug: "maksimalkan-pendapatan-driver-online",
    title: "Strategi Memaksimalkan Pendapatan sebagai Driver Online di 2024",
    excerpt: "Pelajari strategi dan jam-jam produktif yang bisa meningkatkan pendapatan Anda sebagai driver online hingga 50%.",
    content: "<p>Menjadi driver online bukan sekadar menyalakan aplikasi dan menunggu order. Ada strategi khusus yang bisa memaksimalkan pendapatan harian Anda.</p><h2>Kenali Jam Sibuk</h2><p>Jam 06:00-09:00 dan 16:00-20:00 adalah peak hours dengan tarif surge. Manfaatkan waktu ini sebaik mungkin.</p><h2>Pilih Lokasi Strategis</h2><p>Positioning di area perkantoran, mall, dan stasiun meningkatkan peluang mendapat order.</p>",
    category: "produktivitas",
    date: "2024-02-01",
    author: "Tim Karya Kreatif Andalan",
    readTime: "7 menit",
  },
  {
    id: "3",
    slug: "keuntungan-motor-listrik-driver-online",
    title: "Mengapa Motor Listrik Jadi Pilihan Cerdas untuk Driver Online?",
    excerpt: "Motor listrik bisa menghemat hingga 80% biaya operasional dibanding motor bensin. Simak analisis lengkapnya.",
    content: "<p>Tren motor listrik untuk driver online semakin meningkat. Bukan tanpa alasan - penghematan biaya operasionalnya sangat signifikan.</p><h2>Perbandingan Biaya Operasional</h2><p>Motor bensin: Rp 50.000/hari BBM. Motor listrik: Rp 8.000-12.000/hari charging. Hemat Rp 40.000/hari atau Rp 1.2 juta/bulan!</p>",
    category: "tips-driver",
    date: "2024-02-15",
    author: "Tim Karya Kreatif Andalan",
    readTime: "6 menit",
  },
  {
    id: "4",
    slug: "panduan-lengkap-rental-kendaraan",
    title: "Panduan Lengkap Rental Kendaraan untuk Driver Online Pemula",
    excerpt: "Baru mau mulai jadi driver online? Ini panduan lengkap cara rental kendaraan yang aman dan terpercaya.",
    content: "<p>Memulai karir sebagai driver online tidak harus memiliki kendaraan sendiri. Rental kendaraan bisa menjadi solusi tepat untuk memulai tanpa modal besar.</p><h2>Langkah 1: Pilih Kendaraan yang Tepat</h2><p>Pertimbangkan jenis layanan yang ingin Anda jalankan. GoCar/GrabCar butuh mobil minimal 4 penumpang.</p>",
    category: "panduan-rental",
    date: "2024-03-01",
    author: "Tim Karya Kreatif Andalan",
    readTime: "8 menit",
  },
  {
    id: "5",
    slug: "berita-kemitraan-baru-karya-kreatif",
    title: "Karya Kreatif Andalan Buka Program Kemitraan Baru untuk Pemilik Kendaraan",
    excerpt: "Program kemitraan baru dengan bagi hasil 70:30 untuk pemilik kendaraan yang ingin mendapatkan passive income.",
    content: "<p>Karya Kreatif Andalan dengan bangga mengumumkan program kemitraan baru yang memberikan kesempatan bagi pemilik kendaraan untuk mendapatkan penghasilan pasif.</p><h2>Keuntungan Menjadi Mitra</h2><p>Bagi hasil 70:30 (mitra 70%), manajemen driver profesional, asuransi all-risk, dan maintenance ditanggung penuh.</p>",
    category: "berita",
    date: "2024-03-15",
    author: "Tim Karya Kreatif Andalan",
    readTime: "4 menit",
  },
];

export const benefits: Benefit[] = [
  {
    id: "1",
    title: "Armada Terawat",
    description: "Semua kendaraan mendapat service rutin berkala dan pengecekan menyeluruh sebelum diserahkan.",
    icon: "Car",
  },
  {
    id: "2",
    title: "Harga Terjangkau",
    description: "Harga rental kompetitif mulai Rp 150.000/hari dengan opsi pembayaran fleksibel.",
    icon: "Shield",
  },
  {
    id: "3",
    title: "Fleksibel",
    description: "Pilih paket harian, mingguan, atau bulanan sesuai kebutuhan. Bisa upgrade atau downgrade kapan saja.",
    icon: "Clock",
  },
  {
    id: "4",
    title: "Support 24/7",
    description: "Tim support kami siap membantu 24 jam setiap hari via WhatsApp, telepon, atau langsung di lokasi.",
    icon: "Headphones",
  },
];

export const rentalSteps: RentalStep[] = [
  {
    id: "1",
    step: 1,
    title: "Daftar",
    description: "Isi formulir pendaftaran online dan upload dokumen yang diperlukan.",
  },
  {
    id: "2",
    step: 2,
    title: "Verifikasi",
    description: "Tim kami akan memverifikasi data dan dokumen Anda dalam 1-24 jam.",
  },
  {
    id: "3",
    step: 3,
    title: "Pilih Armada",
    description: "Pilih kendaraan yang sesuai dengan kebutuhan dan budget Anda.",
  },
  {
    id: "4",
    step: 4,
    title: "Bayar",
    description: "Lakukan pembayaran deposit dan rental pertama via transfer atau e-wallet.",
  },
  {
    id: "5",
    step: 5,
    title: "Mulai Rental",
    description: "Ambil kendaraan di kantor kami dan mulai menghasilkan sebagai driver online!",
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: "1",
    name: "Harian",
    period: "per hari",
    priceRange: "Rp 150.000 - Rp 400.000",
    features: [
      "Cocok untuk coba-coba",
      "Tanpa komitmen jangka panjang",
      "Bisa extend kapan saja",
      "Asuransi all-risk",
      "Maintenance ditanggung",
    ],
    popular: false,
  },
  {
    id: "2",
    name: "Mingguan",
    period: "per minggu",
    priceRange: "Rp 800.000 - Rp 2.400.000",
    features: [
      "Hemat 15% dari harga harian",
      "Fleksibel perpanjang",
      "Gratis service rutin",
      "Asuransi all-risk",
      "Priority support",
      "Gratis cuci kendaraan",
    ],
    popular: false,
  },
  {
    id: "3",
    name: "Bulanan",
    period: "per bulan",
    priceRange: "Rp 2.500.000 - Rp 8.000.000",
    features: [
      "Hemat hingga 30% dari harian",
      "Diskon deposit 50%",
      "Gratis maintenance penuh",
      "Asuransi all-risk",
      "Priority support 24/7",
      "Gratis cuci kendaraan",
      "Program loyalty point",
      "Upgrade kendaraan tersedia",
    ],
    popular: true,
  },
];
