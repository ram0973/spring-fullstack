import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";

const deleteUserApi = async (id: number) => {
  return await axiosInstance.delete(`/api/v1/users/${id}`)
}

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: deleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error) => console.log(error));
      console.info("Deleted user");
      notifications.show({
        title: 'Success',
        message: 'User deleted',

      })
    },
    onError: (error: AxiosError) => {
      console.log(error);
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error.response?.data?.message,
      })
    }
  });
}
