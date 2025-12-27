import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const body = await req.json();

    const { model } = body;

    try {

        if (!model) {
            return NextResponse.json({ error: "No model is provided" }, { status: 400 });
        }

        const agent = await prisma.account.create({
            data: {
                model
            }
        })

        return NextResponse.json({ agent }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}