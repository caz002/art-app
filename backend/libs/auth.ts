import { betterAuth, type Session, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // your drizzle instance
import { user, session, account, verification } from "../db/schema/auth-schema";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

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
        user: User;
        session: Session;
    };
};

export const requireAuth = createMiddleware<Env>(async (c, next) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    c.set("user", session.user);
    c.set("session", session.session);

    await next();
});
