import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./component/MovieDetail.jsx";
import Layout from "./component/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/details/:id" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
