import {keepPreviousData, useQuery} from "@tanstack/react-query"
import {axiosInstance} from "@/common/axios/axiosInstance.ts";
import {DataTableSortStatus} from "mantine-datatable";

const getUsersApi =
  async (page: number, pageSize: number, sortStatus: DataTableSortStatus) => {
  return await axiosInstance.get(
    `/api/v1/users?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
  );
}

export const useGetUsers =
  (page: number, pageSize: number, sortStatus: DataTableSortStatus) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsersApi(page , pageSize, sortStatus),
    placeholderData: keepPreviousData,
  })
}
