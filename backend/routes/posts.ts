import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db } from "../db";
import {
    insertPostSchema,
    posts,
    posts as postsTable,
} from "../db/schema/posts";
import { getUser } from "../libs/auth";
import { createPostSchema } from "../../shared/types";
import {
    putNewS3ImageObject,
    deleteS3ImageObject,
    uploadImageToS3,
} from "../libs/s3";

import { user as userTable } from "../db/schema/auth-schema";
import { eq, asc, desc, and } from "drizzle-orm";
import { processImage } from "../libs/image";
import { HTTPException } from "hono/http-exception";
import { savePostToDB } from "../db/posts";

export const postsRoute = new Hono()
    .get("/", async (c) => {
        const posts = await db
            .select()
            .from(postsTable)
            .limit(20)
            .leftJoin(userTable, eq(postsTable.userId, userTable.id))
            .orderBy(desc(postsTable.createdAt));

        const postsWithUrls = posts.map((post) => ({
            ...post.posts,
            imageUrl: process.env.CLOUDFRONT_URL! + post.posts.imageKey,
            userName: post.user!.name,
        }));

        return c.json({ posts: postsWithUrls });
    })
    .post("/", getUser, zValidator("form", createPostSchema), async (c) => {
        try {
            const post = c.req.valid("form");
            const userId = c.var.userId;
            const userName = c.var.username;

            const validatedPost = insertPostSchema.parse({
                ...post,
                userId,
            });

            const buffer = await processImage(post.picture);
            const imageKey = await uploadImageToS3(buffer, post.picture.type);
            const insertedPost = await savePostToDB(
                userId,
                validatedPost.caption,
                imageKey
            );

            const postWithUrl = {
                ...insertedPost,
                userName: userName,
                imageUrl: process.env.CLOUDFRONT_URL! + imageKey,
            };

            c.status(201);
            return c.json(postWithUrl);
        } catch (err) {
            console.error("Unexpected error:", err);
            throw new HTTPException(500, { message: "Internal Server Error" });
        }
    })
    .get("/:id{[0-9]+}", (c) => {
        const id = Number(c.req.param("id"));

        console.log("test");
        return c.json({ text: "test" });
    })
    .delete("/:id{[0-9]+}", getUser, async (c) => {
        const id = Number(c.req.param("id"));

        const userId = c.var.userId;
        const post = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.id, id))
            .limit(1)
            .then((rows) => rows[0]);
        if (!post) throw new HTTPException(404, { message: "Post not found" });
        if (post.userId !== userId)
            throw new HTTPException(403, { message: "Forbidden" });

        const deletedPost = await db
            .delete(postsTable)
            .where(and(eq(postsTable.id, id), eq(postsTable.userId, userId)))
            .returning()
            .then((res) => res[0]);

        // this should be guaranteed though.
        if (!deletedPost) {
            throw new HTTPException(404, { message: "Post not found" });
        }

        try {
            await deleteS3ImageObject(deletedPost.imageKey);
        } catch (err) {
            console.error("Failed to delete S3 image:", err);
        }

        return c.json({});
    });
