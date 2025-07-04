import express, { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4} from 'uuid';
import { S3Client, PutObjectCommand, GetObjectCommand,  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PrismaClient } from '@prisma/client';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

if (!bucketRegion || !accessKey || !secretAccessKey) {
    throw new Error("Missing AWS S3 configuration in environment variables.");
}

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey as string,
        secretAccessKey: secretAccessKey as string
    },
    region: bucketRegion as string
});

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});


app.post('/api/posts', upload.single('postImage'), async (req : Request, res : Response) => {

    if (!req.file) {
        throw new Error("req.file is not defined!");
    }

    // create a random image name for the file
    // we do this so we don't have files overriding other files
    const imageName = uuidv4();

    // We might need to do our file checking/making sure it's small here
    // resize image
    const buffer = await sharp(req.file.buffer).resize(
        { height: 1080, width: 1080, fit: "contain" }
    ).toBuffer();

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)

    await s3.send(command);

    // put post information into our database in supabase 
    // we will change authorId based on login session later
    const post = await prisma.post.create({
        data: {
            imageKey: imageName,
            authorId: 1
        }
    });

    res.send(post);
})

app.get('/api/posts/:id', async (req: Request, res: Response) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        res.status(400).json({ error: 'Yo, give me a real valid ID' });
        return;
    }

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })

    if (!post) {
        res.status(404).json({ error: 'Yo, this post cannot not found' });
        return
    }

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: post.imageKey,
    });

    const signedUrl = await getSignedUrl(s3, command, {expiresIn: 3600});

    // we going to aget a signed url
    // signedUrl -> we ca

    res.json({
        ...post,
        imageUrl: signedUrl
    })
})


app.get('/api/posts', async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({orderBy: [{ createdAt: 'desc'}]})

    const postsWithUrls = await Promise.all(posts.map(async (post) => {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: post.imageKey
        });

        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

        return {
            ...post,
            imageUrl: url
        };
    }));

    res.send(postsWithUrls);
});

app.get('/', (req: Request, res: Response) => {
    res.send({
        "GET ONE POST": `http://localhost:${port}/api/posts/[ID]`,
        "GET ALL POSTS": `http://localhost:${port}/api/posts`,
        "POST ONE POST": `http://localhost:${port}/api/posts`,
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})