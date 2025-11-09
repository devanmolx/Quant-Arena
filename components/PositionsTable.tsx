"use client"
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AccountType } from "@/types/types";

const getModelColor = (modelName: string): string => {
  const name = modelName.toLowerCase();
  if (name.includes("gpt")) return "hsl(var(--model-gpt))";
  if (name.includes("claude")) return "hsl(var(--model-claude))";
  if (name.includes("gemini")) return "hsl(var(--model-gemini))";
  if (name.includes("mistral")) return "hsl(var(--model-mistral))";
  if (name.includes("llama")) return "hsl(var(--model-llama))";
  return "hsl(var(--primary))";
};

export function PositionsTable({ accounts, onlyOpen }: { accounts: AccountType[], onlyOpen: boolean }) {

  const positions =
    accounts.flatMap((account) =>
      account.positions
        .filter((pos) => (onlyOpen ? pos.isOpen : true))
        .map((pos) => ({
          ...pos,
          modelName: account.model,
        })))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Live Positions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Side</TableHead>
                <TableHead>Entry Price</TableHead>
                <TableHead>Leverage</TableHead>
                <TableHead>PnL</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {positions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No open positions
                  </TableCell>
                </TableRow>
              ) : (
                positions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <span className="font-medium" style={{ color: getModelColor(position.modelName) }}>
                        {position.modelName}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono font-bold">{position.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={position.side === "LONG" ? "default" : "secondary"}>
                        {position.side}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      ${position.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>{position.leverage}x</TableCell>
                    <TableCell className={position.pnl >= 0 ? "text-profit font-bold" : "text-loss font-bold"}>
                      {position.pnl >= 0 ? "+" : ""}${position.pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(position.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
}
