"use client";

import React from "react";
import { Plus, Edit, Trash2, GripVertical, Image, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const landingSections = [
  { id: "hero", title: "Hero Section", description: "Headline dan CTA utama" },
  { id: "benefits", title: "Keunggulan", description: "6 kartu keunggulan" },
  { id: "process", title: "Proses Rental", description: "Langkah-langkah rental" },
  { id: "fleet", title: "Showcase Armada", description: "Kendaraan unggulan" },
  { id: "pricing", title: "Paket Harga", description: "Tabel harga rental" },
  { id: "testimonials", title: "Testimoni", description: "Review driver" },
  { id: "faq", title: "FAQ", description: "Pertanyaan umum" },
  { id: "cta", title: "Call to Action", description: "CTA dan WhatsApp" },
];

const blogPosts = [
  { id: "b1", title: "Tips Memaksimalkan Penghasilan Driver Online 2024", status: "published", date: "2024-12-15", category: "Tips" },
  { id: "b2", title: "Keuntungan Motor Listrik untuk Driver Ojol", status: "published", date: "2024-12-10", category: "Tips" },
  { id: "b3", title: "Update Regulasi Kendaraan Online 2024", status: "draft", date: "2024-12-08", category: "Info" },
];

const faqList = [
  { id: "f1", question: "Apa saja syarat untuk rental kendaraan?", order: 1 },
  { id: "f2", question: "Berapa lama proses approval rental?", order: 2 },
  { id: "f3", question: "Bagaimana cara melakukan booking?", order: 3 },
  { id: "f4", question: "Metode pembayaran apa saja yang tersedia?", order: 4 },
];

const banners = [
  { id: "bn1", title: "Promo Akhir Tahun", link: "/promo", active: true },
  { id: "bn2", title: "Motor Listrik Baru", link: "/fleet", active: true },
  { id: "bn3", title: "Referral Bonus", link: "/partnership", active: false },
];

export default function CMSPage() {
  const [editSectionOpen, setEditSectionOpen] = React.useState(false);
  const [blogDialogOpen, setBlogDialogOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Content Management System</h2>

      <Tabs defaultValue="landing">
        <TabsList className="flex-wrap">
          <TabsTrigger value="landing">Landing Page</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
        </TabsList>

        {/* Landing Page */}
        <TabsContent value="landing" className="mt-4 space-y-3">
          {landingSections.map((section) => (
            <Card key={section.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-gray-500">{section.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditSectionOpen(true)}>
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Blog */}
        <TabsContent value="blog" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setBlogDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Post Baru
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Judul</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="text-sm font-medium">{post.title}</TableCell>
                      <TableCell className="text-sm">{post.category}</TableCell>
                      <TableCell className="text-sm">{post.date}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status === "published" ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button><Plus className="h-4 w-4 mr-1" /> Tambah FAQ</Button>
          </div>
          <div className="space-y-2">
            {faqList.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                    <span className="text-sm text-gray-400 w-6">{faq.order}.</span>
                    <p className="text-sm">{faq.question}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Banners */}
        <TabsContent value="banners" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            {banners.map((banner) => (
              <Card key={banner.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="h-24 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{banner.title}</p>
                    <p className="text-xs text-gray-500">{banner.link}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Aktif</span>
                    <Switch checked={banner.active} />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-dashed">
              <CardContent className="p-4 h-full flex items-center justify-center">
                <Button variant="ghost" className="h-auto flex-col gap-2 py-4">
                  <Plus className="h-6 w-6 text-gray-400" />
                  <span className="text-xs text-gray-500">Upload Banner</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Section Dialog */}
      <Dialog open={editSectionOpen} onOpenChange={setEditSectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input defaultValue="Solusi Rental Terbaik untuk Driver Online" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea defaultValue="Platform rental mobil dan motor listrik terpercaya..." rows={3} />
            </div>
            <Button className="w-full" onClick={() => setEditSectionOpen(false)}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Post Dialog */}
      <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Blog Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input placeholder="Judul artikel..." />
            </div>
            <div className="space-y-2">
              <Label>Kategori</Label>
              <select className="w-full rounded-md border p-2 text-sm">
                <option>Tips Driver</option>
                <option>Tips Penghasilan</option>
                <option>Panduan Rental</option>
                <option>Info</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Konten</Label>
              <Textarea placeholder="Tulis konten artikel..." rows={6} />
            </div>
            <Button className="w-full" onClick={() => setBlogDialogOpen(false)}>Publish</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
