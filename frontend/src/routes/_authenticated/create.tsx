import { CanvasUploadForm } from "@/components/forms/CanvasUploadForm";
import { FileUploadForm } from "@/components/forms/FileUploadForm";
import { PromptCard } from "@/components/prompts/prompt";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, getPostsQueryOptions } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/create")({
    component: CreatePost,
});

function CreatePost() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    async function handleSubmit(caption: string, picture: File) {
        const existingPosts =
            await queryClient.ensureQueryData(getPostsQueryOptions);
        const res = await api.posts.$post({ form: { caption, picture } });
        if (!res.ok) {
            throw new Error("Failed to create post");
        }

        const newPost = await res.json();
        queryClient.setQueryData(getPostsQueryOptions.queryKey, {
            ...existingPosts,
            posts: [newPost, ...existingPosts.posts],
        });

        navigate({ to: "/" });
    }
    return (
        <div className="max-w-4xl m-auto grid gap-4">
            <PromptCard />
            <Tabs defaultValue="file">
                <TabsList className="w-full flex">
                    <TabsTrigger value="file" className="flex-1">
                        File Upload
                    </TabsTrigger>
                    <TabsTrigger value="canvas" className="flex-1">
                        Canvas Upload
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                    <Card>
                        <CardContent>
                            <FileUploadForm onSubmit={handleSubmit} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="canvas">
                    <Card>
                        <CardContent>
                            <CanvasUploadForm onSubmit={handleSubmit} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
