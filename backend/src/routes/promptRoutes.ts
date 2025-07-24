import express from "express";
import { getGeminiPrompt } from "../controllers/promptController";

const router = express.Router();

// Different routes to different ways of generating prompts if necessary
router.get("/gemini", getGeminiPrompt)

export default router;