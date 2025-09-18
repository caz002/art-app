import React from "react";
import HomePost from "../posts/HomePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { useVirtualizer } from "@tanstack/react-virtual";
import LoadingSpinner from "../skeletons/LoadingSpinner";

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
// export const getPostsQueryOptions = queryOptions({
//     queryKey: ["get-posts"],
//     queryFn: getPosts,
//     staleTime: 1000 * 60 * 5,
// });
const PAGE_SIZE = 1;

export function HomeGallery({ posts }: GalleryProps) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam }) => {
      const allItems = await getPosts();
      const allPosts = allItems.posts;
      const allChunks = [];
      for (let i = 0; i < allPosts.length; i += 3) {
        allChunks.push(allPosts.slice(i, i + 3));
      }
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      return {
        items: allChunks.slice(start, end),
        nextPage: pageParam + 1,
        hasMore: end < allPosts.length,
      };
    },
    getNextPageParam: (lastGroup) => {
      return lastGroup.hasMore ? lastGroup.nextPage : undefined;
    },
    initialPageParam: 0,
  });
  //console.log("data", data);
  const allRows = data ? data.pages.flatMap((d) => d.items) : [];
  console.log("allRows", allRows);
  console.log(allRows);
  console.log("hasNextPage", hasNextPage);
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
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div ref={parentRef} className="w-full h-[70vh] overflow-auto">
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
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      <LoadingSpinner />
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    postRow.map((post) => <HomePost key={post.id} {...post} />)
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
