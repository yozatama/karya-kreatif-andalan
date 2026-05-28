"use client";

import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/lib/mock-data";

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-navy-800">Blog Posts</h1><p className="text-navy-500 mt-1">Kelola artikel blog platform</p></div><Link href="/admin/cms/blog/new"><Button><Plus className="h-4 w-4 mr-2" />Artikel Baru</Button></Link></div>
      <Card><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50 border-b"><tr>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Judul</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Kategori</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Tanggal</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Status</th>
        <th className="text-left text-xs font-medium text-navy-500 p-4">Aksi</th>
      </tr></thead><tbody>
        {blogPosts.map((post) => (<tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
          <td className="p-4"><p className="text-sm font-medium text-navy-800 max-w-64 truncate">{post.title}</p><p className="text-xs text-navy-400">/{post.slug}</p></td>
          <td className="p-4"><Badge variant="default">{post.category}</Badge></td>
          <td className="p-4 text-sm text-navy-600">{post.date}</td>
          <td className="p-4"><Badge variant="success">Published</Badge></td>
          <td className="p-4"><div className="flex gap-1"><Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="h-4 w-4" /></Button></div></td>
        </tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
