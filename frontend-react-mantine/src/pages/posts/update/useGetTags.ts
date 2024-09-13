import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getTagsApi = async () => {
  return (await axiosInstance.get('/api/v1/posts-tags')).data;
}

export function useGetTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getTagsApi(),
  });
}
