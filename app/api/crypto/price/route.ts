import accountService from "@/service/AccountService";
import { NextResponse } from "next/server";

export async function GET() {
    const prices = await accountService.getCurrentPrices();

    const result = [
        { symbol: "BTC", name: "Bitcoin", price: prices.BTCUSDT, icon: "₿" },
        { symbol: "ETH", name: "Ethereum", price: prices.ETHUSDT, icon: "◆" },
        { symbol: "SOL", name: "Solana", price: prices.SOLUSDT, icon: "◎" },
        { symbol: "BNB", name: "BNB", price: prices.BNBUSDT, icon: "●" },
        { symbol: "XRP", name: "XRP", price: prices.XRPUSDT, icon: "✕" },
    ];

    return NextResponse.json({ prices: result, status: true });
}
