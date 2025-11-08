import { ChatOpenAI } from "@langchain/openai";

export const llm = {
    qwen: new ChatOpenAI({
        model: "qwen/qwen3-32b",
        apiKey: process.env.GROQ_API_KEY || "",
        configuration: {
            baseURL: "https://api.groq.com/openai/v1"
        }
    }),
    gpt: new ChatOpenAI({
        model: "openai/gpt-oss-120b",
        apiKey: process.env.GROQ_API_KEY || "",
        configuration: {
            baseURL: "https://api.groq.com/openai/v1"
        }
    }),
}