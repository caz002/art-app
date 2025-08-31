import { createFileRoute } from "@tanstack/react-router";
import { getPostsQueryOptions } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Gallery } from "@/components/gallery";
import { PromptCard } from "@/components/prompt";

export const Route = createFileRoute("/")({
    component: Index,
});

function Index() {
    const { isPending, error, data } = useQuery(getPostsQueryOptions);

    if (isPending) return "Loading";
    if (error) return "An error has occured: " + error.message;

    return (
        <div className="flex flex-col gap-y-10 max-w-4xl m-auto">
            <PromptCard />
            <Gallery {...data} />
        </div>
    );
}
