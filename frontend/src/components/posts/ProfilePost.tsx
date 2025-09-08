import { cn } from "@/lib/utils";
import { TextBlock } from "../ui/textblock";
import { Button } from "../ui/button";
import { PostDeleteButton } from "./PostDeleteButton";

type Props = {
    id: number;
    userId: string;
    userName?: string;
    createdAt: string;
    imageUrl: string;
    caption: string;
    className?: string;
    session?: {
        user: {
            id: string;
        };
    };
};

export default function ProfilePost({
    id,
    userId,
    createdAt,
    imageUrl,
    caption,
    className,
    session,
}: Props) {
    const isOwner = session?.user.id === userId;

    return (
        <figure
            className={cn(
                "overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
                className
            )}
        >
            <img className="w-full" src={imageUrl} alt="image" />
            <div className="border-t-2 text-main-foreground border-border p-4 grid grid-cols-1 gap-y-2">
                <div className="flex justify-center">
                    <span className="text-sm">
                        {new Intl.DateTimeFormat("en-CA").format(
                            new Date(createdAt)
                        )}
                    </span>
                </div>
                <TextBlock>{caption}</TextBlock>
                {isOwner && (
                    <div className="flex gap-2">
                        <Button className="flex-1 bg-blue-400" size="sm">
                            Edit
                        </Button>
                        <PostDeleteButton
                            userId={session.user.id}
                            postId={id}
                            className="flex-1 bg-red-400"
                        />
                    </div>
                )}
            </div>
        </figure>
    );
}
