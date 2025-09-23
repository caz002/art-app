import React from "react";
import HomePost from "../posts/HomePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPostsQueryOptions } from "@/lib/api";
import { useVirtualizer } from "@tanstack/react-virtual";
import LoadingSpinner from "../skeletons/LoadingSpinner";
import { GallerySkeleton } from "../skeletons/GallerySkeleton";

// interface GalleryProps {
//   posts: {
//     imageUrl: string;
//     userName?: string;
//     id: number;
//     userId: string;
//     caption: string;
//     imageKey: string;
//     createdAt: string;
//   }[];
// }

export function HomeGallery() {
  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getAllPostsQueryOptions);
  const allRows = data ? data.pages.flatMap((d) => d.items) : [];
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 420,
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
        <GallerySkeleton />
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div ref={parentRef} className="w-full h-[75vh] overflow-auto">
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
                      <HomePost
                        key={post.id}
                        {...post}
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
  );
}
