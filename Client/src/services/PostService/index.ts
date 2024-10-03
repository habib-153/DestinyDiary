/* eslint-disable no-console */
'use server'
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/libs/AxiosInstance";
import envConfig from "@/src/config/envConfig";
import { getCurrentUser } from "../AuthService";

export const createPost = async(data: FormData) => {
    try {
        const response = await axiosInstance.post("/posts", data);

        revalidateTag("/posts");
        
        return response.data;
    } catch (error: any) {
        console.log(error.response ? error.response.data : error.message);
    }
}

export const getAllPosts = async() => {
    const fetchOption = {
        next: {
          tags: ["posts"],
        },
      };
    
      const res = await fetch(`${envConfig.baseApi}/posts`, fetchOption);
      const data = await res.json();
    
      return data;
}


export const getMyPosts = async () => {
    const user = await getCurrentUser();
  
    const res = await axiosInstance.get(`/posts/${user?._id}`);
  
    return res.data;
  };