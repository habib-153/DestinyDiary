/* eslint-disable no-console */
"use server";
import { revalidateTag } from "next/cache";

import { getCurrentUser } from "../AuthService";

import axiosInstance from "@/src/libs/AxiosInstance";
import envConfig from "@/src/config/envConfig";
import { IComment } from "@/src/types";

export const createPost = async (data: FormData) => {
  try {
    const response = await axiosInstance.post("/posts", data);

    revalidateTag("posts");

    return response.data;
  } catch (error: any) {
    console.log(error.response ? error.response.data : error.message);
  }
};

export const getAllPosts = async (apiUrl: string) => {
  const res = await fetch(apiUrl, {
    next: {
      tags: ["posts"],
    },
  });

  const data = await res.json();

  return data;
};

export const getMyPosts = async () => {
  const user = await getCurrentUser();

  const res = await axiosInstance.get(`/posts/${user?._id}`);

  return res.data;
};

export const addUpvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/upvote`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const removeUpvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}/upvote`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const addDownvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/posts/${postId}/downvote`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const removeDownvote = async (postId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}/downvote`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/posts/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

export const updatePost = async (payload: FormData, id: string) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${id}`, payload);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${id}`);

    revalidateTag("posts");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const getPostAllComments = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comments", "posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/comments/${postId}`,
    fetchOption
  );

  const data = await res.json();

  return data;
};

export const postAComment = async (commentData: IComment): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", commentData);

    revalidateTag("posts");
    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const updateComment = async (
  id: string,
  updatedComment: Partial<IComment>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(`/comments/${id}`, updatedComment);

    revalidateTag("posts");
    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};

export const deleteComment = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/comments/${id}`);

    revalidateTag("comments");

    return data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Unknown error occurred";

    throw new Error(errorMessage);
  }
};
