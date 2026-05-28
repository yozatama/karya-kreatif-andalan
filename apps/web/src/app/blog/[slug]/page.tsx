import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/mock-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Blog
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <article className="lg:col-span-3">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-3">{post.category}</Badge>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">{post.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-xl bg-muted border mb-8 flex items-center justify-center">
            <span className="text-muted-foreground">Featured Image</span>
          </div>

          {/* Article Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="lead text-lg text-muted-foreground">{post.excerpt}</p>

            <h2>Pendahuluan</h2>
            <p>
              Menjadi driver online di era digital saat ini menawarkan fleksibilitas dan
              potensi penghasilan yang menarik. Namun, untuk memaksimalkan pendapatan,
              diperlukan strategi dan pengetahuan yang tepat.
            </p>

            <h2>Tips Utama</h2>
            <p>
              Berikut adalah beberapa tips yang dapat membantu Anda meningkatkan penghasilan
              sebagai driver online:
            </p>
            <ul>
              <li>Pahami jam-jam sibuk di area operasional Anda</li>
              <li>Jaga rating dengan memberikan pelayanan terbaik</li>
              <li>Rawat kendaraan agar selalu dalam kondisi prima</li>
              <li>Manfaatkan promo dan bonus dari platform</li>
              <li>Kelola keuangan dengan bijak untuk jangka panjang</li>
            </ul>

            <h2>Strategi Operasional</h2>
            <p>
              Selain tips di atas, ada beberapa strategi operasional yang bisa Anda terapkan
              untuk efisiensi waktu dan bahan bakar. Pemilihan area yang tepat dan pengelolaan
              waktu istirahat yang baik akan sangat berpengaruh pada produktivitas harian Anda.
            </p>

            <h2>Kesimpulan</h2>
            <p>
              Dengan menerapkan tips dan strategi di atas secara konsisten, Anda dapat
              meningkatkan penghasilan secara signifikan. Ingat, kunci sukses sebagai driver
              online adalah konsistensi dan pelayanan yang berkualitas.
            </p>
          </div>

          {/* Share */}
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Bagikan artikel ini:</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Author */}
          <div className="mt-8 rounded-xl border bg-card p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
              <span className="text-xs text-muted-foreground">A</span>
            </div>
            <div>
              <p className="font-semibold text-card-foreground">Tim Redaksi KKA</p>
              <p className="text-sm text-muted-foreground">
                Tim konten Karya Kreatif Andalan yang berkomitmen memberikan informasi terbaik untuk driver online Indonesia.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Table of Contents */}
            <div className="rounded-xl border bg-card p-4">
              <h3 className="font-semibold text-card-foreground mb-3 text-sm">Daftar Isi</h3>
              <nav className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pendahuluan</a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Tips Utama</a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Strategi Operasional</a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Kesimpulan</a>
              </nav>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold text-card-foreground mb-3 text-sm">Artikel Terkait</h3>
                <div className="space-y-3">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{related.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
