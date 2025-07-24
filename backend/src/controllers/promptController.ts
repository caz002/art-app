import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { fetchGeminiPromptText } from "../utils/gemini";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error(
        "Missing Gemini API key configuration in environment variables."
    );
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiPrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await fetchGeminiPromptText();
        res.json(prompt);
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
};
