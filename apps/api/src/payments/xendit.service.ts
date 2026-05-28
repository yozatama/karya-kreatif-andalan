import { Injectable } from '@nestjs/common';

@Injectable()
export class XenditService {
  async createVirtualAccount(amount: number, bookingId: string) {
    // Stub: In production, integrate with Xendit Virtual Account API
    return {
      id: `va_${Date.now()}`,
      bankCode: 'BCA',
      accountNumber: '8001234567890',
      amount,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: 'PENDING',
      bookingId,
    };
  }

  async createEwallet(amount: number, bookingId: string) {
    // Stub: In production, integrate with Xendit E-Wallet API (OVO, GoPay, Dana)
    return {
      id: `ew_${Date.now()}`,
      ewalletType: 'OVO',
      amount,
      checkoutUrl: `https://xendit.co/checkout/stub/${bookingId}`,
      status: 'PENDING',
      bookingId,
    };
  }

  async createQris(amount: number, bookingId: string) {
    // Stub: In production, integrate with Xendit QRIS API
    return {
      id: `qr_${Date.now()}`,
      qrString: 'stub-qr-string-for-development',
      amount,
      status: 'PENDING',
      bookingId,
    };
  }

  async checkStatus(xenditId: string) {
    // Stub: In production, check payment status from Xendit
    return {
      id: xenditId,
      status: 'PENDING',
    };
  }
}
