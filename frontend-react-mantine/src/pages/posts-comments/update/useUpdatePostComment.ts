import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {notifications} from "@mantine/notifications";
import {postCommentUpdateSchema} from "@/pages/posts-comments/update/zod.ts";

const updatePostApi = (comment: z.infer<typeof postCommentUpdateSchema>) => {
  return axiosInstance.patch(`/api/v1/posts-comments/${comment.id}`, comment)
}

export const useUpdatePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePostComment'],
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-comments"]}).catch((error) => console.log(error));
      notifications.show({
        color: 'blue',
        title: 'Success',
        message: 'Post comment updated',
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
