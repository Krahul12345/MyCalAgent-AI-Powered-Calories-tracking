import { NextRequest, NextResponse } from "next/server";

const INR_COUNTRIES = new Set(["IN"]);

// Protected routes that require an authenticated session
const PROTECTED_ROUTES = ["/dashboard", "/scan", "/history", "/profile", "/settings", "/analytics"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Auth guard for protected routes ────────────────────────────────────────
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    const sessionToken =
      request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();

  // ── Geo-based currency hint ─────────────────────────────────────────────────
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  // Only set country cookie if it's a known 2-letter code (prevents injection)
  if (country && /^[A-Z]{2}$/.test(country) && !request.cookies.has("geo_country")) {
    response.cookies.set("geo_country", country.toUpperCase(), {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      httpOnly: false, // needs to be readable by client JS for currency display
      secure: process.env.NODE_ENV === "production",
    });
  }

  // ── Auto-redirect Indian visitors to INR pricing ────────────────────────────
  if (
    INR_COUNTRIES.has(country.toUpperCase()) &&
    pathname === "/pricing" &&
    !request.nextUrl.searchParams.has("region")
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.set("region", "IN");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/scan/:path*",
    "/history/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/analytics/:path*",
    "/pricing",
  ],
};
