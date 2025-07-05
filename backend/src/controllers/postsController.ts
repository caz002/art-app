import { Request, Response } from "express";
import { v4 as uuidv4} from 'uuid';
import { getSignedS3Url, putNewS3ImageObject } from "../utils/s3";
import { addPost, findAllPosts, findPostById } from "../services/postService";
import sharp from "sharp";

export const createPost = async (req : Request, res: Response) => {
    try {

        if (!req.file) {
            res.status(400).json({
                error: "Image is Required",
                field: "postImage"
            });
            return;
        }

        const imageName = uuidv4();

        /*
        This just resizes our picture to 1080 x 1080.
        We are going to need more checks like filetype, 
        file size, conversion to standard image type.
        */
        const buffer = await sharp(req.file.buffer).resize({
            height: 1080, width: 1080, fit: "contain"
        }).toBuffer();

        await putNewS3ImageObject(imageName, buffer, req.file.mimetype);

        const post = await addPost({
            imageKey: imageName,
            authorId: 1
        });

        res.send(post)
    } catch (error) {
        console.log(`Post creation Error: `, error instanceof Error ? error.message : "Unknown Error");
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllPosts = async (req : Request, res : Response) => {
    try {
        const posts = await findAllPosts();

        const postsWithUrls = await Promise.all(posts.map(async post => {
            return {
                ...post,
                imageUrl: await getSignedS3Url(post.imageKey)
            }
        }));

        res.status(200).json(postsWithUrls);
    } catch (error) {
        console.log(`getAllPosts Error:`, error instanceof Error ? error.message : "Unknown Error");
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getPostById = async (req : Request, res : Response) => {
    
    const id = Number(req.params.id);
    
    if (!Number.isInteger(id) || id < 0) {
        res.status(400).json({ error : `Yo give me a real valid ID`});
        return;
    }

    try {

        const post = await findPostById(id);

        if (!post) {
            res.status(404).json({ error: `Yo, this post cannot be found`});
            return;
        }

        const postWithUrl = {
            ...post,
            imageUrl: await getSignedS3Url(post.imageKey, 3600)
        };

        res.status(200).json(postWithUrl);

    } catch (error) {
        console.log(`getPostById Error:`, error instanceof Error ? error.message : "Unknown Error");
        res.status(500).json({ error: "Internal server error"});
    }
};