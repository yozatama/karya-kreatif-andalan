"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-navy-800">
            Karya<span className="text-emerald-500">Kreatif</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-600 transition-colors hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">
            Masuk
          </Button>
          <Button size="sm">Daftar</Button>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-navy-700 hover:bg-gray-100 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="right">
        <SheetHeader>
          <SheetTitle>
            <span className="text-navy-800">
              Karya<span className="text-emerald-500">Kreatif</span>
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-navy-700 hover:text-emerald-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
            <Button variant="outline" className="w-full">
              Masuk
            </Button>
            <Button className="w-full">Daftar</Button>
          </div>
        </nav>
      </Sheet>
    </motion.header>
  );
}
