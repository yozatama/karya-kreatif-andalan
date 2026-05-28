// Authentication utility - custom auth approach with cookies/localStorage
// Provides auth helpers for the application

import { verifyCookie } from '@/lib/cookie-utils';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  platform?: string;
  isVerified: boolean;
}

// Mock users for demo
export const MOCK_USERS: AuthUser[] = [
  {
    id: '1',
    firstName: 'Budi',
    lastName: 'Santoso',
    email: 'budi@email.com',
    phone: '081234567890',
    role: 'user',
    avatar: '/placeholder/64x64.svg',
    platform: 'Gojek',
    isVerified: true,
  },
  {
    id: '2',
    firstName: 'Admin',
    lastName: 'KKA',
    email: 'admin@karyakreatif.co.id',
    phone: '081200000000',
    role: 'admin',
    avatar: '/placeholder/64x64.svg',
    isVerified: true,
  },
];

export const AUTH_COOKIE_NAME = 'kka-auth-token';

export async function getCurrentUser(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  try {
    // Verify signed cookie (format: base64.hmac)
    const data = await verifyCookie(token);
    if (data && typeof data === 'object' && 'id' in data) {
      const parsed = data as { id: string; email?: string };
      const user = MOCK_USERS.find((u) => u.id === parsed.id || u.email === parsed.email);
      return user || null;
    }
  } catch {
    // Verification failed - cookie is invalid or tampered
  }

  return null;
}

export async function isAuthenticated(token: string | undefined): Promise<boolean> {
  return (await getCurrentUser(token)) !== null;
}

export async function isAdmin(token: string | undefined): Promise<boolean> {
  const user = await getCurrentUser(token);
  return user?.role === 'admin';
}

export function validateCredentials(
  email: string,
  password: string
): AuthUser | null {
  // Mock validation - in production this would check against DB
  if (password.length < 8) return null;
  const user = MOCK_USERS.find((u) => u.email === email);
  if (user) return user;
  // For demo: any valid email with password >= 8 chars logs in as default user
  if (email.includes('@') && password.length >= 8) {
    return MOCK_USERS[0];
  }
  return null;
}
