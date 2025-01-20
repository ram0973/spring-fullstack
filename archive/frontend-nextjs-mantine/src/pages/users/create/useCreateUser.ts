import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {userCreateSchema} from "@/pages/users/create/zod.ts";

const createUserApi = async (user: z.infer<typeof userCreateSchema>) => {
  return axiosInstance.post("/api/v1/users", user, //userWithFile,
    {
      headers: {
        //"Content-type": "multipart/form-data",
        "Content-type": "application/json",
      },
    });
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error) => console.log(error));
      console.info("created user");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
