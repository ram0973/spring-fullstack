import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {userCreateSchema} from "@/pages/users/create/zod.ts";

const signupApi = async (user: z.infer<typeof userCreateSchema>) => {
  return axiosInstance.post("/api/v1/auth/signup", user, //userWithFile,
    {
      headers: {
        //"Content-type": "multipart/form-data",
        "Content-type": "application/json",
      },
    });
}

export const useSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: signupApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["signup"]}).catch((error) => console.log(error));
      console.info("signup successful");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
