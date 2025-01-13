import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getPostCommentApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/posts-comments/${id}`)).data;
}

export function useGetPostComment(id: string | undefined) {
  return useQuery({
    queryKey: ["postComment", id],
    queryFn: () => getPostCommentApi(id),
  });
}
