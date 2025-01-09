import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postTagCreateSchema} from "@/pages/posts-tags/create/zod.ts";

const createPostTagApi = async (post: z.infer<typeof postTagCreateSchema>) => {
  return axiosInstance.post("/api/v1/posts-tags", post);
}

export const useCreatePostTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPostTag'],
    mutationFn: createPostTagApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-tags"]}).catch((error) => console.log(error));
      console.info("created post tag");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
