import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import z from "zod";
import {postCategoryUpdateSchema} from "@/pages/posts-categories/update/zod.ts";

const updatePostCategoryApi = async (postCategory: z.infer<typeof postCategoryUpdateSchema>) => {
  return await axiosInstance.patch(`/api/v1/posts-categories/${postCategory.id}`, postCategory);
}

export const useUpdatePostCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updatePostCategory'],
    mutationFn: updatePostCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts-categories"]}).catch((error) => console.log(error))
    },
    onError: (error) => {
      console.log(error)
    },
  });
}
