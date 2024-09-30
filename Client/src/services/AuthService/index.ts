'use server'

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/libs/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);
  console.log("Data from registerUser: ", data);
      if (data.success) {
        cookies().set("accessToken", data?.data?.accessToken);
        cookies().set("refreshToken", data?.data?.refreshToken);
      }
  
      return data;
    } catch (error: any) {
      throw new Error(error);
    }
  };