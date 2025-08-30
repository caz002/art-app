import { type ApiRoutes } from "@backend/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";

export const client = hc<ApiRoutes>("/");

export const api = client.api;

async function getCurrentUser() {
    const res = await api.auth.me.$get();

    if (!res.ok) {
        throw new Error("Server error");
    }

    const data = await res.json();
    return data;
}

export const userQueryOptions = queryOptions({
    queryKey: ["get-current-user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
});

export async function getPosts() {
    const res = await api.posts.$get();

    if (!res.ok) {
        throw new Error("Server error");
    }

    const data = await res.json();
    return data;
}

export const getPostsQueryOptions = queryOptions({
    queryKey: ["get-posts"],
    queryFn: getPosts,
    staleTime: 1000 * 60 * 5,
});

async function getPostsByUserId(userId: string) {
    const res = await api.profile[`:user_id`].$get({
        param: { user_id: userId },
    });

    if (!res.ok) {
        throw new Error("server error");
    }
    const data = await res.json();
    return data;
}

export const getPostsByProfileQueryOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["profile", userId],
        queryFn: () => getPostsByUserId(userId!),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });
};

export async function deletePost({ id }: { id: number }) {
    const res = await api.posts[":id{[0-9]+}"].$delete({
        param: { id: id.toString() },
    });

    if (!res.ok) {
        throw new Error("Server error");
    }
}
