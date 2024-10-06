import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { IUser } from "../types";
import { getVerified, updateUser } from "../services/AuthService";
import { useUser } from "../context/user.provider";
import { updateAccessTokenInCookies } from "../utils/updateAccessToken";

export const useGetVerified = (onSuccessCallback: any) => {
    return useMutation<any, Error, Partial<IUser>>({
      mutationKey: ["UPDATE_USER"],
      mutationFn: async (payload) => {
        const response = await getVerified(payload); 

        return response; 
      },
      onSuccess: (data) => {
        onSuccessCallback(data);
      },
      onError: (error) => {
        toast.error("Error when giving payment: " + error.message);
      },
    });
  };

  export const useUpdateUser = () => {
    const { user, updateProfile } = useUser();
  
    return useMutation<any, Error, FormData>({
      mutationKey: ["UPDATE_USER"],
      mutationFn: async (userData) => await updateUser(userData),
      onSuccess: (_data) => {
        toast.success("Profile updated successfully!");
        // console.log(_data?.data)
          updateProfile(_data?.data);
          updateAccessTokenInCookies(_data?.data);
        // }
      },
      onError: (error) => {
        toast.error(`Failed to update profile ${error?.message}`);
      },
    });
  };