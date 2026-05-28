import { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { Calendar, User } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Tips & Panduan Driver Online | Karya Kreatif Andalan',
  description:
    'Baca tips dan panduan untuk memaksimalkan penghasilan sebagai driver online. Informasi seputar kendaraan, earnings, dan strategi driver.',
  openGraph: {
    title: 'Blog - Tips & Panduan Driver Online | Karya Kreatif Andalan',
    description: 'Tips dan panduan untuk driver online.',
  },
};

export default function BlogPage() {
  return (
    <div className="pt-20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-600 to-navy-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Blog</h1>
          <p className="text-emerald-100 mt-3 max-w-xl mx-auto">
            Tips, panduan, dan informasi terbaru untuk driver online
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                  <span className="text-emerald-700 font-medium text-sm text-center px-4">
                    {post.title}
                  </span>
                </div>
                <CardContent className="p-5">
                  <Badge variant="secondary" className="mb-2">
                    {post.category}
                  </Badge>
                  <h2 className="font-semibold text-lg text-navy-dark group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
