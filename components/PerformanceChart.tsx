"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { ModelBadge } from "./ModelBadge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion"
import { AccountType } from "@/types/types";

interface PerformanceChartProps {
  accounts: AccountType[];
}

const getModelColor = (modelName: string): string => {
  const name = modelName.toLowerCase();
  if (name.includes("gpt")) return "hsl(var(--model-gpt))";
  if (name.includes("claude")) return "hsl(var(--model-claude))";
  if (name.includes("gemini")) return "hsl(var(--model-gemini))";
  if (name.includes("qwen") || name.includes("mistral")) return "hsl(var(--model-mistral))";
  if (name.includes("deep") || name.includes("llama")) return "hsl(var(--model-llama))";
  return "hsl(var(--primary))";
};

const transformAccountData = (accounts: AccountType[]) => {
  const timestampMap: Record<string, any> = {};

  // Group values by timestamp
  for (const account of accounts) {
    const modelName = account.model;
    for (const inv of account.accountInvocations) {
      const timestamp = inv.timestamp;
      if (!timestampMap[timestamp]) timestampMap[timestamp] = { timestamp };
      timestampMap[timestamp][modelName] = inv.accountValue;
    }
  }

  // Sort by time
  const sorted = Object.values(timestampMap).sort(
    (a: any, b: any) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Make data continuous (fill missing values)
  const models = accounts.map((acc) => acc.model);
  const lastValues: Record<string, number> = {};

  const filledData = sorted.map((entry) => {
    const filled: any = { timestamp: entry.timestamp };
    for (const model of models) {
      if (entry[model] !== undefined) {
        lastValues[model] = entry[model];
      }
      filled[model] = lastValues[model] ?? null;
    }
    return filled;
  });

  return filledData;
};


export function PerformanceChart({ accounts }: PerformanceChartProps) {

  if (!accounts || accounts.length === 0)
    return <p className="text-center text-muted-foreground p-4">No data available.</p>;

  const data = transformAccountData(accounts);
  const models = accounts.map((acc) => acc.model);

  const sortedAccounts = [...accounts].sort((a, b) => b.totalReturn - a.totalReturn);
  const highest = sortedAccounts[0];
  const lowest = sortedAccounts[sortedAccounts.length - 1];

  console.log(data);
  console.log(models);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >

      <Card className="p-0 overflow-hidden">
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-foreground">Total Account Value</h2>
              <Tabs defaultValue="all" className="w-auto">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="all" className="text-xs">ALL</TabsTrigger>
                  <TabsTrigger value="72h" className="text-xs">72H</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">HIGHEST:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: getModelColor(highest.model), color: 'hsl(var(--background))' }}
                  >
                    {highest.model.split('-')[0].charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    ${highest.accountValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-bold text-profit">
                    +{highest.totalReturn.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="h-4 w-px bg-border" />

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">LOWEST:</span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: getModelColor(lowest.model), color: 'hsl(var(--background))' }}
                  >
                    {lowest.model.split('-')[0].charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    ${lowest.accountValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-bold text-loss">
                    {lowest.totalReturn.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative p-6">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" opacity={0.3} />
              <XAxis
                dataKey="timestamp"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                domain={['dataMin - 50', 'dataMax + 50']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--foreground))",
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, ""]}
              />
              {models.map((model) => (
                <Line
                  key={model}
                  type="monotone"
                  dataKey={model}
                  stroke={getModelColor(model)}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>

          <div className="absolute top-12 right-12 flex flex-col gap-2">
            {accounts.map((account, index) => (
              <ModelBadge
                key={account.model}
                name={account.model}
                value={account.accountValue}
                color={getModelColor(account.model)}
                change={account.totalReturn}
                index={index}
              />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
