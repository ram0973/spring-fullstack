import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const updatePersonApi = async (user) => {
  return await axiosInstance.patch(`/api/v1/users/${user.id}`, user);
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updatePersonApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error)=>console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
