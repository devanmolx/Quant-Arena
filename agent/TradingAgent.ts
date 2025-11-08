import { ChatPromptTemplate } from "@langchain/core/prompts";
import { closePositionToolFactory, createPositionToolFactory } from "./tools";
import { prisma } from "@/lib/prisma";
import accountService from "@/service/AccountService";
import { llm } from "../service/LLMService"

export async function invokeAgent(invocationCount: number, startTime: number, accountNo: number, model: string) {

    const minutesSinceStart = Math.floor((Date.now() - startTime) / 60000);
    const currentTime = new Date().toISOString();

    const accountData = await accountService.getAccountData(accountNo);

    if (!accountData) {
        throw new Error("Account not found");
    }

    console.log(accountData);

    const { totalReturn, availableCash, accountValue, positions: openPositions } = accountData;

    const BTCData = await accountService.getFormattedData("BTCUSDT");

    const prompt = ChatPromptTemplate.fromTemplate(`
        You are an expert trader. You were given $10000 dollars to trade with. 
        You are trading on the crypto market. You are given the following information:

        You have tools:
        - createPosition(symbol: string, side: "LONG" | "SHORT", quantity: number, leverage: number)
        - closePosition(transactionId: number)

        DATA CONTEXT:

        Time Elapsed: {minutesSinceStart} minutes since start
        Current Time: {currentTime}
        Invocation Count: {invocationCount}

        MARKET DATA (ordered oldest → newest):
        {BTCData}

        ACCOUNT INFO:
        Total Return (%): {totalReturn}
        Available Cash: {availableCash}
        Account Value: {accountValue}

        CURRENT OPEN POSITIONS:
        {openPositions}
    `);

    if (!(model in llm)) {
        throw new Error(`Unknown model: ${model}`);
    }

    const createPositionTool = createPositionToolFactory(accountNo);
    const closePositionTool = closePositionToolFactory(accountNo);

    const llmWithTools = llm[model as keyof typeof llm].bindTools([createPositionTool, closePositionTool]);

    const chain = prompt.pipe(llmWithTools);

    const result = await chain.invoke({
        minutesSinceStart,
        currentTime,
        invocationCount,
        BTCData: JSON.stringify(BTCData, null, 2),
        totalReturn,
        availableCash,
        accountValue,
        openPositions: JSON.stringify(openPositions, null, 2),
    });

    const formatedPrompt = await prompt.format({
        minutesSinceStart,
        currentTime,
        invocationCount,
        BTCData: JSON.stringify(BTCData, null, 2),
        totalReturn,
        availableCash,
        accountValue,
        openPositions: JSON.stringify(openPositions, null, 2),
    });

    console.log("===== Prompt =====");
    console.log(formatedPrompt);
    console.log("===================");

    console.log("Agent Response:", result);

    const toolCalls = result.tool_calls;

    await prisma.agentInvocation.create({
        data: {
            minutesSinceStart,
            invocationCount,
            accountValue,
            availableCash,
            totalReturn,
            openPositions,
            toolCalls: toolCalls ? JSON.parse(JSON.stringify(toolCalls)) : undefined,
            response: result.text,
            accountId: accountNo,
        }
    });

    if (toolCalls?.length) {
        for (const toolCall of toolCalls) {
            try {
                if (toolCall.name === "createPosition") {
                    await createPositionTool.invoke(toolCall);
                } else if (toolCall.name === "closePosition") {
                    await closePositionTool.invoke(toolCall);
                }
            } catch (err) {
                console.error(`❌ Error executing ${toolCall.name}:`, err);
            }
        }
    } else {
        console.log("No tool calls made.");
    }
}
