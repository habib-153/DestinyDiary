"use client";
import { useParams } from "next/navigation";
import React from "react";

import { useGetSinglePost } from "@/src/hooks/post.hook";
import PostCardSkeleton from "@/src/components/UI/PostCardSkeleton";
import PostCard from "@/src/components/UI/PostCard";
import CommentSection from "@/src/components/modules/post/Comment";
import { useUser } from "@/src/context/user.provider";

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading} = useGetSinglePost(id as string);
  const postData = data?.data;
  const { user } = useUser();

  return (
    <div>
      {isLoading ? (
        <PostCardSkeleton />
      ) : (
        <div>
          <PostCard full={true} post={postData} />
          <CommentSection postId={id as string} user={user} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
