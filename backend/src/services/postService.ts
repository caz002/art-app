import prisma from '../lib/prisma';

interface CreatePostData {
    imageKey: string;
    authorId: number;
}

export const addPost = async (data: CreatePostData) => {
    try {
        const post = await prisma.post.create({
            data: {
                imageKey: data.imageKey,
                authorId: data.authorId
            }
        });

        return post;
    } catch (error) {
        console.log(`CreatePost Error: `, error instanceof Error ? error.message : "Unknown Error");
        throw error;
    }
};

export const findAllPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: [{createdAt: "desc"}]
        });

        return posts;
    } catch (error) {
        console.log(`findAllPosts Error: `, error instanceof Error ? error.message : "Unknown Error");
        throw error;
    }
};

export const findPostById = async (id: number) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id
            }
        });

        return post;
    } catch (error) {
        console.log(`findPostById Error: `, error instanceof Error ? error.message : "Unknown Error");
        throw error;
    }
};