'use client';

import { SectionTitle } from '@/components/shared/SectionTitle';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { testimonials } from '@/lib/mock-data';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Apa Kata Driver Kami?"
          subtitle="Ratusan driver sudah merasakan manfaat bermitra dengan Karya Kreatif Andalan"
        />

        <FadeIn>
          <div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 lg:justify-center">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
