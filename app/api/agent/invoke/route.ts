import { invokeAgent } from "@/agent/TradingAgent";
import { NextRequest, NextResponse } from "next/server";

let invocationCount = 0;
const startTime = Date.now();

export async function GET(req: NextRequest) {
    await invokeAgent(invocationCount++, startTime);
    return new NextResponse("Agent Invoke GET Endpoint");
}