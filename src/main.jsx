import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SupabaseProvider } from "@sbcontext";
import { UserProvider } from "@sbcontext/UserContext";
import { BookmarkProvider } from "@contexts/BookmarkContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InfiniteMoviesProvider } from "./contexts/InfiniteMoviesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SupabaseProvider>
    <UserProvider>
      <BookmarkProvider>
        <InfiniteMoviesProvider>
          <BrowserRouter>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              theme="dark"
            />
          </BrowserRouter>
        </InfiniteMoviesProvider>
      </BookmarkProvider>
    </UserProvider>
  </SupabaseProvider>
);
