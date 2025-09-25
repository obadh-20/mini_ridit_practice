import { NextResponse } from 'next/server.js';
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
export async function POST(req) {
    const data = await req.json();
    await prisma.user.create({
        data: {
            email: data.email,
            password: await bcrypt.hash(data.password, 10)
        }
    }).then(res => console.log(res)).catch(err => console.log(err));
    return NextResponse.json({ message: 'User Registered Successfully' });

}