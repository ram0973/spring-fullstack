import {useMutation, useQueryClient} from "@tanstack/react-query";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";

const logoutApi = async () => {
  return axiosInstance.post("/api/v1/auth/logout", //userWithFile,
    {
      headers: {
        //"Content-type": "multipart/form-data",
        "Content-type": "application/json",
      },
    });
}

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["logout"]}).catch((error) => console.log(error));
      console.info("logout successful");
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
}
