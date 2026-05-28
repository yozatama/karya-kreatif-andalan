import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/fleet", "/about", "/contact", "/faq", "/partnership", "/blog", "/login", "/register"];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(route + "/");
  });
}

/**
 * Decode the JWT payload (middle segment) without full cryptographic verification.
 * This runs on the edge where we cannot perform full JWT verification efficiently.
 * True authorization is enforced server-side by the backend API guards.
 */
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin")) {
    // Decode the JWT payload from the auth token to extract the role.
    // NOTE: This is a client-side convenience check only. The backend API
    // performs full JWT verification and RBAC enforcement on every request.
    const payload = token ? decodeJwtPayload(token) : null;
    const role = payload?.role as string | undefined;

    if (role !== "admin" && role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
