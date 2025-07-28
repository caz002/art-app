import prisma from "../lib/prisma";

interface CreatePostData {
    imageKey: string;
    authorId: number;
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
        console.log(
            `CreatePost Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
        throw error;
    }
};

export const findAllPosts = async () => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: [{ createdAt: "desc" }],
        });
        return posts;
    } catch (error) {
        console.log(
            `findAllPosts Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
        throw error;
    }
};

export const findFixedPosts = async (cursor?: number) => {
    try {
        const posts = await prisma.post.findMany({
            take: 12,
            ...(cursor && {
                skip: 1,
                cursor: {
                    id: cursor,
                },
            }),
            orderBy: [{ createdAt: "desc" }],
        });

        return posts;
    } catch (error) {
        console.log(
            `findFixedPosts Error: `,
            error instanceof Error ? error.message : `Unknown Error`
        );
        throw error;
    }
};

export const findPostById = async (id: number) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
        });

        return post;
    } catch (error) {
        console.log(
            `findPostById Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
        throw error;
    }
};

export const deletePostById = async (id: number) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: id,
            },
        });

        return post;
    } catch (error) {
        console.log(
            `deletePostById Error: `,
            error instanceof Error ? error.message : "Unknown Error"
        );
        throw error;
    }
};
