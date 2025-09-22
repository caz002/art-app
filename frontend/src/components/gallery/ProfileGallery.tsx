import React from "react";
import ProfilePost from "../posts/ProfilePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import LoadingSpinner from "../skeletons/LoadingSpinner";
import getAllUserPostsOptions, { getPosts, getPostsByUserId } from "@/lib/api";
import { getPostsByProfileQueryOptions } from "@/lib/api";
import { getSessionQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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
  userId: string;
}
const ROW_SIZE = 3;
export function ProfileGallery({ posts, session, userId }: GalleryProps) {
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getAllUserPostsOptions({ userId, ROW_SIZE }));
  const allRows = data ? data.pages.flatMap((d) => d.items) : [];
  const parentRef = React.useRef<HTMLDivElement>(null);
  const isOwner = session?.user.id === userId;
  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isOwner ? 450 : 420),
    overscan: 0,
  });
  const virtualItems = rowVirtualizer.getVirtualItems();
  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualItems.length,
  ]);
  return (
    <div>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div ref={parentRef} className="w-full h-[58vh] overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const postRow = allRows[virtualRow.index];

              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="flex flex-row flex-1 gap-4 pb-4"
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <div className="flex flex-row flex-1 items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    postRow.map((post) => (
                      <ProfilePost
                        key={post.id}
                        {...post}
                        session={
                          session
                            ? { user: { id: session.user.id } }
                            : undefined
                        }
                        className="max-w-[32%]"
                      />
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    //   {posts.map((post) => (
    //     <ProfilePost
    //       key={post.id}
    //       {...post}
    //       session={session ? { user: { id: session.user.id } } : undefined}
    //     />
    //   ))}
    // </div>
  );
}
