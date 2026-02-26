import { NextResponse } from "next/server";

export async function middleware(request) {
    const authCookie = request.cookies.get("auth")?.value;
    const isLoginPage = request.nextUrl.pathname === "/login";

    // If no cookie and not on login page, redirect to login
    if (!authCookie && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // If valid cookie exists and on login page, redirect to home
    // Ideally we verify the token here, but even a basic existence check
    // prevents the login screen from showing once authenticated.
    if (authCookie && isLoginPage) {
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
