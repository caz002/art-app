import { Card, CardContent } from "@/components/ui/card";
import { getPromptQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TextBlock } from "../ui/textblock";
import { PromptSkeleton } from "../skeletons/PromptSkeleton";

export function PromptCard() {
    // query client here
    // tan stack query
    // set the prompt!

    const { data, isPending, isError } = useQuery(getPromptQueryOptions);

    // note to replace with skeletons/loading components later
    if (isPending) {
        return <PromptSkeleton />;
    }

    if (isError) {
        return "Erroring...";
    }

    return (
        <Card className="flex flex-col items-center justify-center p-4 max-w-4xl bg-main">
            <CardContent className="w-full">
                <h1 className="font-bold text-lg">Prompt of the Day!</h1>
                <TextBlock className="flex">
                    <p className="m-auto break-words text-xl">{data}</p>
                </TextBlock>
            </CardContent>
        </Card>
    );
}
