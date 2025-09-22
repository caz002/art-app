import { type ApiRoutes } from "@backend/app";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";
import { authClient } from "./auth-client";

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

// Corresponds to HomeGallery component, used to retrieve post data in chunks
export const getAllPostsQueryOptions = infiniteQueryOptions({
  queryKey: ["get-all-posts"],
  queryFn: async ({ pageParam }: { pageParam: number }) => {
    const currChunk = await getPosts({ limit: 3, offset: pageParam * 3 });
    const total = await getTotalPostLength();
    const end = pageParam * 3 + 3;
    return {
      items: [currChunk.posts],
      nextPage: pageParam + 1,
      hasMore: end < total,
    };
  },
  getNextPageParam: (lastGroup) => {
    return lastGroup.hasMore ? lastGroup.nextPage : undefined;
  },
  initialPageParam: 0,
});

// Returns the total number of posts in the database
export async function getTotalPostLength() {
  const res = await api.posts.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }

  const data = await res.json();
  return data.posts.length;
}

export async function getPosts({ limit = 100, offset = 0 } = {}) {
  const res = await api.posts.$get({
    query: {
      limit,
      offset,
    },
  });

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

// Corresponds to ProfileGallery Component, used to get user data loaded in chunks
export default function getAllUserPostsOptions({
  userId,
  ROW_SIZE,
}: {
  userId: string;
  ROW_SIZE: number;
}) {
  return infiniteQueryOptions({
    queryKey: ["get-all-users-posts", userId],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const currChunk = await getPostsByUserId(userId);
        const start = pageParam * ROW_SIZE;
        const end = pageParam * 3 + 3;
        const subArray = await getSubArrayPostsByUserId({
          userId,
          limit: ROW_SIZE,
          offset: start,
        });
        console.log("subArray", subArray);
        const posts = Array.isArray(currChunk?.posts) ? currChunk.posts : [];

        const result = {
          items: [subArray.posts],
          nextPage: pageParam + 1,
          hasMore: end < posts.length,
        };
        return result;
      } catch (err) {
        console.error("QueryFn error:", err);
        return {
          items: [],
          nextPage: pageParam + 1,
          hasMore: false,
        };
      }
    },
    getNextPageParam: (lastGroup) => {
      return lastGroup.hasMore ? lastGroup.nextPage : undefined;
    },
    initialPageParam: 0,
  });
}

export async function getSubArrayPostsByUserId({
  userId,
  limit = 100,
  offset = 0,
}: {
  userId: string;
  limit?: number;
  offset?: number;
}) {
  const res = await api.profiles[`:user_id`].posts.$get({
    param: { user_id: userId },
    query: { limit: limit.toString(), offset: offset.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export async function getPostsByUserId(userId: string) {
  const res = await api.profiles[`:user_id`].$get({
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
    // staleTime: 1000 * 60 * 5,
    // retry: false,
  });
};

export async function deletePost({ postId }: { postId: number }) {
  const res = await api.posts[":id{[0-9]+}"].$delete({
    param: { id: postId.toString() },
  });

  if (!res.ok) {
    throw new Error("Server error");
  }
}

async function getPrompt() {
  const res = await api["daily-prompt"].$get();

  if (!res.ok) {
    throw new Error("Server error");
  }

  const prompt = await res.json();
  return prompt.response;
}

export const getPromptQueryOptions = queryOptions({
  queryKey: ["prompt"],
  queryFn: getPrompt,
  staleTime: Infinity,
});

async function getSession() {
  const {
    data: session,
    // isPending, //loading state
    // error, //error object
    // refetch, //refetch the session
  } = await authClient.getSession();

  return session;
}

export const getSessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: getSession,
  staleTime: 1000 * 60 * 60 * 24,
});
