import {
    deletePost,
    getPostsByProfileQueryOptions,
    getPostsQueryOptions,
} from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
    userId: string;
    postId: number;
    className?: string;
};

export function PostDeleteButton({ userId, postId, className }: Props) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePost,
        onError: () => {
            toast("Error", {
                description: `Failed to delete post: ${postId}`,
            });
        },
        onSuccess: () => {
            toast(`Post Successfully Deleted!`, {
                description: `Successfully deleted post: ${postId}`,
            });

            // update profile page
            queryClient.setQueryData(
                getPostsByProfileQueryOptions(userId).queryKey,
                (existingPosts) => {
                    if (!existingPosts) return existingPosts;
                    return {
                        ...existingPosts,
                        posts: existingPosts.posts.filter(
                            (post) => post.id !== postId
                        ),
                    };
                }
            );

            // update home page
            queryClient.setQueryData(
                getPostsQueryOptions.queryKey,
                (existingPosts) => {
                    if (!existingPosts) return existingPosts;
                    return {
                        ...existingPosts,
                        posts: existingPosts.posts.filter(
                            (post) => post.id !== postId
                        ),
                    };
                }
            );
        },
    });

    return (
        <Button
            disabled={mutation.isPending}
            variant="neutral"
            onClick={() => mutation.mutate({ postId })}
            className={className}
            size="sm"
        >
            Delete
        </Button>
    );
}
