import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getPostApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/posts/${id}`)).data;
}

export function useGetPost(id: string | undefined) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostApi(id),
  });
}
