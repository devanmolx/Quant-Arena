import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { prisma } from "@/lib/prisma";
import accountService from "@/service/AccountService";

export function createPositionToolFactory(accountId: number) {
    return tool(
        async ({ symbol, side, quantity, leverage, profitTarget, stopLoss, invalidationCondition }) => {
            const entryPrice = await accountService.getCurrentPrice(symbol);
            const marginRequired = (entryPrice * quantity) / leverage;

            const account = await prisma.account.findUnique({ where: { id: accountId } });
            if (!account) throw new Error(`Account ${accountId} not found`);

            if (account.availableCash < marginRequired) {
                throw new Error(`Insufficient cash. Need ${marginRequired}, have ${account.availableCash}`);
            }

            const position = await prisma.position.create({
                data: {
                    symbol,
                    side,
                    entryPrice,
                    quantity,
                    leverage,
                    isOpen: true,
                    accountId,
                    exit_plan: {
                        create: {
                            profitTarget,
                            stopLoss,
                            invalidationCondition,
                        },
                    },
                },
            });

            await prisma.account.update({
                where: { id: accountId },
                data: { availableCash: account.availableCash - marginRequired },
            });

            console.log(`✅ [Account ${accountId}] Opened ${side} ${symbol} at ${entryPrice}, qty=${quantity}, lev=${leverage}`);

            return {
                status: "opened",
                accountId,
                symbol,
                side,
                quantity,
                entryPrice,
                leverage,
                marginUsed: marginRequired,
            };
        },
        {
            name: "createPosition",
            description: `Open a simulated trading position for account ${accountId}`,
            schema: z.object({
                symbol: z.string(),
                side: z.enum(["LONG", "SHORT"]),
                quantity: z.number(),
                leverage: z.number(),
                profitTarget: z.number(),
                stopLoss: z.number(),
                invalidationCondition: z.string(),
            }),
        }
    );
}


export function closePositionToolFactory(accountId: number) {
    return tool(
        async ({ transactionId }) => {
            const position = await prisma.position.findUnique({ where: { id: transactionId } });
            if (!position) throw new Error(`No open position found for ${transactionId}`);

            const currentPrice = await accountService.getCurrentPrice(position.symbol);
            const diff = parseFloat(((currentPrice - position.entryPrice) * position.quantity).toFixed(2));
            const pnl = position.side === "LONG" ? diff : -diff;

            await prisma.position.update({
                where: { id: position.id },
                data: {
                    pnl,
                    isOpen: false,
                    exitPrice: currentPrice,
                    closedAt: new Date(),
                },
            });

            const account = await prisma.account.findUnique({ where: { id: accountId } });
            if (!account) throw new Error(`Account ${accountId} not found`);

            const marginReleased = ((position.quantity * position.entryPrice) / position.leverage).toFixed(2);
            const newCash = account.availableCash + parseFloat(marginReleased) + pnl;
            const accountValue = account.accountValue + pnl;

            const totalReturn = parseFloat(
                (((accountValue - account.initialCapital) / account.initialCapital) * 100).toFixed(2)
            );

            await prisma.account.update({
                where: { id: accountId },
                data: { availableCash: newCash, totalReturn, accountValue },
            });

            console.log(`✅ [Account ${accountId}] Closed ${position.symbol} at ${currentPrice}. PnL: ${pnl.toFixed(2)}.`);

            return {
                status: "closed",
                accountId,
                symbol: position.symbol,
                exitPrice: currentPrice,
                pnl: parseFloat(pnl.toFixed(2)),
                newCash: parseFloat(newCash.toFixed(2)),
                totalReturn,
                accountValue,
            };
        },
        {
            name: "closePosition",
            description: `Close a simulated trading position for account ${accountId}`,
            schema: z.object({
                transactionId: z.number(),
            }),
        }
    );
}
