import { HeroSection } from '@/components/landing/hero-section';
import { SearchSection } from '@/components/landing/search-section';
import { BenefitsSection } from '@/components/landing/benefits-section';
import { ProcessSection } from '@/components/landing/process-section';
import { FleetSection } from '@/components/landing/fleet-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { FAQSection } from '@/components/landing/faq-section';
import { CTASection } from '@/components/landing/cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <BenefitsSection />
      <ProcessSection />
      <FleetSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
