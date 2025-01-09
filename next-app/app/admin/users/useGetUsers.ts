import {keepPreviousData, useQuery} from "@tanstack/react-query"
import {axiosInstance} from "@/app/common/axios/axiosInstance";
import {DataTableSortStatus} from "mantine-datatable";
import {UsersDto} from "@/app/admin/users/types";

const getUsersApi = async (page: number, pageSize: number, sortStatus: DataTableSortStatus<UsersDto>) => {
  return await axiosInstance.get(
    `/api/v1/users?page=${page - 1}&size=${pageSize}&sort=${sortStatus.columnAccessor},${sortStatus.direction}`
  );
}

export const useGetUsers = (page: number, pageSize: number, sortStatus: DataTableSortStatus<UsersDto>) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsersApi(page , pageSize, sortStatus),
    placeholderData: keepPreviousData,
  })
}
