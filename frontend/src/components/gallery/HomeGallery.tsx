import HomePost from "../posts/HomePost";

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
}

export function HomeGallery({ posts }: GalleryProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
                <HomePost key={post.id} {...post} />
            ))}
        </div>
    );
}
