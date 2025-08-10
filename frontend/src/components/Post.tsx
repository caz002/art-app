import type React from "react";
import type { ImageData } from "../lib/types";

interface PostProps {
  data: ImageData;
}

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="w-full max-w-xs rounded-lg p-4 bg-white flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <img
        src={data.imageUrl}
        alt="Post"
        className=" object-cover w-full h-full rounded-lg"
      />

      <div className="mt-4">
        <h3>
          By User {data.authorId} on{" "}
          {new Date(data.createdAt).toLocaleDateString()}
        </h3>
      </div>
    </div>
  );
};

export default Post;
