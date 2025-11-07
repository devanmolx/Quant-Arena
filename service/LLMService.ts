import { ChatOpenAI } from "@langchain/openai";

export const llm = new ChatOpenAI({
    model: "qwen/qwen3-32b",
    apiKey: process.env.GROQ_API_KEY || "",
    configuration: {
        baseURL: "https://api.groq.com/openai/v1"
    }
});
