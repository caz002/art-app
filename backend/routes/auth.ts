import { Hono } from "hono";
import { auth, getUser } from "../libs/auth";

export const authRoute = new Hono()
    .get("/me", getUser, (c) => {
        const userId = c.var.userId;
        const username = c.var.username;
        return c.json({ userId, username });
    })
    .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));
