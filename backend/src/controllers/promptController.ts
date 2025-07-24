import { Request, Response } from "express";
import { fetchGeminiPromptText } from "../utils/gemini";
import { addDailyPrompt, getDailyPrompt } from "../services/promptService";

export const getGeminiPrompt = async (req: Request, res: Response) => {
    try {
        const dailyPrompt = await getDailyPrompt();

        if (!dailyPrompt) {
            const prompt = await fetchGeminiPromptText();

            await addDailyPrompt(prompt);
            res.json(prompt);
        } else {
            res.json(dailyPrompt.text);
        }
    } catch (error) {
        console.error("getGeminiPrompt:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
};
