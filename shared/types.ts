import { insertPostSchema } from "../backend/db/schema/posts";

export const createPostSchema = insertPostSchema.omit({
    id: true,
    userId: true,
    createdAt: true,
});
