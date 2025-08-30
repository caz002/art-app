import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import { user, session, account, verification } from "../db/schema/auth-schema";
import { createMiddleware } from "hono/factory";

export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173", "http://127.0.0.1:5173"],
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user,
            session,
            account,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
    },
});

type Env = {
    Variables: {
        userId: string;
        username: string;
    };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
    try {
        const session = await auth.api.getSession({
            headers: c.req.raw.headers,
        });

        if (!session) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        c.set("userId", session.user.id);
        c.set("username", session.user.name);

        await next();
    } catch (e) {
        return c.json({ error: "Unauthorized" }, 401);
    }
});
