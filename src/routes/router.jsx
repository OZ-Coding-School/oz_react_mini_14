// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";

import { App, MovieDetail } from "@/pages";
import { Layout, LoginForm, SignUpForm } from "@/components";
import MyPage from "@/pages/MyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/details/:id", element: <MovieDetail /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpForm /> },
      { path: "/mypage", element: <MyPage /> }, // ← 추가
    ],
  },
]);
