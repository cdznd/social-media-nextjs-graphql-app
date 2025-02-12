import { NextRequest, NextResponse } from "next/server";

import { hash } from 'bcrypt';

import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {

    const { 
        name,
        email,
        password,
        username
    } = await request.json()

    const hashedPassword = hash(password, 10)

    // prisma.user.create({
    //     email,
    //     hashedPassword
    // })

    return NextResponse.json({})
}