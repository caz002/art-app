import { UserData, Post } from "@/lib/types";
import { Card } from "../ui/card";

type ProfileStatsProps = {
    user: UserData;
    posts: Post[];
};

export function ProfileStats({ user, posts }: ProfileStatsProps) {
    return (
        <Card>
            <div className="grid grid-cols-2 gap-x-5 gap-y-1  text-xs pr-4 pl-4 m-auto">
                <dl className="contents">
                    <dt className="">Total Posts</dt>
                    <dd className="text-right font-medium">{posts.length}</dd>
                </dl>
                <dl className="contents">
                    <dt className="">Best Streak</dt>
                    <dd className="text-right font-medium">
                        {user.longestStreak}
                    </dd>
                </dl>
                <dl className="contents">
                    <dt className="">Current Streak</dt>
                    <dd className="text-right font-medium">
                        {user.currentStreak}
                    </dd>
                </dl>
                <dl className="contents">
                    <dt className="">Active Days</dt>
                    <dd className="text-right font-medium">
                        {user.activeDays}
                    </dd>
                </dl>
                <dl className="contents">
                    <dt className="">Average Posts Per Day</dt>
                    <dd className="text-right font-medium">
                        {user.activeDays == 0
                            ? 0
                            : (posts.length / user.activeDays).toFixed(2)}
                    </dd>
                </dl>
            </div>
        </Card>
    );
}
