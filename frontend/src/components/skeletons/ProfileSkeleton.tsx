import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { GallerySkeleton } from "./GallerySkeleton";

export function ProfileSkeleton() {
    return (
        <div className="max-w-4xl m-auto flex flex-col gap-2">
            <div className="max-w-4xl grid sm:grid-cols-[2fr_1fr] gap-y-4 gap-x-2">
                <Card>
                    <CardHeader>
                        <div className="flex gap-x-4 ">
                            <Skeleton className="w-32 h-32 object-cover rounded-md" />

                            <div className="flex flex-col gap-y-1">
                                <div>
                                    <h1 className="font-bold text-2xl">
                                        <Skeleton className="h-8 w-30" />
                                    </h1>
                                </div>
                                <Skeleton className="w-80 h-full" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-1  text-xs pr-4 pl-4 m-auto">
                        <dl className="contents">
                            <dt className="">Total Posts</dt>
                            <dd className="text-right font-medium">
                                <Skeleton className="w-full h-6" />
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="">Best Streak</dt>
                            <dd className="text-right font-medium">
                                <Skeleton className="w-full h-6" />
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="">Current Streak</dt>
                            <dd className="text-right font-medium">
                                <Skeleton className="w-full h-6" />
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="">Perfect Week Count</dt>
                            <dd className="text-right font-medium">
                                <Skeleton className="w-full h-6" />
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="">Completion Rate</dt>
                            <dd className="text-right font-medium">
                                <Skeleton className="w-full h-6" />
                            </dd>
                        </dl>
                    </div>
                </Card>
            </div>

            <Card>
                <CardContent>
                    <div className="m-auto flex gap-x-2">
                        <p>
                            <b>Joined </b>
                            <Skeleton className="h-6 w-50" />
                        </p>
                        <p>
                            <b>Likes </b>
                            <Skeleton className="h-6 w-50" />
                        </p>
                        <p>
                            <b>Occupation </b>
                            <Skeleton className="h-6 w-50" />
                        </p>
                    </div>
                </CardContent>
            </Card>
            <GallerySkeleton />
        </div>
    );
}
