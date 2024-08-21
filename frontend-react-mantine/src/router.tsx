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
import {UsersRolesTable} from "@/pages/users-roles/table/UsersRolesTable.tsx";
import {CreateUserRole} from "@/pages/users-roles/create/CreateUserRole.tsx";
import {UpdateUserRole} from "@/pages/users-roles/update/UpdateUserRole.tsx";
import {PostsTable} from "@/pages/posts/table/PostsTable.tsx";
import {CreatePost} from "@/pages/posts/create/CreatePost.tsx";
import {UpdatePost} from "@/pages/posts/update/UpdatePost.tsx";

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
      {
        path: "roles",
        element: <UsersRolesTable/>
      },
      {
        path: "roles/create",
        element: <CreateUserRole/>
      },
      {
        path: "roles/update/:id",
        element: <UpdateUserRole/>
      },
      {
        path: "posts",
        element: <PostsTable/>
      },
      {
        path: "posts/create",
        element: <CreatePost/>
      },
      {
        path: "posts/update/:id",
        element: <UpdatePost/>
      },
    ],
  },
]);
