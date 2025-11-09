"use client"
import { motion } from "framer-motion";
import { RefreshCw, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const Header = () => {

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        toast.success("Data refreshed successfully");
        setTimeout(() => setIsRefreshing(false), 500);
    };

    return (
        <header className=" border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <Activity className="text-primary" size={28} />
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Quant Arena</h1>
                            <p className="text-xs text-muted-foreground">AI Trading Performance Dashboard</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <Button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className="gap-2"
                            size="sm"
                        >
                            <RefreshCw className={isRefreshing ? "animate-spin" : ""} size={14} />
                            Refresh
                        </Button>
                    </motion.div>
                </div>
            </div>
        </header>
    )
}

export default Header