import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postUpdateSchema} from "@/pages/posts/update/zod.ts";
import {notifications} from "@mantine/notifications";

const updatePostApi = (post: z.infer<typeof postUpdateSchema>) => {
  return axiosInstance.patch(`/api/v1/posts/${post.id}`, post,
    {headers: {"Content-type": "multipart/form-data",},}
  )
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePost'],
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]}).catch((error) => console.log(error));
      notifications.show({
        color: 'blue',
        title: 'Success',
        message: 'Post updated',
      })
    },
    onError: (error) => {
      console.log(error);
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message,
        autoClose: false,
      })
    },
  });
}
