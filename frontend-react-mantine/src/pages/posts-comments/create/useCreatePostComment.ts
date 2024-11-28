import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postCommentCreateSchema} from "@/pages/posts-comments/create/zod.ts";

const createPostCommentApi = async (comment: z.infer<typeof postCommentCreateSchema>) => {
  return axiosInstance.post("/api/v1/posts-comments", comment);
}

export const useCreatePostComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPostComment'],
    mutationFn: createPostCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-comments"]}).catch((error) => console.log(error));
      console.info("created post comment");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
