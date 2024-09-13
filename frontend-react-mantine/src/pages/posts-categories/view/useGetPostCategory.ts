import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getPostCategoryApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/posts-categories/${id}`)).data;
}

export const useGetPostCategory = (id: string | undefined) => {
  return useQuery({
    queryKey: ["postCategory", id],
    queryFn: () => getPostCategoryApi(id),
  });
}
