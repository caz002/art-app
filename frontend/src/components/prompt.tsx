import { Card, CardContent } from "@/components/ui/card";
import { getPromptQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function PromptCard() {
    // query client here
    // tan stack query
    // set the prompt!

    const { data, isPending, isError } = useQuery(getPromptQueryOptions);

    // note to replace with skeletons/loading components later
    if (isPending) {
        return "Loading...";
    }

    if (isError) {
        return "Erroring...";
    }

    return (
        <Card className="flex flex-col items-center justify-center p-4 max-w-4xl">
            <h1 className="font-bold text-lg">Daily Prompt</h1>

            <CardContent className="w-full">
                <div className="p-3 bg-accent-foreground rounded-md text-gray-900 text-center">
                    <p>{data}</p>
                </div>
            </CardContent>
        </Card>
    );
}
