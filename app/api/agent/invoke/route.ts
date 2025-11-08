import { invokeAgent } from "@/agent/TradingAgent";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const accounts = await prisma.account.findMany();

    for (const account of accounts) {
        console.log(`Account ID: ${account.id}, Model: ${account.model}`);

        await invokeAgent(account.invocationCount + 1, account.startTime.getTime(), account.id, account.model);
        await prisma.account.update({
            where: { id: account.id },
            data: { invocationCount: account.invocationCount + 1 }
        });
    }
    return new NextResponse("Agent Invoke GET Endpoint");
}