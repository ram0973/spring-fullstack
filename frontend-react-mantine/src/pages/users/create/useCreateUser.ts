import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const createUserApi = async (user) => {
  return (await axiosInstance.post("/api/v1/users", user)).data;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]}).catch((error) => console.log(error));
      console.info("created user");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
