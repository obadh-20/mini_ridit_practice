import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";
export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const pathname = req.nextUrl.pathname;
    // If no token, redirect to login
    if (!token) {
        if (pathname.startsWith("/Dashboard") ||
            pathname.startsWith("/Profile") ||
            pathname === "/") {
            return NextResponse.redirect(new URL("/Login", req.url));
        }
        return NextResponse.next();
    }

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded payload:", decoded);
        return NextResponse.next(); // allow request
    } catch (err) {
        console.log(err.message);
        return NextResponse.redirect(new URL("/Login", req.url));
    }
}

// Run middleware only for these routes
export const config = {
    matcher: ["/Dashboard/:path*", "/Profile/:path*", "/"], // protected pages
};
