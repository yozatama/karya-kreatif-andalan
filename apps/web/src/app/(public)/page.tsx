import { Metadata } from 'next';
import { HeroSection } from '@/components/landing/HeroSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FleetShowcase } from '@/components/landing/FleetShowcase';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';

export const metadata: Metadata = {
  title: 'Karya Kreatif Andalan - Rental Kendaraan untuk Driver Online',
  description:
    'Sewa mobil dan motor listrik berkualitas untuk mitra Gojek, Grab, Maxim & InDrive dengan harga terjangkau. 500+ driver aktif, 150+ kendaraan tersedia.',
  openGraph: {
    title: 'Karya Kreatif Andalan - Rental Kendaraan untuk Driver Online',
    description:
      'Sewa mobil dan motor listrik berkualitas untuk mitra Gojek, Grab, Maxim & InDrive dengan harga terjangkau.',
    type: 'website',
    url: 'https://karyakreatif.id',
    images: [{ url: '/images/og-home.jpg', width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Karya Kreatif Andalan',
            description:
              'Platform rental kendaraan untuk driver online di Indonesia. Menyediakan mobil dan motor listrik berkualitas.',
            url: 'https://karyakreatif.id',
            telephone: '+62215555789',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Jl. Gatot Subroto Kav. 35',
              addressLocality: 'Jakarta Selatan',
              addressRegion: 'DKI Jakarta',
              postalCode: '12950',
              addressCountry: 'ID',
            },
            priceRange: 'Rp 45.000 - Rp 220.000/hari',
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:00',
              closes: '20:00',
            },
          }),
        }}
      />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FleetShowcase />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
