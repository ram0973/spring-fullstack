import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getPostTagApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/posts-tags/${id}`)).data;
}

export function useGetPostTag(id: string | undefined) {
  return useQuery({
    queryKey: ["postTag", id],
    queryFn: () => getPostTagApi(id),
  });
}
