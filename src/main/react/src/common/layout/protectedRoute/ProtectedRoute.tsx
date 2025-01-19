import {Navigate, useLocation, useNavigate} from "react-router-dom";
import React, {PropsWithChildren} from "react";
import {useAxiosInterceptor} from "@/common/axios/useAxiosInterceptor.tsx";
import { useAuthContext } from "@/common/context/useAuthContext.tsx";
import {Post} from "@/pages/posts";
import {useGetPost} from "@/pages/posts/view/useGetPost.ts";
import {User} from "@/pages/users";
import {useGetMe} from "@/common/layout/protectedRoute/useGetMe.ts";
import {wratchInterceptor} from "@/common/axios/wratchInterceptor.ts";
import {axiosInstance} from "@/common/axios/axiosInstance.ts";


export const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
  const context = useAuthContext();
  const location = useLocation();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    axiosInstance.get('/api/v1/auth/me')
      .then(res => {
        //console.log(res);
        if (res.status === 204) {
          authContext.logout();
          navigate('/login', {state: {from: location}, replace: true}); // Редирект с состоянием
        } else {
          authContext.login(res.data);
        }
      });
  }, [location]);
  //useAxiosInterceptor();
  //wratchInterceptor();
  // const me: User = useGetMe().data;
  // if (!me) {
  //   context.logout();
  // }

  // if (!context?.user?.email) {
  //   //context.setRedirect();
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return children;
};
