import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postCreateSchema} from "@/pages/posts/create/zod.ts";

const createPostApi = async (post: z.infer<typeof postCreateSchema>) => {
  return axiosInstance.post("/api/v1/posts", post,
    {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createpost'],
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]}).catch((error) => console.log(error));
      console.info("created post");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
