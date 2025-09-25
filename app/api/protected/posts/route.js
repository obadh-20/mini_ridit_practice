import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";
import { jwtDecode } from "jwt-decode";
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwtDecode(token);
        try {
            const data = await req.json();
            const newPost = await prisma.post.create({
                data: {
                    title: data.Title,
                    content: data.message,
                    authorId: decoded.id
                }
            });

            return NextResponse.json("success", { status: 200 });
        } catch (error) {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
        }


    } catch (err) {
        console.error("Error decoding token:", err);
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
}
export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const decoded = jwtDecode(token);
        try {
            const posts = await prisma.post.findMany({
                take: 10,
            });
            return NextResponse.json(posts, { status: 200 });
        } catch (error) {
            console.error("Error fetching posts:", error);
            return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
     }
}