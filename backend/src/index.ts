import dotenv from 'dotenv';
dotenv.config()

import express, { Request, Response } from 'express';
import cors from 'cors';
import prisma from './lib/prisma';
import postsRoutes from './routes/postsRoutes';

const app = express();

app.use(cors());
app.use("/api/posts", postsRoutes)

const port = process.env.PORT || 5000;

app.get('/', async (req: Request, res: Response) => {

    // const user = await prisma.user.findUnique({
    //     where: {id : 1},
    //     include: {
    //         posts: true,
    //     }
    // })

    // if (!user) {
    //     return
    // }

    // console.log(user.posts)
    res.send({
        "GET ONE POST": `http://localhost:${port}/api/posts/[ID]`,
        "GET ALL POSTS": `http://localhost:${port}/api/posts`,
        "POST ONE POST": `http://localhost:${port}/api/posts`,
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})