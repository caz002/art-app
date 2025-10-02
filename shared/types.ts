import { insertPostSchema } from "../backend/db/schema/posts";
import { insertUserSchema } from "../backend/db/schema/auth-schema";

export const createPostSchema = insertPostSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export const updateProfileSchema = insertUserSchema.omit({
  id: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  createdAt: true,
  updatedAt: true,
});
