import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MovieDetailData from "./MovieDetailData.jsx";
import Layout from "./Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/detail" element={<MovieDetailData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
