import { Request, Response } from "express";
import { fetchGeminiPromptText } from "../utils/gemini";

export const getGeminiPrompt = async (req: Request, res: Response) => {
    try {
        const prompt = await fetchGeminiPromptText();
        res.json(prompt);
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
};
