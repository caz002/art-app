import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config";

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

export const fetchGeminiPromptText = async () => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt =
            "You are a creative assistant that only writes short drawing prompts. Give me one short drawing prompt that I can draw within 10-30 minutes.";
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return text;
    } catch (error) {
        console.log(
            `getGeminiPrompt Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
        throw error;
    }
};
