import { cn } from "@/lib/utils";
import { TextBlock } from "../ui/textblock";
import { Link } from "@tanstack/react-router";

type Props = {
    id: number;
    userId: string;
    userName?: string;
    createdAt: string;
    imageUrl: string;
    caption: string;
    className?: string;
};

export default function HomePost({
    userId,
    userName,
    createdAt,
    imageUrl,
    caption,
    className,
}: Props) {
    return (
        <figure
            className={cn(
                "overflow-hidden rounded-base border-2 border-border bg-main font-base shadow-shadow",
                className
            )}
        >
            <img className="w-full" src={imageUrl} alt="image" />
            <div className="border-t-2 text-main-foreground border-border p-4 grid grid-cols-1 gap-y-2">
                <div className="flex justify-between">
                    {userName && (
                        <Link to="/profile/$userId" params={{ userId }}>
                            {userName}
                        </Link>
                    )}
                    <span className="text-sm">
                        {new Intl.DateTimeFormat("en-CA").format(
                            new Date(createdAt)
                        )}
                    </span>
                </div>
                <TextBlock>{caption}</TextBlock>
            </div>
        </figure>
    );
}
