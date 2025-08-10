import { config } from "./config";
import express, { Request, Response } from "express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes";
import promptRoutes from "./routes/promptRoutes";
import authRoutes from "./routes/authRoutes";
import { respondWithError } from "./utils/json";
var cookieParser = require("cookie-parser");

const PORT = config.app.port;
const app = express();
app.use(cookieParser());
// makes us able to req.body for the json load
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use("/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/prompt", promptRoutes);
app.get("/", async (req: Request, res: Response) => {
    res.send({
        "GET ONE POST": `http://localhost:${PORT}/api/posts/[ID]`,
        "GET ALL POSTS": `http://localhost:${PORT}/api/posts`,
        "POST ONE POST": `http://localhost:${PORT}/api/posts`,
    });
});

app.use((req: Request, res: Response) => {
    respondWithError(res, 404, "Page not found.");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
