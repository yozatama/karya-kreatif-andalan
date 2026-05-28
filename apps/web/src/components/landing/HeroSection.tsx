'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCounter } from '@/components/shared/StatsCounter';
import { PLATFORMS } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-emerald-700 to-navy-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTJ2NEgyNFYwSDJ2NGgtNHYyaDR2NEgwdjJoNHY0SDJ2Mmg0djRIMHYyaDR2NGgtNHYyaDR2NEgwdjJoNFY0Nmg0di00aDJ2LTRoNHYtNGgydi00aDRWMzRoMnYtNGg0di00aDJ2LTRoNFYxNmgydi00aDRWOGgyVjRoNFYwSDM2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <div className="container mx-auto px-4 py-20 pt-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Solusi Kendaraan Terbaik untuk{' '}
              <span className="text-emerald-300">Driver Online</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto"
          >
            Sewa mobil dan motor listrik berkualitas untuk mitra Gojek, Grab, Maxim &amp; InDrive
            dengan harga terjangkau
          </motion.p>

          {/* Platform Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mt-6"
          >
            {PLATFORMS.map((platform) => (
              <Badge
                key={platform.name}
                variant="secondary"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                {platform.name}
              </Badge>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
          >
            <Button size="lg" className="text-base" asChild>
              <Link href="/fleet">Lihat Armada</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base border-white text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
        >
          <StatsCounter value="500+" label="Driver Aktif" />
          <StatsCounter value="150+" label="Kendaraan" />
          <StatsCounter value="3" label="Kota" />
          <StatsCounter value="98%" label="Kepuasan" />
        </motion.div>
      </div>
    </section>
  );
}
