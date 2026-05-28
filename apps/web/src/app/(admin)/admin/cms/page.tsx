'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { formatDate } from '@/lib/format';
import { blogPosts, faqList, bannerList } from '@/lib/mock-admin-data';
import { Plus, Edit, Trash2 } from 'lucide-react';

type CMSTab = 'blog' | 'faq' | 'banner';

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<CMSTab>('blog');
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [bannerDialogOpen, setBannerDialogOpen] = useState(false);

  const tabs: { key: CMSTab; label: string }[] = [
    { key: 'blog', label: 'Blog' },
    { key: 'faq', label: 'FAQ' },
    { key: 'banner', label: 'Banner' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Konten</h1>
          <p className="text-muted-foreground">Kelola blog, FAQ, dan banner</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-3">
        {tabs.map((tab) => (
          <Button key={tab.key} variant={activeTab === tab.key ? 'default' : 'ghost'} size="sm" className="text-xs" onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Blog tab */}
      {activeTab === 'blog' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2" onClick={() => setBlogDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Tulis Artikel
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Judul</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Author</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Tanggal</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="border-b last:border-0">
                        <td className="py-2 font-medium">{post.title}</td>
                        <td className="py-2">
                          <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                            {post.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="py-2">{post.author}</td>
                        <td className="py-2">{formatDate(post.date)}</td>
                        <td className="py-2 text-right">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                          {post.status === 'draft' && (
                            <Button variant="ghost" size="sm" className="text-xs text-emerald-600">Publish</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* FAQ tab */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2" onClick={() => setFaqDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Tambah FAQ
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Pertanyaan</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Kategori</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Urutan</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Status</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqList.map((faq) => (
                      <tr key={faq.id} className="border-b last:border-0">
                        <td className="py-2 max-w-xs truncate">{faq.question}</td>
                        <td className="py-2">{faq.category}</td>
                        <td className="py-2">{faq.order}</td>
                        <td className="py-2">
                          <Badge variant={faq.status === 'active' ? 'default' : 'secondary'}>
                            {faq.status === 'active' ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </td>
                        <td className="py-2 text-right">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Banner tab */}
      {activeTab === 'banner' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button className="gap-2" onClick={() => setBannerDialogOpen(true)}>
              <Plus className="h-4 w-4" /> Tambah Banner
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left font-medium text-muted-foreground">Judul</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Posisi</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Aktif</th>
                      <th className="pb-2 text-left font-medium text-muted-foreground">Periode</th>
                      <th className="pb-2 text-right font-medium text-muted-foreground">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bannerList.map((banner) => (
                      <tr key={banner.id} className="border-b last:border-0">
                        <td className="py-2 font-medium">{banner.title}</td>
                        <td className="py-2 capitalize">{banner.position}</td>
                        <td className="py-2">
                          <Badge variant={banner.active ? 'default' : 'secondary'}>
                            {banner.active ? 'Aktif' : 'Nonaktif'}
                          </Badge>
                        </td>
                        <td className="py-2">{formatDate(banner.startDate)} - {formatDate(banner.endDate)}</td>
                        <td className="py-2 text-right">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-600"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blog dialog */}
      <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tulis Artikel Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Judul *</label>
              <Input placeholder="Judul artikel" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Slug</label>
              <Input placeholder="judul-artikel (auto-generate)" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Excerpt</label>
              <Input placeholder="Ringkasan singkat artikel" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Konten *</label>
              <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[200px] focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Tulis konten artikel di sini..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Cover Image</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
                Klik untuk upload gambar cover
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="publish" className="rounded" />
              <label htmlFor="publish" className="text-sm">Langsung publish</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlogDialogOpen(false)}>Batal</Button>
            <Button onClick={() => setBlogDialogOpen(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* FAQ dialog */}
      <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah FAQ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Pertanyaan *</label>
              <Input placeholder="Pertanyaan..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Jawaban *</label>
              <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Jawaban..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Kategori *</label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option value="Pendaftaran">Pendaftaran</option>
                  <option value="Pembayaran">Pembayaran</option>
                  <option value="Kendaraan">Kendaraan</option>
                  <option value="Pengembalian">Pengembalian</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Urutan</label>
                <Input type="number" placeholder="1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFaqDialogOpen(false)}>Batal</Button>
            <Button onClick={() => setFaqDialogOpen(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Banner dialog */}
      <Dialog open={bannerDialogOpen} onOpenChange={setBannerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Judul *</label>
              <Input placeholder="Judul banner" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Gambar</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
                Klik untuk upload gambar
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Link URL</label>
              <Input placeholder="https://..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Posisi *</label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="hero">Hero</option>
                <option value="sidebar">Sidebar</option>
                <option value="footer">Footer</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Tanggal Mulai</label>
                <Input type="date" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Tanggal Selesai</label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="active" className="rounded" defaultChecked />
              <label htmlFor="active" className="text-sm">Aktifkan banner</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBannerDialogOpen(false)}>Batal</Button>
            <Button onClick={() => setBannerDialogOpen(false)}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
