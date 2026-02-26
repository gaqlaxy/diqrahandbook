import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { idToken } = await request.json();

        if (!idToken) {
            return NextResponse.json({ error: "Missing token" }, { status: 400 });
        }

        const cookieStore = await cookies();

        // In a real production app with firebase-admin, you would create a session cookie here:
        // const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        // const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        // For now, we will use the ID token directly as the 'auth' cookie 
        // to simplify the initial setup while keeping it secure via middleware verification.
        cookieStore.set("auth", idToken, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return NextResponse.json({ status: "success" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete("auth");
    return NextResponse.json({ status: "success" });
}
