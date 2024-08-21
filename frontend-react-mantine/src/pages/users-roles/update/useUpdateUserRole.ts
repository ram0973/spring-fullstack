import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import { userRoleUpdateSchema } from "./zod";

const updateUserRoleApi = async (role: z.infer<typeof userRoleUpdateSchema>) => {
  return await axiosInstance.patch(`/api/v1/roles/${role.id}`, role);
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateRole'],
    mutationFn: updateUserRoleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["roles"]}).catch((error) => console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
