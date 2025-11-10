"use client"
import { useCryptoPrices } from "@/hooks/useCryptoPrices";
import { motion } from "framer-motion";

export function CryptoPriceBar() {

  const { prices } = useCryptoPrices();

  return (
    <div className="bg-secondary/50 border-b border-border py-3 overflow-x-auto">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 min-w-max">
          {prices.map((crypto, index) => (
            <motion.div
              key={crypto.symbol}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-bold text-primary">{crypto.icon}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">{crypto.symbol}</span>
                <span className="text-sm font-mono text-foreground">
                  ${crypto.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: crypto.price < 1 ? 4 : 2
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
