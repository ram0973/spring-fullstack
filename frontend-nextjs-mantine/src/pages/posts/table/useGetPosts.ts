// src/api/getPostsApi.ts
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

export const getPostsApi = async (
  page: number,
  pageSize: number,
  sortStatus: { columnAccessor: string; direction: string }
) => {
  // await new Promise(resolve => setTimeout(resolve, 100)); // для тестирования загрузки
  return await axiosInstance.get(
    `/api/v1/posts?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
  );
};

export const useGetPosts = (
  page: number,
  pageSize: number,
  sortStatus: { columnAccessor: string; direction: string }
) => {
  return useQuery({
    queryKey: ["posts", page, pageSize, sortStatus],
    queryFn: () => getPostsApi(page, pageSize, sortStatus),
    placeholderData: keepPreviousData,
    staleTime: 15 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
