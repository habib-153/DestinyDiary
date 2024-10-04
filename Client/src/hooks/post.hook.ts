import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost, getAllPosts } from "../services/PostService";

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

// export const useGetSinglePost = (id: string) => {
//   return useQuery({
//     queryKey: ["singlePost", id],
//     queryFn: async () => await getSinglePost(id),
//     enabled: !!id, // Only fetch if id is truthy
//   });
// };

// export const useAddUpvotePost = () => {
//   return useMutation<any, Error, { id: string }>({
//     mutationKey: ["ADD_UPVOTE_POST"],
//     mutationFn: async ({ id }) => {
//       return toast.promise(addUpvote(id), {
//         loading: "Upvoting post...",
//         success: `You upvoted this post!`,
//         error: "Error when upvoting post.",
//       });
//     },
//   });
// };

// export const useRemoveUpvotePost = () => {
//   return useMutation<any, Error, { id: string }>({
//     mutationKey: ["REMOVE_UPVOTE_POST"],
//     mutationFn: async ({ id }) => {
//       return toast.promise(removeUpvote(id), {
//         loading: "Removing upvote post...",
//         success: `You removed upvoting this post!`,
//         error: "Error when upvoting post.",
//       });
//     },
//   });
// };

// export const useAddDownvotePost = () => {
//   return useMutation<any, Error, { id: string }>({
//     mutationKey: ["ADD_DOWNVOTE_POST"],
//     mutationFn: async ({ id }) => {
//       return toast.promise(addDownvote(id), {
//         loading: "Downvoting post...",
//         success: `You downvoted this post!`,
//         error: "Error when downvoting post.",
//       });
//     },
//   });
// };

// export const useRemoveDownvotePost = () => {
//   return useMutation<any, Error, { id: string }>({
//     mutationKey: ["REMOVE_UPVOTE_POST"],
//     mutationFn: async ({ id }) => {
//       return toast.promise(removeDownvote(id), {
//         loading: "Removing downvote post...",
//         success: `You removed downvoting this post!`,
//         error: "Error when downvoting post.",
//       });
//     },
//   });
// };