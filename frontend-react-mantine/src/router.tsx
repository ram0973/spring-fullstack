import {createBrowserRouter} from "react-router-dom";
import {FrontLayout} from "@/common/layout/FrontLayout.tsx";
import {ErrorPage} from "@/common/layout/ErrorPage.tsx";
import {ProtectedRoute} from "@/common/layout/ProtectedRoute.tsx";
import {AdminLayout} from "@/common/layout/AdminLayout.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import {ForgotPassword} from "@/pages/auth/ForgotPassword.tsx";
import {UsersTable} from "@/pages/users/table/UsersTable.tsx";
import {CreateUser} from "@/pages/users/create/CreateUser";
import {UpdateUser} from "@/pages/users/update/UpdateUser";
import {Signup} from "@/pages/auth/Signup.tsx";

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
        path: "signup",
        element: <Signup/>
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
      {
        path: "users/create",
        element: <CreateUser/>
      },
      {
        path: "users/update/:id",
        element: <UpdateUser/>
      },
    ],
  },
]);
