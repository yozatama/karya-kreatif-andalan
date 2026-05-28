"use client";

import Link from "next/link";
import { FileText, Image, HelpCircle, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  { title: "Blog", description: "Kelola artikel dan konten blog", icon: FileText, href: "/admin/cms/blog", count: 5 },
  { title: "Landing Page", description: "Edit konten halaman utama", icon: Megaphone, href: "#", count: 0 },
  { title: "FAQ", description: "Kelola pertanyaan yang sering diajukan", icon: HelpCircle, href: "#", count: 12 },
  { title: "Banner", description: "Kelola banner promosi", icon: Image, href: "#", count: 3 },
];

export default function AdminCMSPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-navy-800">Content Management</h1><p className="text-navy-500 mt-1">Kelola konten website dan aplikasi</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:border-emerald-200 transition-colors cursor-pointer h-full"><CardContent className="p-6"><div className="flex items-start gap-4"><div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"><section.icon className="h-6 w-6 text-emerald-600" /></div><div><h3 className="font-semibold text-navy-800">{section.title}</h3><p className="text-sm text-navy-500 mt-1">{section.description}</p>{section.count > 0 && <p className="text-xs text-navy-400 mt-2">{section.count} item</p>}</div></div></CardContent></Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
