import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {userUpdateSchema} from "@/pages/users/update/zod.ts";

const updateUserApi = async (user: z.infer<typeof userUpdateSchema>) => {
  return await axiosInstance.patch(`/api/v1/users/${user.id}`, user,
    {
      headers: {
        //"Content-type": "multipart/form-data",
        "Content-type": "application/json",
      },
    },
  );
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error) => console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
