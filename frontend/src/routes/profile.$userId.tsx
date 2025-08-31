import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getPostsByProfileQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Gallery } from "@/components/gallery";

export const Route = createFileRoute("/profile/$userId")({
    component: Profile,
});

function Profile() {
    const { userId } = Route.useParams();

    const { data, isPending, isError } = useQuery(
        getPostsByProfileQueryOptions(userId)
    );

    // const { data: userInfo } = useQuery(userQueryOptions);

    // const isOwner = userInfo?.user.id === userId;

    if (isError) {
        return <div>Error!</div>;
    }

    if (isPending) {
        return <div>Loading</div>;
    }

    return (
        <div className="max-w-4xl m-auto flex flex-col gap-y-2">
            <div className="max-w-4xl grid sm:grid-cols-[2fr_1fr] gap-y-4">
                <Card>
                    <CardHeader>
                        <div className="flex gap-x-4 ">
                            <img
                                src={data.user.image}
                                alt={data.user.name}
                                className="w-32 h-32 object-cover rounded-md"
                            />

                            <div className="flex flex-col gap-y-1">
                                <div>
                                    <h1 className="font-bold text-2xl">
                                        {data.user.name}
                                    </h1>
                                </div>
                                <p>
                                    hello! this is some placeholder text abt me!
                                    hello! this is some placeholder text abt me!
                                    hello!
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-white text-xs pr-4 pl-4">
                        <dl className="contents">
                            <dt className="text-gray-400">Total Posts</dt>
                            <dd className="text-right font-medium">
                                {data.posts.length}
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="text-gray-400">Best Streak</dt>
                            <dd className="text-right font-medium">
                                NotImplemented
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="text-gray-400">Current Streak</dt>
                            <dd className="text-right font-medium">
                                NotImplemented
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="text-gray-400">
                                Perfect Week Count
                            </dt>
                            <dd className="text-right font-medium">
                                NotImplemented
                            </dd>
                        </dl>
                        <dl className="contents">
                            <dt className="text-gray-400">Completion Rate</dt>
                            <dd className="text-right font-medium">
                                NotImplemented
                            </dd>
                        </dl>
                    </div>
                </Card>
            </div>
            <Card>
                <CardContent className="flex gap-x-2">
                    <p>
                        <b>Joined </b>
                        {new Date(data.user.createdAt).toDateString()}
                    </p>
                    <p>
                        <b>Likes </b>
                        placeholder, placeholder
                    </p>
                    <p>
                        <b>Occupation </b>
                        placeholder, placeholder
                    </p>
                </CardContent>
            </Card>
            <Gallery {...data} />
        </div>
    );
}
