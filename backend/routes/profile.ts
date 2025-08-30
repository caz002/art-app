import { Hono } from "hono";

import { db } from "../db";
import { posts as postsTable } from "../db/schema/posts";
import { user as usersTable } from "../db/schema/auth-schema";
import { desc, eq } from "drizzle-orm";
import { use } from "react";

export const profileRoute = new Hono().get("/:user_id", async (c) => {
    const userId = c.req.param("user_id");

    if (!userId) {
        return c.json({ error: "User ID is required" }, 400);
    }

    // console.log(userId);
    const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId))
        .limit(1)
        .then((res) => res[0]);

    if (!user) {
        return c.json({ error: "No user found with that ID" }, 400);
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
});
