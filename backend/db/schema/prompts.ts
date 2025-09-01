import { pgTable, timestamp, text } from "drizzle-orm/pg-core";

export const prompts = pgTable("prompts", {
    date: timestamp("date").notNull().primaryKey(),
    prompt: text("prompt").notNull(),
    category: text("category").notNull(),
});
