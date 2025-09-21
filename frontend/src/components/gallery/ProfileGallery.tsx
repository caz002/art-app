import React from "react";
import ProfilePost from "../posts/ProfilePost";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import LoadingSpinner from "../skeletons/LoadingSpinner";
import { getPosts, getPostsByUserId } from "@/lib/api";
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
}
const ROW_SIZE = 3;
export function ProfileGallery({ posts, session }: GalleryProps) {
  // console.log(session);
  // console.log("userId", String(session?.user.id));
  //const { data: session2 } = useQuery(getSessionQueryOptions);
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
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const currChunk = await getPostsByUserId(
          session ? session.user.id : ""
        );
        const posts = Array.isArray(currChunk?.posts) ? currChunk.posts : [];
        const start = pageParam * ROW_SIZE;
        const end = pageParam * 3 + 3;

        const result = {
          items: [posts.slice(start, start + ROW_SIZE)],
          nextPage: pageParam + 1,
          hasMore: end < posts.length,
        };
        return result;
      } catch (err) {
        console.error("QueryFn error:", err);
        return {
          items: [],
          nextPage: pageParam + 1,
          hasMore: false,
        };
      }
    },
    getNextPageParam: (lastGroup) => {
      return lastGroup.hasMore ? lastGroup.nextPage : undefined;
    },
    initialPageParam: 0,
  });
  const allRows = data ? data.pages.flatMap((d) => d.items) : [];
  console.log("allRows", allRows);
  console.log(allRows);
  console.log("hasNextPage", hasNextPage);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 450,
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
