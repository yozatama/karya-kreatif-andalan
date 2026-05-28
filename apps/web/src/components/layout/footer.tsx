import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Armada' },
  { href: '/about', label: 'Tentang Kami' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Kontak' },
];

const services = [
  { href: '/fleet?type=car', label: 'Rental Mobil' },
  { href: '/fleet?type=motorcycle', label: 'Rental Motor Listrik' },
  { href: '/partnership', label: 'Program Kemitraan' },
  { href: '/blog', label: 'Blog & Tips' },
];

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Karya Kreatif Andalan</h3>
            <p className="text-sm text-navy-300">
              Platform rental mobil dan motor listrik terpercaya untuk driver online.
              Bergabung bersama ribuan driver sukses di seluruh Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Link Cepat</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Layanan</h4>
            <ul className="space-y-2">
              {services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-300 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 mt-0.5 text-emerald-400" />
                <a
                  href="https://wa.me/6281234567890"
                  className="text-sm text-navy-300 hover:text-emerald-400 transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 mt-0.5 text-emerald-400" />
                <a
                  href="mailto:info@karyakreatif.co.id"
                  className="text-sm text-navy-300 hover:text-emerald-400 transition-colors"
                >
                  info@karyakreatif.co.id
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-emerald-400" />
                <span className="text-sm text-navy-300">
                  Jl. Raya Otomotif No. 123, Jakarta Selatan, DKI Jakarta 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-navy-700" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-navy-400">
          <p>&copy; {new Date().getFullYear()} Karya Kreatif Andalan. Semua hak dilindungi.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
