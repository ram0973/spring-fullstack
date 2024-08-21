import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postUpdateSchema} from "@/pages/posts/update/zod.ts";

const updatePostApi = async (post: z.infer<typeof postUpdateSchema>) => {
  return await axiosInstance.patch(`/api/v1/posts/${post.id}`, post,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    },
  );
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePost'],
    mutationFn: updatePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]}).catch((error) => console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
