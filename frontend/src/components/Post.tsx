import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    deletePost,
    getPostsByProfileQueryOptions,
    getPostsQueryOptions,
} from "@/lib/api";
import { toast } from "sonner";

interface PostProps {
    id: number;
    userId: string;
    userName?: string;
    createdAt: string;
    imageUrl: string;
    caption: string;
}

export function Post({
    id,
    userId,
    userName,
    createdAt,
    imageUrl,
    caption,
}: PostProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    {userName && (
                        <Link
                            to="/profile/$userId"
                            params={{ userId }}
                            className="[&.active]:font-bold"
                        >
                            {userName}
                        </Link>
                    )}
                    <span className="text-sm text-gray-500">
                        {new Intl.DateTimeFormat("en-CA").format(
                            new Date(createdAt)
                        )}
                    </span>
                </div>
            </CardHeader>
            <CardContent>
                <img
                    src={imageUrl}
                    alt={`${userName}'s post`}
                    className="w-full object-cover rounded-md"
                />
                <div className="mt-2  grid grid-cols-[5fr_1fr]">
                    <div>
                        <p className="text-sm">{caption}</p>
                    </div>
                    <PostDeleteButton userId={userId} id={id} />
                </div>
            </CardContent>
        </Card>
    );
}

function PostDeleteButton({ userId, id }: { userId: string; id: number }) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePost,
        onError: () => {
            toast("Error", {
                description: `Failed to delete post: ${id}`,
            });
        },
        onSuccess: () => {
            toast(`Post Successfully Deleted!`, {
                description: `Successfully deleted post: ${id}`,
            });

            queryClient.setQueryData(
                getPostsByProfileQueryOptions(userId).queryKey,
                (existingPosts) => {
                    if (!existingPosts) return existingPosts;
                    return {
                        ...existingPosts,
                        posts: existingPosts.posts.filter(
                            (post) => post.id !== id
                        ),
                    };
                }
            );

            queryClient.setQueryData(
                getPostsQueryOptions.queryKey,
                (existingPosts) => {
                    if (!existingPosts) return existingPosts;
                    return {
                        ...existingPosts,
                        posts: existingPosts.posts.filter(
                            (post) => post.id !== id
                        ),
                    };
                }
            );
        },
    });

    return (
        <Button
            disabled={mutation.isPending}
            variant="outline"
            size="icon"
            onClick={() => mutation.mutate({ id })}
        >
            <Trash className="h-4 w-4"></Trash>
        </Button>
    );
}
