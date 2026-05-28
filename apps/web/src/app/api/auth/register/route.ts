import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth';
import { signCookie } from '@/lib/cookie-utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password, platform } = body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      );
    }

    // Mock registration - in production would create user in DB
    const newUser = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      phone,
      role: 'user' as const,
      platform,
      isVerified: false,
    };

    const response = NextResponse.json({
      user: newUser,
      message: 'Registrasi berhasil',
    });

    const cookieData = { id: newUser.id, email: newUser.email, role: newUser.role };
    const signedValue = await signCookie(cookieData);

    response.cookies.set(AUTH_COOKIE_NAME, signedValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
