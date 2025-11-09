"use client"
import { motion } from "framer-motion";
import { Account } from "@/types/trading";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

interface ModelCardProps {
  account: Account;
  index: number;
}

const getModelColor = (modelName: string): string => {
  const name = modelName.toLowerCase();
  if (name.includes("gpt")) return "hsl(var(--model-gpt))";
  if (name.includes("claude")) return "hsl(var(--model-claude))";
  if (name.includes("gemini")) return "hsl(var(--model-gemini))";
  if (name.includes("mistral")) return "hsl(var(--model-mistral))";
  if (name.includes("llama")) return "hsl(var(--model-llama))";
  return "hsl(var(--primary))";
};

export function ModelCard({ account, index }: ModelCardProps) {
  const isPositive = account.totalReturn >= 0;
  const modelColor = getModelColor(account.modelName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="p-6 border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: modelColor }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground" style={{ color: modelColor }}>
              {account.modelName}
            </h3>
            <p className="text-sm text-muted-foreground">AI Trading Model</p>
          </div>
          {isPositive ? (
            <TrendingUp className="text-profit" size={24} />
          ) : (
            <TrendingDown className="text-loss" size={24} />
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <DollarSign size={16} />
              Account Value
            </span>
            <span className="text-lg font-bold text-foreground">
              ${account.accountValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Available Cash</span>
            <span className="text-sm font-medium text-foreground">
              ${account.availableCash.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Activity size={16} />
              Total Return
            </span>
            <span className={`text-lg font-bold ${isPositive ? "text-profit" : "text-loss"}`}>
              {isPositive ? "+" : ""}{account.totalReturn.toFixed(2)}%
            </span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Invocations</span>
              <span className="text-xs font-medium text-foreground">{account.invocationCount}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
