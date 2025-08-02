import { Request, Response } from "express";
import { fetchGeminiPromptText } from "../utils/gemini";
import { addDailyPrompt, getDailyPrompt } from "../services/promptService";
import { respondWithJSON } from "../utils/json";

export const getGeminiPrompt = async (req: Request, res: Response) => {
    const dailyPrompt = await getDailyPrompt();

    if (!dailyPrompt) {
        const prompt = await fetchGeminiPromptText();

        await addDailyPrompt(prompt);
        respondWithJSON(res, 200, prompt);
    } else {
        respondWithJSON(res, 200, dailyPrompt.text);
    }
};
