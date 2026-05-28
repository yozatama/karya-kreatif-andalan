'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { testimonials } from '@/lib/mock-data';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Kata Mereka
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Testimoni dari driver yang sudah merasakan manfaat bermitra dengan kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-sm text-muted-foreground mb-4">{testimonial.content}</p>
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
                <Badge variant="secondary">{testimonial.platform}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
