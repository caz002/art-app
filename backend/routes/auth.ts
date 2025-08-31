import { Hono } from "hono";
import { auth, requireAuth } from "../libs/auth";

export const authRoute = new Hono()
    .get("/me", requireAuth, (c) => {
        const user = c.var.user;
        const session = c.var.session;
        return c.json({ user, session });
    })
    .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));
