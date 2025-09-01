import { Hono } from "hono";
import { addDailyPrompt, getDailyPrompt } from "../db/prompts";
import { generatePrompt } from "../libs/prompt";

const DEFAULTPROMPT = "Freebie! Draw whatever you want!";

export const PromptRoute = new Hono().get("/", async (c) => {
    try {
        let prompt = await getDailyPrompt();

        // if prompt exists, use that
        if (prompt) {
            return c.json({ response: prompt });
        }

        // create today's prompt
        const todaysPrompt = await generatePrompt();
        // add to db
        prompt = await addDailyPrompt(
            todaysPrompt?.text || DEFAULTPROMPT,
            todaysPrompt?.category || "default"
        );

        return c.json({ response: prompt ? prompt : DEFAULTPROMPT });
    } catch (e) {
        console.log(e);
        return c.json({ response: DEFAULTPROMPT });
    }
});
