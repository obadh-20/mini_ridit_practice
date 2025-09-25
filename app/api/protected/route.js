import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import {jwtDecode} from "jwt-decode";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwtDecode(token);
        console.log("Decoded payload:", decoded);
        return NextResponse.json({ email: decoded.email }, { status: 200 });
    } catch (err) {
        console.error("Error decoding token:", err);
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
}