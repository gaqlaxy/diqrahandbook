import { NextResponse } from "next/server";

export function middleware(request) {
    const authCookie = request.cookies.get("auth");
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!authCookie && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

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
