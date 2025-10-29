import "./index.css";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MovieListProvider } from "./context/MovieListData.jsx";
import { MovieDetailProvider } from "./context/MovieDetailData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieListProvider>
      <MovieDetailProvider>
        <App />
      </MovieDetailProvider>
    </MovieListProvider>
  </BrowserRouter>
);
