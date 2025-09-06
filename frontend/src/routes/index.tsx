import { createFileRoute } from "@tanstack/react-router";
import { getPostsQueryOptions } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { PromptCard } from "@/components/prompts/prompt";
import { HomeGallery } from "@/components/gallery/HomeGallery";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { isPending, error, data } = useQuery(getPostsQueryOptions);

    if (isPending) return "Loading";
    if (error) return "An error has occured: " + error.message;

    return (
        <div className="grid gap-4">
            <PromptCard />
            <HomeGallery {...data} />
        </div>
    );
}
