import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import { userRoleCreateSchema } from "./zod";

const createUserRoleApi = async (role: z.infer<typeof userRoleCreateSchema>) => {
  return axiosInstance.post("/api/v1/roles", role);
}

export const useCreateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createRole'],
    mutationFn: createUserRoleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["roles"]}).catch((error) => console.log(error));
      console.info("created role");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
