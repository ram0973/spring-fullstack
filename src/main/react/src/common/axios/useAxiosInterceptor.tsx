import React from 'react';
import {axiosInstance} from "./axiosInstance.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/common/context/useAuthContext.tsx";
import {router} from "@/router.tsx";

// hook for intercepting api requests
export const useAxiosInterceptor = function () {
  const authContext = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Проверка авторизации при монтировании компонента
  React.useEffect(() => {
    axiosInstance.get('/api/v1/auth/me')
      .then(res => {
        //console.log(res);
        if (res.status === 204) {
          authContext.logout();
          navigate('/login', { state: { from: location }, replace: true }); // Редирект с состоянием
        } else {
          authContext.login(res.data);
        }
      });

    // Interceptor для обработки ошибок 401
    const authInterceptor = axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      }, function (error) {
        if (error.response.status === 401) {
          authContext.logout();
          navigate('/login', { state: { from: location }, replace: true }); // Редирект с состоянием
        }
        return Promise.reject(error);
      });
    return () => {
      axiosInstance.interceptors.response.eject(authInterceptor); // remove interceptor on dismount/auth change
    };
  }, [location]);
};
