import type { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD.js";

export interface CandleType {
    openTime: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
}

export interface CandleStickDataType {
    data: CandleType[];
    midPrices: number[];
    ema20: number[];
    macd: MACDOutput[];
}

export interface Position {
    id: number;
    symbol: string;
    side: "LONG" | "SHORT";
    entryPrice: number;
    exitPrice: number | null;
    quantity: number;
    leverage: number;
    createdAt: string;
    closedAt: string | null;
    pnl: number;
    isOpen: boolean;
    accountId: number;
}

export interface ToolCall {
    id: string;
    args: Record<string, any>;
    name: string;
    type: "tool_call";
}

export interface AccountInvocation {
    id: number;
    timestamp: string;
    minutesSinceStart: number;
    invocationCount: number;
    accountValue: number;
    availableCash: number;
    totalReturn: number;
    openPositions: Position[];
    toolCalls: ToolCall[];
    response: string;
    accountId: number;
}

export interface AccountType {
    id: number;
    model: string;
    invocationCount: number;
    totalReturn: number;
    initialCapital: number;
    availableCash: number;
    accountValue: number;
    createdAt: string;
    updatedAt: string;
    startTime: string;
    positions: Position[];
    accountInvocations: AccountInvocation[];
}

export interface AccountContextType {
    accounts: AccountType[],
    setAccounts: React.Dispatch<React.SetStateAction<AccountType[]>>
}

export interface CryptoPrice {
    symbol: string;
    name: string;
    price: number;
    icon: string;
}