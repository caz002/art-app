import { BadGatewayError } from "../utils/errors";
import prisma from "../utils/prisma";

interface CreatePostData {
    imageKey: string;
    authorId: string;
}

export const addPost = async (data: CreatePostData) => {
    try {
        const post = await prisma.post.create({
            data: {
                imageKey: data.imageKey,
                authorId: data.authorId,
            },
        });

        return post;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};

export const findAllPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: [{ createdAt: "desc" }],
        });
        return posts;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};

export const findPostById = async (id: string) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        return post;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};

export const deletePostById = async (id: string) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: id,
            },
        });

        return post;
    } catch (error) {
        throw new BadGatewayError("Upstream database unavailable");
    }
};
