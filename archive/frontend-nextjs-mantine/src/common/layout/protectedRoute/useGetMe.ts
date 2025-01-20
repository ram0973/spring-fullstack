import {useQuery} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const getMeApi = async () => {
  return (await axiosInstance.get('/api/v1/auth/me')).data;
}

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMeApi(),
  });
}
