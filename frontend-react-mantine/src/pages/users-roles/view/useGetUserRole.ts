import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getUserRoleApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/roles/${id}`)).data;
}

export const useGetUserRole = (id: string | undefined) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: () => getUserRoleApi(id),
  });
}
