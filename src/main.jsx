// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { AuthProvider } from "./contexts/AuthContext"; // 1. import 확인
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* 2. 여기 주석 해제! */}
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </AuthProvider>{" "}
    {/* 3. 여기 주석 해제! */}
  </React.StrictMode>,
);
