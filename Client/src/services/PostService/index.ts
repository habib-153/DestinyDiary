/* eslint-disable no-console */
'use server'
import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/libs/AxiosInstance";
import { IPost } from "@/src/types";
import envConfig from "@/src/config/envConfig";

export const createPost = async(data: IPost) => {
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