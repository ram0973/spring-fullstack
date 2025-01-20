import {createBrowserRouter} from "react-router-dom";
import {FrontLayout} from "@/common/layout/FrontLayout.tsx";
import {ErrorPage} from "@/common/layout/ErrorPage.tsx";
import {ProtectedRoute} from "@/common/layout/protectedRoute/ProtectedRoute.tsx";
import {AdminLayout} from "@/common/layout/AdminLayout.tsx";
import {Login} from "@/pages/auth/login/Login.tsx";
import {ForgotPassword} from "@/pages/auth/forgot-password/ForgotPassword.tsx";
import {UsersTable} from "@/pages/users/table/UsersTable.tsx";
import {CreateUser} from "@/pages/users/create/CreateUser";
import {UpdateUser} from "@/pages/users/update/UpdateUser";
import {Signup} from "@/pages/auth/signup/Signup.tsx";
import {PostsTable} from "@/pages/posts/table/PostsTable.tsx";


import {CreatePostWithBlockNote} from "@/pages/posts/create/CreatePostWithBlockNote.tsx";
import {UpdatePost} from "@/pages/posts/update/UpdatePost.tsx";

export const router = createBrowserRouter(
  [
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
        // {
        //   path: "roles",
        //   element: <UsersRolesTable/>
        // },
        // {
        //   path: "roles/create",
        //   element: <CreateUserRole/>
        // },
        // {
        //   path: "roles/update/:id",
        //   element: <UpdateUserRole/>
        // },
        {
          path: "posts",
          element: <PostsTable/>
        },
        {
          path: "posts/create",
          element: <CreatePostWithBlockNote/>
        },
        {
          path: "posts/update/:id",
          element: <UpdatePost/>
        },
        // {
        //   path: "posts-categories",
        //   element: <PostsCategoriesTable/>
        // },
        // {
        //   path: "posts-categories/create",
        //   element: <CreatePostCategory/>
        // },
        // {
        //   path: "posts-categories/update/:id",
        //   element: <UpdatePostCategory/>
        // },
        // {
        //   path: "posts-tags",
        //   element: <PostsTagsTable/>
        // },
        // {
        //   path: "posts-tags/create",
        //   element: <CreatePostTag/>
        // },
        // {
        //   path: "posts-tags/update/:id",
        //   element: <UpdatePostTag/>
        // },
        // {
        //   path: "posts-comments",
        //   element: <PostsCommentsTable/>
        // },
        // {
        //   path: "posts-comments/create",
        //   element: <CreatePostComment/>
        // },
        // {
        //   path: "posts-comments/update/:id",
        //   element: <UpdatePostComment/>
        // },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,

    },
  }
);
