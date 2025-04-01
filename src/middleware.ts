import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  // If the user is not authenticated and trying to access a protected route
  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and trying to access the login page
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
