import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {userCreateSchema} from "@/pages/users/create/zod.ts";

const loginApi = async (user: z.infer<typeof userCreateSchema>) => {
  return axiosInstance.post("/api/v1/auth/login", user, //userWithFile,
    {
      headers: {
        //"Content-type": "multipart/form-data",
        "Content-type": "application/json",
      },
    });
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["login"]}).catch((error) => console.log(error));
      console.info("login successful");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
