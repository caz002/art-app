import express, { Router, Request, Response } from 'express';
import dotenv from "dotenv";
dotenv.config({path: "../../.env" });
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;
const router = Router();

if (!apiKey) {
    throw new Error("Missing Gemini API key configuration in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

let dailyPrompt: {prompt: string, response: string} | null = null;

// Generates prompt from model and stores it in dailyPrompt
router.get("/generate", async (req: Request, res: Response) => {
    try {
        //const {prompt} = req.body;
        const model = genAI.getGenerativeModel({  model: "gemini-1.5-flash" });
        const prompt = "Give me a random drawing idea, 10 words max"
        const result = await model.generateContent(prompt);
        //const response = await result.response;
        const text = result.response.text();
        dailyPrompt = { prompt, response: text };
        res.json(dailyPrompt);
        
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
});

export default router;