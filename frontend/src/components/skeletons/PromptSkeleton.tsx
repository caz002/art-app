import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { TextBlock } from "../ui/textblock";

export function PromptSkeleton() {
    return (
        <Card className="flex flex-col items-center justify-center p-4 max-w-4xl bg-main">
            <CardContent className="w-full">
                <h1 className="font-bold text-lg">Prompt of the Day!</h1>
                <TextBlock className="flex">
                    <Skeleton className="h-12 w-full" />
                </TextBlock>
            </CardContent>
        </Card>
    );
}
