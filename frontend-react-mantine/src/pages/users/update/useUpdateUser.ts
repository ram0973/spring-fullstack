import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {userUpdateSchema} from "@/pages/users/update/zod.ts";

const updatePersonApi = async (user: z.infer<typeof userUpdateSchema>) => {
  return await axiosInstance.patch(`/api/v1/users/${user.id}`, user,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    },
  );
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updatePersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error) => console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
