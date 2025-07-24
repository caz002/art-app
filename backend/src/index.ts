import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import postsRoutes from "./routes/postsRoutes";
import promptRoutes from "./routes/promptRoutes";

const port = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use("/api/posts", postsRoutes);
app.use("/prompt", promptRoutes);
app.get("/", async (req: Request, res: Response) => {
    res.send({
        "GET ONE POST": `http://localhost:${port}/api/posts/[ID]`,
        "GET ALL POSTS": `http://localhost:${port}/api/posts`,
        "POST ONE POST": `http://localhost:${port}/api/posts`,
    });
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
