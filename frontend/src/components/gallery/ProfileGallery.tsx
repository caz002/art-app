import ProfilePost from "../posts/ProfilePost";

interface GalleryProps {
    posts: {
        imageUrl: string;
        userName?: string;
        id: number;
        userId: string;
        caption: string;
        imageKey: string;
        createdAt: string;
    }[];
    session?: {
        user: {
            id: string;
        };
    };
}

export function ProfileGallery({ posts, session }: GalleryProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
                <ProfilePost
                    key={post.id}
                    {...post}
                    session={
                        session ? { user: { id: session.user.id } } : undefined
                    }
                />
            ))}
        </div>
    );
}
