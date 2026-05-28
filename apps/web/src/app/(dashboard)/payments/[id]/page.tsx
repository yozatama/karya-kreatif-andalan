"use client";

import { use } from "react";
import { ArrowLeft, Download, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { payments } from "@/lib/dashboard-data";
import Link from "next/link";

export default function PaymentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const payment = payments.find((p) => p.id === id) || payments[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/payments">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Detail Pembayaran</h1>
          <p className="text-navy-500">{payment.invoice}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-emerald-600" />
              Informasi Invoice
            </CardTitle>
            <Badge variant={payment.status === "lunas" ? "success" : payment.status === "pending" ? "warning" : "danger"}>
              {payment.status === "lunas" ? "Lunas" : payment.status === "pending" ? "Pending" : "Gagal"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-navy-500">Nomor Invoice</p>
                <p className="font-medium text-navy-800">{payment.invoice}</p>
              </div>
              <div>
                <p className="text-sm text-navy-500">Tanggal</p>
                <p className="font-medium text-navy-800">{payment.date}</p>
              </div>
              <div>
                <p className="text-sm text-navy-500">Metode Pembayaran</p>
                <p className="font-medium text-navy-800">{payment.method}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-navy-500">Deskripsi</p>
                <p className="font-medium text-navy-800">{payment.description}</p>
              </div>
              <div>
                <p className="text-sm text-navy-500">Jumlah</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(payment.amount)}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-navy-800 mb-3">Rincian Pembayaran</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Biaya Rental</span>
                <span className="text-navy-800">{formatCurrency(payment.amount * 0.9)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Biaya Admin</span>
                <span className="text-navy-800">{formatCurrency(payment.amount * 0.05)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-navy-500">Asuransi</span>
                <span className="text-navy-800">{formatCurrency(payment.amount * 0.05)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-t pt-2">
                <span className="text-navy-800">Total</span>
                <span className="text-navy-800">{formatCurrency(payment.amount)}</span>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Download Invoice PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
