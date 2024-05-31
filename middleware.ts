import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && !pathname.includes("/api/auth")) {
    const url = req.nextUrl.clone();
    url.pathname = "/me";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/orders",
    "/orders/:path*",
    "/checkout/:path*",
    "/payment-failed",
    "/payment-success",
    "/addresses",
  ],
};
