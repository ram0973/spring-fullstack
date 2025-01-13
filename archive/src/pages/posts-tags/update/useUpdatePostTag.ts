import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postTagUpdateSchema} from "@/pages/posts-tags/update/zod.ts";
import {notifications} from "@mantine/notifications";

const updatePostTagApi = (tag: z.infer<typeof postTagUpdateSchema>) => {
  return axiosInstance.patch(`/api/v1/posts-tags/${tag.id}`, tag)
}

export const useUpdatePostTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePostTag'],
    mutationFn: updatePostTagApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-tags"]}).catch((error) => console.log(error));
      notifications.show({
        color: 'blue',
        title: 'Success',
        message: 'Post tag updated',
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
