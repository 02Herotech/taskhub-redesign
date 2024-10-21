

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/marketplace", req.url));
      }
      return null;
    }
    if (!isAuth) {
      // Redirect to the home page if the user is not authenticated
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    const exp = (token as any).exp

    if (exp) {
      const expirationTime = exp * 1000 // Convert seconds to milliseconds
      const now = Date.now()

      if (expirationTime < now) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
    }

    // Add any other middleware logic here if needed
    return null; // Ensure you return a value to prevent falling through
  },
  {
    callbacks: {
      async authorized() {
        // This is a workaround for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  },
);
export const config = {
  matcher: [
    "/explore/:path*",
    "/customer/notifications/:path*",
    "/customer/notification-settings/:path*",
    "/customer/password/:path*",
    "/customer/payment/:path*",
    "/customer/profile/:path*",
    "/customer/settings/:path*",
    "/customer/tasks/:path*",
    "/service-provider/:path*",
  ],
};
