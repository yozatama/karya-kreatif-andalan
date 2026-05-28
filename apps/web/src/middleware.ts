import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'kka-auth-token';

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin'];

// Routes only accessible to unauthenticated users
const authRoutes = ['/auth'];

// Admin-only routes
const adminRoutes = ['/admin'];

const ADMIN_ROLES = ['admin'];

function parseAuthCookie(cookieValue: string | undefined): { id: string; email: string; role: string } | null {
  if (!cookieValue) return null;
  try {
    const parsed = JSON.parse(cookieValue);
    if (parsed && parsed.id && parsed.role) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const authData = parseAuthCookie(cookieValue);

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is admin-only
  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Not authenticated trying to access protected route
  if (isProtectedRoute && !authData) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated user trying to access auth routes
  if (isAuthRoute && authData) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Non-admin user trying to access admin routes
  if (isAdminRoute && authData && !ADMIN_ROLES.includes(authData.role)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/auth/:path*',
  ],
};
