import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { addDownvote, addUpvote, createPost, getAllPosts, getSinglePost, removeDownvote, removeUpvote } from "../services/PostService";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};


export const useGetAllPosts = (apiUrl: string) => {
  return useQuery({
    queryKey: [apiUrl],
    queryFn: async () => await getAllPosts(apiUrl),
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["singlePost", id],
    queryFn: async () => await getSinglePost(id),
    enabled: !!id, 
  });
};

export const useAddUpVotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["ADD_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(addUpvote(id), {
        loading: "UpVoting post...",
        success: `You upVoted this post!`,
        error: "Error when upVoting post.",
      });
    },
  });
};

export const useRemoveUpVoteFromPost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["REMOVE_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(removeUpvote(id), {
        loading: "Removing upvote post...",
        success: `You remove upVote from this post!`,
        error: "Error when upVoting post.",
      });
    },
  });
};

export const useAddDownVotePost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["ADD_DOWNVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(addDownvote(id), {
        loading: "DownVoting post...",
        success: `You downVoted this post!`,
        error: "Error when downVoting post.",
      });
    },
  });
};

export const useRemoveDownVoteFromPost = () => {
  return useMutation<any, Error, { id: string }>({
    mutationKey: ["REMOVE_UPVOTE_POST"],
    mutationFn: async ({ id }) => {
      return toast.promise(removeDownvote(id), {
        loading: "Removing downvote post...",
        success: `You removed downvote from this post!`,
        error: "Error when downVoting post.",
      });
    },
  });
};