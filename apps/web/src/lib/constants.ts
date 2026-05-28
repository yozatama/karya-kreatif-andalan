export const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/fleet', label: 'Armada' },
  { href: '/about', label: 'Tentang' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Kontak' },
  { href: '/faq', label: 'FAQ' },
] as const;

export const COMPANY_INFO = {
  name: 'Karya Kreatif Andalan',
  shortName: 'Karya Kreatif',
  phone: '+62 21 5555 7890',
  email: 'info@karyakreatif.id',
  whatsapp: '6281234567890',
  whatsappDisplay: '0812-3456-7890',
  address: 'Jl. Gatot Subroto Kav. 35, Kuningan, Jakarta Selatan 12950',
  operatingHours: 'Senin - Sabtu, 08.00 - 20.00 WIB',
} as const;

export const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://instagram.com/karyakreatif' },
  { name: 'Facebook', href: 'https://facebook.com/karyakreatif' },
  { name: 'TikTok', href: 'https://tiktok.com/@karyakreatif' },
  { name: 'YouTube', href: 'https://youtube.com/@karyakreatif' },
] as const;

export const PLATFORMS = [
  { name: 'Gojek', color: 'bg-green-600' },
  { name: 'Grab', color: 'bg-green-500' },
  { name: 'Maxim', color: 'bg-orange-500' },
  { name: 'InDrive', color: 'bg-purple-600' },
] as const;
