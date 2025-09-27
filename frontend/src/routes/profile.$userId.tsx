import { createFileRoute } from "@tanstack/react-router";
import { Card, CardHeader } from "@/components/ui/card";

import {
    getPostsByProfileQueryOptions,
    getSessionQueryOptions,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ProfileGallery } from "@/components/gallery/ProfileGallery";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { IoSettingsSharp } from "react-icons/io5";
import { useState } from "react";
import EditPopup from "@/components/profiles/editPopup";
import { ProfileInfo } from "@/components/profiles/ProfileInfo";
import { ProfileStats } from "@/components/profiles/ProfileStats";

export const Route = createFileRoute("/profile/$userId")({
    component: Profile,
});

function Profile() {
    const { userId } = Route.useParams();
    const [showEditPopup, setShowEditPopup] = useState(false);

    // get all information related to user
    const { data, isPending, isError } = useQuery(
        getPostsByProfileQueryOptions(userId)
    );

    // get session
    const { data: session } = useQuery(getSessionQueryOptions);
    // console.log(session);

    if (isError) {
        return <ProfileSkeleton />;
    }

    if (isPending) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="max-w-4xl m-auto flex flex-col gap-2">
            <div className="max-w-4xl grid sm:grid-cols-[2fr_1fr] gap-y-4 gap-x-2">
                {showEditPopup && (
                    <EditPopup
                        setShowEditPopup={setShowEditPopup}
                        userId={userId}
                        userData={data?.user}
                    />
                )}
                <Card>
                    <CardHeader className="relative">
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
                                <p>{data.user.bio}</p>
                            </div>
                            {session?.user?.id == data.user.id && (
                                <IoSettingsSharp
                                    className="text-4xl absolute right-4"
                                    onClick={() => setShowEditPopup(true)}
                                />
                            )}
                        </div>
                    </CardHeader>
                </Card>
                <ProfileStats user={data.user} posts={data.posts} />
            </div>

            <ProfileInfo {...data.user} />
            <ProfileGallery
                session={
                    session ? { user: { id: session.user.id } } : undefined
                }
                userId={userId}
            />
        </div>
    );
}
