'use server'

import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/libs/AxiosInstance";

export const getAllUsers = async (query?: string) => {
    try {
      const { data } = await axiosInstance.get(`/users?${query}`);
  
      return data;
    } catch (error) {
      throw error;
    }
  };

  export const followUser = async (followedId: string): Promise<any> => {
    try {
      const { data } = await axiosInstance.post(`/users/follow/${followedId}`);

    revalidateTag("follow");
      revalidateTag("posts");
  
      return data.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unknown error occurred";

        throw new Error(errorMessage);
    }
  };
  
  export const unFollowUser = async (followedId: string): Promise<any> => {
    try {
      const { data } = await axiosInstance.delete(`/users/unfollow/${followedId}`);
  
    //   revalidateTag("follow");
      revalidateTag("posts");
  
      return data.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unknown error occurred";

        throw new Error(errorMessage);
    }
  };
  