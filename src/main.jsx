import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import MovieDetail from "./pages/MovieDetail";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/details/:id", element: <MovieDetail /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/signup", element: <SignUpForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> - 삭제 */}
    <RouterProvider router={router} />
    {/* </AuthProvider> - 삭제 */}
  </React.StrictMode>,
);
