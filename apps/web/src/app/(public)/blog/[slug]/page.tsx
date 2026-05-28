import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { blogPosts } from '@/lib/mock-data';
import { formatDate } from '@/lib/format';
import { Calendar, User, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: `${post.title} | Blog Karya Kreatif Andalan`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.imageUrl, width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Blog
          </Link>

          {/* Cover Image */}
          <div className="aspect-[16/9] bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mb-8">
            <span className="text-emerald-700 font-semibold text-lg text-center px-4">
              {post.title}
            </span>
          </div>

          {/* Meta */}
          <Badge variant="secondary" className="mb-3">
            {post.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-dark">{post.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
          </div>

          {/* Content */}
          <article className="mt-8 prose prose-gray max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t">
              <h2 className="text-xl font-bold text-navy-dark mb-6">Artikel Terkait</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {related.category}
                        </Badge>
                        <h3 className="font-semibold text-sm text-navy-dark line-clamp-2 hover:text-primary transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(related.date)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
