"use client";

import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4"><Link href="/admin/cms/blog"><Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4 mr-1" />Kembali</Button></Link><div><h1 className="text-2xl font-bold text-navy-800">Artikel Baru</h1><p className="text-navy-500">Buat artikel blog baru</p></div></div>
      <Card className="max-w-3xl"><CardHeader><CardTitle>Editor Artikel</CardTitle></CardHeader><CardContent><form className="space-y-4">
        <Input id="title" label="Judul" placeholder="Judul artikel..." />
        <Input id="slug" label="Slug URL" placeholder="judul-artikel-baru" />
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Kategori</label><select className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm"><option value="tips-driver">Tips Driver</option><option value="panduan-rental">Panduan Rental</option><option value="produktivitas">Produktivitas</option><option value="berita">Berita</option></select></div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Konten</label><textarea className="w-full h-64 rounded-lg border border-gray-300 px-3 py-2 text-sm resize-none focus:border-emerald-500 focus:outline-none" placeholder="Tulis konten artikel..." /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">Featured Image</label><input type="file" accept="image/*" className="w-full text-sm text-navy-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700" /></div>
        <div className="flex items-center gap-2"><input type="checkbox" id="publish" className="rounded border-gray-300" /><label htmlFor="publish" className="text-sm text-navy-700">Langsung publish</label></div>
        <div className="flex gap-3 pt-4"><Button type="button">Simpan</Button><Button type="button" variant="outline">Simpan sebagai Draft</Button></div>
      </form></CardContent></Card>
    </div>
  );
}
