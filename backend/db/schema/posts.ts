import { pgTable, serial, text, index, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth-schema";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const posts = pgTable(
    "posts",
    {
        id: serial("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        caption: text().notNull(),
        imageKey: text().notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (posts) => [index("name_idx").on(posts.userId)]
);

export const insertPostSchema = createInsertSchema(posts, {
    caption: z
        .string()
        .min(3, { message: "Caption must be at least 3 characters!" })
        .max(30, { message: "Caption must be at most 30 characters!" }),
})
    .extend({
        picture: z
            .instanceof(File)
            .refine(
                (file) => file.size <= MAX_FILE_SIZE,
                `Max image size is 2MB.`
            )
            .refine(
                (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                "Only .jpg, .jpeg, .png and .webp formats are supported."
            ),
    })
    .omit({
        imageKey: true,
    });
export const selectPostSchema = createSelectSchema(posts);
