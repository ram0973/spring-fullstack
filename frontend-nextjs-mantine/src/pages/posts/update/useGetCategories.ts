import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getCategoriesApi = async () => {
  return (await axiosInstance.get(`/api/v1/posts-categories`)).data;
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });
}
