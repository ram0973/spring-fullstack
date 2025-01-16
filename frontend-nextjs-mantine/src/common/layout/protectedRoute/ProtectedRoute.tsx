import {Navigate, useLocation} from "react-router-dom";
import React, {PropsWithChildren} from "react";
import {useAxiosInterceptor} from "@/common/axios/useAxiosInterceptor.tsx";
import { useAuthContext } from "@/common/context/useAuthContext.tsx";
import {Post} from "@/pages/posts";
import {useGetPost} from "@/pages/posts/view/useGetPost.ts";
import {User} from "@/pages/users";
import {useGetMe} from "@/common/layout/protectedRoute/useGetMe.ts";
import {wratchInterceptor} from "@/common/axios/wratchInterceptor.ts";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
  const context = useAuthContext();
  const location = useLocation();
  useAxiosInterceptor();
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
