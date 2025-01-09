import {Navigate, useLocation} from "react-router-dom";
import React, {PropsWithChildren} from "react";
import {useAxiosInterceptor} from "@/common/axios/useAxiosInterceptor.tsx";
import { useAuthContext } from "@/common/context/useAuthContext.tsx";

export const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
  //const context = useAuthContext();
  const location = useLocation();

  //useAxiosInterceptor();

  //if (!context.user) {
    // return <Navigate to={"/login"} replace state={{from: location}} />
  //}
  return children;
};
