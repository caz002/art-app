import { deleteS3ImageObject } from "../libs/s3";
import { db } from ".";
import { posts as postsTable } from "./schema/posts";
import { HTTPException } from "hono/http-exception";

export async function savePostToDB(
    userId: string,
    caption: string,
    imageKey: string
) {
    try {
        const insertedPost = await db
            .insert(postsTable)
            .values({ userId, caption, imageKey })
            .returning()
            .then((res) => res[0]);

        if (!insertedPost) {
            throw new Error("Error inserting post into DB.");
        }
        return insertedPost;
    } catch (err) {
        await deleteS3ImageObject(imageKey).catch((e) =>
            console.error("Rollback S3 delete failed:", e)
        );
        throw new HTTPException(500, { message: "Failed to save post." });
    }
}
