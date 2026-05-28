import Link from 'next/link';
import { COMPANY_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-1 font-bold text-xl mb-4">
              <span className="text-white">Karya</span>
              <span className="text-primary">Kreatif</span>
            </Link>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Platform rental kendaraan terpercaya untuk driver online. Menyediakan mobil dan motor
              listrik berkualitas dengan harga terjangkau.
            </p>
            <div className="flex gap-3 mt-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-full bg-navy-light flex items-center justify-center text-gray-400 hover:text-primary hover:bg-navy transition-colors text-xs font-semibold"
                  aria-label={social.name}
                >
                  {social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-semibold text-white mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-primary transition-colors">
                  Sewa Mobil
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-primary transition-colors">
                  Sewa Motor Listrik
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-400 hover:text-primary transition-colors">
                  Mitra Armada
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-primary transition-colors">
                  Sewa Harian
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-primary transition-colors">
                  Sewa Bulanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3 className="font-semibold text-white mb-4">Perusahaan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-gray-400">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex gap-2 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex gap-2 text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Seluruh hak dilindungi.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
