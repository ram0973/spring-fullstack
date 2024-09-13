import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import { postCategoryCreateSchema } from "./zod";

const createPostCategoryApi = async (category: z.infer<typeof postCategoryCreateSchema>) => {
  return axiosInstance.post("/api/v1/posts-categories", category);
}

export const useCreatePostCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createPostCategory'],
    mutationFn: createPostCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-categories"]}).catch((error) => console.log(error));
      console.info("created post category");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
