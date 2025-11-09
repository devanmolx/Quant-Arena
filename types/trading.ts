export interface Account {
  id: string;
  modelName: string;
  accountValue: number;
  availableCash: number;
  totalReturn: number;
  invocationCount: number;
  latestInvocation?: AgentInvocation;
}

export interface AgentInvocation {
  id: string;
  accountId: string;
  timestamp: string;
  accountValue: number;
  availableCash: number;
}

export interface Position {
  id: string;
  accountId: string;
  modelName: string;
  symbol: string;
  side: "LONG" | "SHORT";
  entryPrice: number;
  leverage: number;
  pnl: number;
  createdAt: string;
}

export interface ChartDataPoint {
  timestamp: string;
  [key: string]: number | string;
}
