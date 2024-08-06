import {createBrowserRouter} from "react-router-dom";
import {FrontLayout} from "@/common/layout/FrontLayout.tsx";
import {ErrorPage} from "@/common/layout/ErrorPage.tsx";
import {ProtectedRoute} from "@/common/layout/ProtectedRoute.tsx";
import {AdminLayout} from "@/common/layout/AdminLayout.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import {ForgotPassword} from "@/pages/auth/ForgotPassword.tsx";
import {UsersTable} from "@/pages/users/UsersTable.tsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute><AdminLayout/></ProtectedRoute>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "users",
        element: <UsersTable/>
      },
    ],
  },
]);
