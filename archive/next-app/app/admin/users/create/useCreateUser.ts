import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/app/common/axios/axiosInstance";
import {userCreateSchema} from "@/app/admin/users/create/zod";
import z from "zod";

const createUserApi = async (user: z.infer<typeof userCreateSchema>) => {
  return axiosInstance.post("/api/v1/users", user, //userWithFile,
    {
      headers: {
        "Content-type": "multipart/form-data",
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
