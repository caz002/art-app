import { Hono } from "hono";

import { db } from "../db";
import { posts as postsTable } from "../db/schema/posts";
import { user as usersTable } from "../db/schema/auth-schema";
import { desc, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { requireAuth } from "../libs/auth";
import { zValidator } from "@hono/zod-validator";
import { updateProfileSchema } from "../../shared/types";
import z from "zod";

function parseIntQuery(value: string | undefined, defaultValue: number) {
    const n = Number(value);
    return Number.isNaN(n) ? defaultValue : n;
}

const querySchema = z.object({
    limit: z.string().optional(),
    offset: z.string().optional(),
    sortBy: z.string().optional(),
    order: z.string().optional(),
});

export const profileRoute = new Hono()
    .get("/:user_id", async (c) => {
        const userId = c.req.param("user_id");
        if (!userId) {
            throw new HTTPException(400, {
                message: "UserId must be provided",
            });
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, userId))
            .limit(1)
            .then((res) => res[0]);

        if (!user) {
            throw new HTTPException(404, {
                message: "No user found with that ID",
            });
        }

        const posts = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.userId, userId))
            .orderBy(desc(postsTable.createdAt));

        const postsWithUrls = posts.map((post) => ({
            ...post,
            imageUrl: process.env.CLOUDFRONT_URL! + post.imageKey,
        }));

        return c.json({
            user: user,
            posts: postsWithUrls,
        });
    })
    .put(
        "/:user_id",
        requireAuth,
        zValidator("form", updateProfileSchema),
        async (c) => {
            const userId = c.req.param("user_id");
            const data = c.req.valid("form");

            if (c.var.user.id !== userId)
                throw new HTTPException(403, { message: "Forbidden" });

            const { bio, likes, occupation } = data;
            if (!bio || !likes || !occupation)
                return c.json({ error: "Missing fields" }, 400);
            try {
                await db
                    .update(usersTable)
                    .set({ bio, likes, occupation })
                    .where(eq(usersTable.id, userId));
                return c.json({ success: true });
            } catch (err) {
                console.error("Failed to edit profile information:", err);
            }
        }
    )
    .get("/:user_id/posts", zValidator("query", querySchema), async (c) => {
        const userId = c.req.param("user_id");
        const { limit, offset, sortBy, order } = c.req.valid("query");
        console.log("limit:", limit);
        const defaultLimit = 200;
        const defaultOffset = 0;

        const validLimit = parseIntQuery(limit, defaultLimit);
        const validOffset = parseIntQuery(offset, defaultOffset);

        if (!userId) {
            throw new HTTPException(400, {
                message: "UserId must be provided",
            });
        }

        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, userId))
            .then((res) => res[0]);

        if (!user) {
            throw new HTTPException(404, {
                message: "No user found with that ID",
            });
        }

        const posts = await db
            .select()
            .from(postsTable)
            .limit(validLimit)
            .offset(validOffset)
            .where(eq(postsTable.userId, userId))
            .orderBy(desc(postsTable.createdAt));

        const postsWithUrls = posts.map((post) => ({
            ...post,
            imageUrl: process.env.CLOUDFRONT_URL! + post.imageKey,
        }));

        return c.json({
            posts: postsWithUrls,
        });
    });
