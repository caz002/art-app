import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { TextBlock } from "../ui/textblock";

export default function PostSkeleton() {
    return (
        <figure
            className={cn(
                "overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow"
            )}
        >
            <Skeleton className="h-75 w-full" />
            <div className="border-t-2 text-main-foreground border-border p-4 grid grid-cols-1 gap-y-2">
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                </div>
                <TextBlock>
                    <Skeleton className="h-10 w-full" />
                </TextBlock>
            </div>
        </figure>
    );
}
