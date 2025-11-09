import { Account, Position, AgentInvocation } from "@/types/trading";

// Generate realistic price movements for crypto
function generatePriceData(startPrice: number, volatility: number = 0.03, points: number = 100) {
  const data: number[] = [startPrice];
  for (let i = 1; i < points; i++) {
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = data[i - 1] * (1 + change);
    data.push(newPrice);
  }
  return data;
}

// Generate time series data for the last 7 days
function generateTimestamps(points: number = 100) {
  const now = Date.now();
  const interval = (7 * 24 * 60 * 60 * 1000) / points; // 7 days divided into points
  return Array.from({ length: points }, (_, i) => new Date(now - (points - i) * interval));
}

const timestamps = generateTimestamps(150);

// Generate performance data for each model
const modelsData = {
  "GPT-5": {
    color: "hsl(var(--model-gpt))",
    data: generatePriceData(10000, 0.05, 150),
    volatility: 0.05
  },
  "Claude-3-Opus": {
    color: "hsl(var(--model-claude))",
    data: generatePriceData(10000, 0.045, 150),
    volatility: 0.045
  },
  "Gemini-2.5-Pro": {
    color: "hsl(var(--model-gemini))",
    data: generatePriceData(10000, 0.04, 150),
    volatility: 0.04
  },
  "Qwen-3-Max": {
    color: "hsl(var(--model-mistral))",
    data: generatePriceData(10000, 0.06, 150),
    volatility: 0.06
  },
  "DeepSeek-V3.1": {
    color: "hsl(var(--model-llama))",
    data: generatePriceData(10000, 0.055, 150),
    volatility: 0.055
  },
};

export const mockAccounts: Account[] = [
  {
    id: "1",
    modelName: "GPT-5",
    accountValue: modelsData["GPT-5"].data[modelsData["GPT-5"].data.length - 1],
    availableCash: 4326.13,
    totalReturn: -56.74,
    invocationCount: 847,
    latestInvocation: {
      id: "inv1",
      accountId: "1",
      timestamp: timestamps[timestamps.length - 1].toISOString(),
      accountValue: modelsData["GPT-5"].data[modelsData["GPT-5"].data.length - 1],
      availableCash: 4326.13,
    }
  },
  {
    id: "2",
    modelName: "Claude-3-Opus",
    accountValue: modelsData["Claude-3-Opus"].data[modelsData["Claude-3-Opus"].data.length - 1],
    availableCash: 5840.22,
    totalReturn: 22.87,
    invocationCount: 923,
    latestInvocation: {
      id: "inv2",
      accountId: "2",
      timestamp: timestamps[timestamps.length - 1].toISOString(),
      accountValue: modelsData["Claude-3-Opus"].data[modelsData["Claude-3-Opus"].data.length - 1],
      availableCash: 5840.22,
    }
  },
  {
    id: "3",
    modelName: "Gemini-2.5-Pro",
    accountValue: modelsData["Gemini-2.5-Pro"].data[modelsData["Gemini-2.5-Pro"].data.length - 1],
    availableCash: 6123.45,
    totalReturn: 34.56,
    invocationCount: 1056,
    latestInvocation: {
      id: "inv3",
      accountId: "3",
      timestamp: timestamps[timestamps.length - 1].toISOString(),
      accountValue: modelsData["Gemini-2.5-Pro"].data[modelsData["Gemini-2.5-Pro"].data.length - 1],
      availableCash: 6123.45,
    }
  },
  {
    id: "4",
    modelName: "Qwen-3-Max",
    accountValue: modelsData["Qwen-3-Max"].data[modelsData["Qwen-3-Max"].data.length - 1],
    availableCash: 3843.09,
    totalReturn: -6.57,
    invocationCount: 789,
    latestInvocation: {
      id: "inv4",
      accountId: "4",
      timestamp: timestamps[timestamps.length - 1].toISOString(),
      accountValue: modelsData["Qwen-3-Max"].data[modelsData["Qwen-3-Max"].data.length - 1],
      availableCash: 3843.09,
    }
  },
  {
    id: "5",
    modelName: "DeepSeek-V3.1",
    accountValue: modelsData["DeepSeek-V3.1"].data[modelsData["DeepSeek-V3.1"].data.length - 1],
    availableCash: 5226.24,
    totalReturn: 10.48,
    invocationCount: 934,
    latestInvocation: {
      id: "inv5",
      accountId: "5",
      timestamp: timestamps[timestamps.length - 1].toISOString(),
      accountValue: modelsData["DeepSeek-V3.1"].data[modelsData["DeepSeek-V3.1"].data.length - 1],
      availableCash: 5226.24,
    }
  },
];

export const mockPositions: Position[] = [
  {
    id: "pos1",
    accountId: "1",
    modelName: "GPT-5",
    symbol: "BTC",
    side: "LONG",
    entryPrice: 98234.50,
    leverage: 3,
    pnl: -1245.67,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "pos2",
    accountId: "2",
    modelName: "Claude-3-Opus",
    symbol: "ETH",
    side: "LONG",
    entryPrice: 3189.23,
    leverage: 5,
    pnl: 2340.89,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "pos3",
    accountId: "3",
    modelName: "Gemini-2.5-Pro",
    symbol: "SOL",
    side: "SHORT",
    entryPrice: 162.45,
    leverage: 4,
    pnl: 1456.23,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "pos4",
    accountId: "4",
    modelName: "Qwen-3-Max",
    symbol: "DOGE",
    side: "LONG",
    entryPrice: 0.1623,
    leverage: 10,
    pnl: -234.56,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "pos5",
    accountId: "5",
    modelName: "DeepSeek-V3.1",
    symbol: "BNB",
    side: "SHORT",
    entryPrice: 945.67,
    leverage: 3,
    pnl: 567.89,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
];

// Generate chart data combining all models
export function generateChartData() {
  return timestamps.map((timestamp, index) => {
    const point: any = {
      timestamp: timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' }),
      fullTimestamp: timestamp.toISOString(),
    };

    Object.entries(modelsData).forEach(([model, data]) => {
      point[model] = data.data[index];
    });

    return point;
  });
}

export const modelColors = Object.fromEntries(
  Object.entries(modelsData).map(([name, data]) => [name, data.color])
);

// Mock crypto prices
export const mockCryptoPrices = [
  { symbol: "BTC", name: "Bitcoin", price: 101030.50, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", price: 3301.00, icon: "◆" },
  { symbol: "SOL", name: "Solana", price: 155.75, icon: "◎" },
  { symbol: "BNB", name: "BNB", price: 939.44, icon: "●" },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1590, icon: "Ð" },
  { symbol: "XRP", name: "XRP", price: 2.22, icon: "✕" },
];
