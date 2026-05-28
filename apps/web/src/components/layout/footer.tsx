import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-xl font-bold">
              Karya<span className="text-emerald-400">Kreatif</span>
            </span>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Platform rental mobil dan motor listrik terpercaya untuk driver online. Armada
              terawat, harga terjangkau, dan dukungan penuh 24/7.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Menu
            </h4>
            <nav className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Armada
            </h4>
            <nav className="mt-4 flex flex-col gap-2">
              <Link href="/fleet?type=mobil" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Mobil
              </Link>
              <Link href="/fleet?type=motor-listrik" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Motor Listrik
              </Link>
              <Link href="/partnership" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Kemitraan
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Kontak
            </h4>
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-400">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
              >
                WhatsApp: {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="hover:text-emerald-400 transition-colors"
              >
                {SITE_CONFIG.email}
              </a>
              <p>{SITE_CONFIG.address}</p>
            </div>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Seluruh hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
