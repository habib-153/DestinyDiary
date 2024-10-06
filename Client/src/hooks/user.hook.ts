import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { IUser } from "../types";
import { getVerified } from "../services/AuthService";

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