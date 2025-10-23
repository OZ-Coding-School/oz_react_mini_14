import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Layout from "./pages/Layout";
import MovieDetail from "./Components/MovieDetail";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="detail" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
