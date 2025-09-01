import { db } from ".";
import { prompts as promptsTable } from "./schema/prompts";
import { eq } from "drizzle-orm";

export async function getDailyPrompt() {
    const todaysDate = new Date();
    todaysDate.setUTCHours(0, 0, 0, 0);

    const daily = await db
        .select()
        .from(promptsTable)
        .where(eq(promptsTable.date, todaysDate))
        .then((res) => res[0]);

    if (!daily) {
        return null;
    }

    return daily.prompt;
}

export async function addDailyPrompt(prompt: string, category: string) {
    const todaysDate = new Date();
    todaysDate.setUTCHours(0, 0, 0, 0);

    const daily = await db
        .insert(promptsTable)
        .values({ date: todaysDate, prompt, category })
        .returning()
        .then((res) => res[0]);

    if (!daily) {
        return null;
    }

    return daily.prompt;
}
