import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { postsRoute } from "./routes/posts";
import { authRoute } from "./routes/auth";
import { profileRoute } from "./routes/profile";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(logger());

const apiRoutes = app
    .basePath("/api")
    .route("/posts", postsRoute)
    .route("/profile", profileRoute)
    .route("/auth", authRoute);

app.get("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        // Get the custom response
        return err.getResponse();
    }

    return c.json({ error: "Internal Server Error" }, 500);
});

export default app;
export type ApiRoutes = typeof apiRoutes;
