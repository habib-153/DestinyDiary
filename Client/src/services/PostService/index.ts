/* eslint-disable no-console */
'use server'
import { revalidateTag } from "next/cache";

import { getCurrentUser } from "../AuthService";

import axiosInstance from "@/src/libs/AxiosInstance";
import envConfig from "@/src/config/envConfig";

export const createPost = async(data: FormData) => {
    try {
        const response = await axiosInstance.post("/posts", data);

        revalidateTag("/posts");
        
        return response.data;
    } catch (error: any) {
        console.log(error.response ? error.response.data : error.message);
    }
}

export const getAllPosts = async (apiUrl: string) => {
    const res = await fetch(apiUrl, {
      next: {
        tags: ["posts"],
      },
    });
    const data = await res.json();
  
    return data;
}


export const getMyPosts = async () => {
    const user = await getCurrentUser();
  
    const res = await axiosInstance.get(`/posts/${user?._id}`);
  
    return res.data;
  };