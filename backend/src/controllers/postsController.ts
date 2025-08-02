import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { deleteS3ImageObject, putNewS3ImageObject } from "../utils/aws/s3";
import {
    addPost,
    findAllPosts,
    findPostById,
    deletePostById,
} from "../services/postService";
import {
    getCloudFrontSignedUrl,
    invalidateCloudFrontImage,
} from "../utils/aws/cloudfront";
import { respondWithJSON } from "../utils/json";
import {
    BadRequestError,
    NotFoundError,
    UserNotAuthenticatedError,
} from "../utils/errors";
import { resizeImageBuffer } from "../utils/image";
import { getBearer, validateJWT } from "../utils/auth/jwt";

export const createPost = async (req: Request, res: Response) => {
    const accessToken = getBearer(req);
    const userId = validateJWT(accessToken);

    if (!req.file) {
        throw new BadRequestError("Missing required fields.");
    }

    const imageKey = uuidv4();
    const buffer = await resizeImageBuffer(req.file.buffer, 1080, 1080);

    await putNewS3ImageObject(imageKey, buffer, req.file.mimetype);

    // Use for testing, authorId : "e650cdb6-0067-4d99-9d3f-2f4bd9f67577"
    const post = await addPost({
        imageKey: imageKey,
        authorId: userId,
    });

    respondWithJSON(res, 201, post);
};

export const deletePost = async (req: Request, res: Response) => {
    const accessToken = getBearer(req);
    const userId = validateJWT(accessToken);

    const id = req.params.id;
    const post = await findPostById(id);

    if (!post) {
        throw new NotFoundError(`Post with ID ${id} not found.`);
    }

    const authorId = post.authorId;
    if (authorId !== userId) {
        throw new UserNotAuthenticatedError(
            `This post cannot be deleted by this user.`
        );
    }

    const imageKey = post.imageKey;
    const postId = post.id;

    await deleteS3ImageObject(imageKey);
    await invalidateCloudFrontImage(imageKey);
    await deletePostById(postId);

    respondWithJSON(res, 200, {
        message: `Post with ID ${postId} deleted successfully.`,
    });
};

export const getAllPosts = async (req: Request, res: Response) => {
    const posts = await findAllPosts();

    const postsWithUrls = await Promise.all(
        posts.map(async (post) => {
            const signedUrl = await getCloudFrontSignedUrl(post.imageKey);
            return {
                ...post,
                imageUrl: signedUrl,
            };
        })
    );

    respondWithJSON(res, 200, postsWithUrls);
};

export const getPostById = async (req: Request, res: Response) => {
    const id = req.params.id;

    const post = await findPostById(id);

    if (!post) {
        throw new NotFoundError(`Post with Id ${id} not found.`);
    }

    const imageKey = post.imageKey;

    const postWithUrl = {
        ...post,
        imageUrl: await getCloudFrontSignedUrl(imageKey),
    };

    respondWithJSON(res, 200, postWithUrl);
};
