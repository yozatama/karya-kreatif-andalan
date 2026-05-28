"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchForm() {
  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Tipe Kendaraan
          </label>
          <select className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
            <option value="">Semua Tipe</option>
            <option value="mobil">Mobil</option>
            <option value="motor-listrik">Motor Listrik</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Lokasi Pickup
          </label>
          <input
            type="text"
            placeholder="Pilih lokasi"
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">
            Tanggal Mulai
          </label>
          <input
            type="date"
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-navy-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div className="flex items-end">
          <Button className="w-full gap-2" size="lg">
            <Search className="h-4 w-4" />
            Cari Armada
          </Button>
        </div>
      </div>
    </div>
  );
}
