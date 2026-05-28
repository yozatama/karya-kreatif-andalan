import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PLATFORMS } from '@/lib/constants';
import { Target, Eye, Users, Car, Calendar, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tentang Kami - Karya Kreatif Andalan',
  description:
    'Karya Kreatif Andalan adalah platform rental kendaraan terpercaya untuk driver online di Indonesia. Melayani mitra Gojek, Grab, Maxim, dan InDrive.',
  openGraph: {
    title: 'Tentang Kami - Karya Kreatif Andalan',
    description:
      'Platform rental kendaraan terpercaya untuk driver online di Indonesia.',
  },
};

const stats = [
  { icon: Users, value: '500+', label: 'Driver Aktif' },
  { icon: Car, value: '150+', label: 'Unit Kendaraan' },
  { icon: Calendar, value: '3+', label: 'Tahun Beroperasi' },
  { icon: Award, value: '98%', label: 'Tingkat Kepuasan' },
];

const team = [
  { name: 'Ahmad Fauzi', role: 'CEO & Founder', description: 'Visioner di industri mobilitas' },
  { name: 'Rina Susanti', role: 'COO', description: 'Ahli operasional armada' },
  { name: 'Budi Pratama', role: 'CTO', description: 'Expert teknologi transportasi' },
  { name: 'Dewi Anggraini', role: 'Head of Partnership', description: 'Spesialis kemitraan platform' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-navy-dark py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Tentang Karya Kreatif Andalan</h1>
          <p className="text-emerald-100 mt-4 max-w-2xl mx-auto text-lg">
            Membantu driver online Indonesia meraih penghasilan lebih baik dengan kendaraan berkualitas
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-navy-dark mb-4">Cerita Kami</h2>
            <div className="prose prose-gray max-w-none text-muted-foreground space-y-4">
              <p>
                Karya Kreatif Andalan lahir dari keresahan melihat para driver online yang kesulitan
                mendapatkan kendaraan layak dengan harga terjangkau. Banyak driver yang harus mengeluarkan
                biaya besar untuk sewa kendaraan, sementara pendapatan mereka tidak menentu.
              </p>
              <p>
                Didirikan pada tahun 2021 di Jakarta, kami memulai dengan 10 unit mobil dan kini telah
                berkembang menjadi lebih dari 150 unit kendaraan termasuk mobil dan motor listrik. Kami
                percaya bahwa setiap driver berhak mendapatkan kendaraan terawat tanpa harus menguras
                kantong.
              </p>
              <p>
                Dengan pendekatan teknologi dan layanan pelanggan yang personal, kami terus berinovasi
                untuk memberikan pengalaman sewa kendaraan terbaik bagi para mitra driver online di
                Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-2">Visi</h3>
                <p className="text-muted-foreground">
                  Menjadi platform penyedia kendaraan nomor satu untuk driver online di Indonesia,
                  dengan armada terlengkap dan layanan terpercaya di setiap kota.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-navy-dark mb-2">Misi</h3>
                <ul className="text-muted-foreground space-y-2 text-sm">
                  <li>- Menyediakan kendaraan berkualitas dengan harga terjangkau</li>
                  <li>- Mempermudah akses driver terhadap armada siap pakai</li>
                  <li>- Mendukung transisi ke kendaraan listrik ramah lingkungan</li>
                  <li>- Membangun ekosistem yang saling menguntungkan</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-navy-dark">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-navy-dark mb-4">Platform Partner Kami</h2>
          <p className="text-muted-foreground mb-8">
            Kami mendukung driver dari berbagai platform ride-hailing
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {PLATFORMS.map((platform) => (
              <Badge
                key={platform.name}
                className={`${platform.color} text-white text-base px-6 py-2`}
              >
                {platform.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy-dark text-center mb-8">
            Tim Profesional Kami
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-navy-dark">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
