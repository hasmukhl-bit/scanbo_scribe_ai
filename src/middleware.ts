import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutePrefixes = [
  "/my-recordings",
  "/patients",
  "/consultation",
  "/start-consult",
  "/settings",
  "/credits",
  "/support",
  "/training"
];

const authRoutes = ["/login-password", "/forgot-password"];

const isPrefixedRoute = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = await getToken({ req: request });

  const isProtected = protectedRoutePrefixes.some((prefix) =>
    isPrefixedRoute(pathname, prefix)
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login-password", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = authRoutes.some((route) => isPrefixedRoute(pathname, route));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/my-recordings", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
