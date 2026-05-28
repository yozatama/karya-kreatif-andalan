import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { HeroSection } from "@/components/sections/hero-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { RentalProcessSection } from "@/components/sections/rental-process-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FleetShowcaseSection } from "@/components/sections/fleet-showcase-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <WhyChooseUsSection />
        <RentalProcessSection />
        <PricingSection />
        <FleetShowcaseSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
