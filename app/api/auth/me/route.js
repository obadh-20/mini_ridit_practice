
 import { NextResponse } from 'next/server.js';
import { PrismaClient } from "@/app/generated/prisma";
import { jwtDecode } from "jwt-decode";
const prisma = new PrismaClient();
export async function GET(req) { 
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) { 
            return NextResponse.json({message:"Unauthorized"}, {status: 401});
        }
        const decoded = jwtDecode(token);
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                email: true,
            }
        });
        return NextResponse.json(user, {status: 200});
     }catch (err) {
        console.error("Error decoding token:", err);
        return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    }
}