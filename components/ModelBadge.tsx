import { motion } from "framer-motion";

interface ModelBadgeProps {
  name: string;
  value: number;
  color: string;
  change: number;
  index: number;
}

export function ModelBadge({ name, value, color, change, index }: ModelBadgeProps) {
  const isPositive = change >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30"
    >
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: color, color: 'hsl(var(--background))' }}
      >
        {name.charAt(0)}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">{name}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-bold text-foreground">
            ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </span>
          <span className={`text-xs font-bold ${isPositive ? 'text-profit' : 'text-loss'}`}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
