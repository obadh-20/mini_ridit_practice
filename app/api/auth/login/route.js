import { NextResponse } from 'next/server.js';
import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export async function  POST(req) {
    const data = await req.json();

    const founduser=await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    })
    if (!founduser) { 
        return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
 
    const isMatch=await bcrypt.compare(data.password, founduser.password)
    if (!isMatch) {
        return NextResponse.json(
            { message: "Invalid Credentials" },
            { status: 401 }
        );
    }
    const token = jwt.sign(
        {
            id: founduser.id,
            email: founduser.email,
            
        },
        process.env.JWT_SECRET,
        {expiresIn:'1h'}
    )
   
    const response = NextResponse.json({message: "Login Successful"},{status:200});
    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
    })
    return response;

}