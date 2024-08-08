import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isWaitlistRoute = req.nextUrl.pathname === "/waitlist" || req.nextUrl.pathname === "/waitlist-join";

    if (!isWaitlistRoute) {
      // Redirect to the /waitlist route if the user is not on the /waitlist or /waitlist-join route
      return NextResponse.redirect(new URL("/waitlist", req.url));
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
  }
);

export const config = {
    // Apply middleware to all routes
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
