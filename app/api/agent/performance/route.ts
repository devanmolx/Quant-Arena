import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const accounts = await prisma.account.findMany({
            include: {
                positions: true,
                accountInvocations: true
            }
        });

        return NextResponse.json({ accounts, status: true });

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", status: false }, { status: 500 });
    }
}