import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getUserApi = async (id: string | undefined) => {
  return (await axiosInstance.get(`/api/v1/users/${id}`)).data;
}

export function useGetUser(id: string | undefined) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi(id),
  });
}
