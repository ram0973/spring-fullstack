import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";

const deletePostApi = async (id: number) => {
  return await axiosInstance.delete(`/api/v1/posts/${id}`)
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deletePost'],
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]}).catch((error) => console.log(error));
      console.info("Deleted post");
      notifications.show({
        title: 'Success',
        message: 'Post deleted',
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
