import { Hono } from "hono";

import { db } from "../db";
import { posts as postsTable } from "../db/schema/posts";
import { user as usersTable } from "../db/schema/auth-schema";
import { desc, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";

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
    .get("/:user_id/posts", async (c) => {
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
            posts: postsWithUrls,
        });
    });
