import React from "react";
import HomePost from "../posts/HomePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import { useVirtualizer } from "@tanstack/react-virtual";

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
const PAGE_SIZE = 3;

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
      console.log("allItems", allItems);
      const allPosts = allItems.posts;
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return {
        items: allPosts.slice(start, end),
        nextPage: pageParam + 1,
        hasMore: end < allPosts.length,
      };
    },
    getNextPageParam: (lastGroup) => {
      return lastGroup.hasMore ? lastGroup.nextPage : undefined;
    },
    initialPageParam: 0,
  });
  const allRows = data ? data.pages.flatMap((d) => d.items) : [];
  console.log(data);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });
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
    rowVirtualizer.getVirtualItems(),
  ]);
  return (
    <div>
      {status === "pending" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <div
          ref={parentRef}
          className="width-full"
          //   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const post = allRows[virtualRow.index];

              return (
                <div key={virtualRow.index}>
                  {isLoaderRow ? (
                    hasNextPage ? (
                      "Loading more..."
                    ) : (
                      "Nothing more to load"
                    )
                  ) : (
                    <HomePost key={post.id} {...post} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* {posts.map((post) => (
        <HomePost key={post.id} {...post} />
      ))} */}
    </div>
  );
}
