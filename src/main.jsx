import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "@/index.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SupabaseProvider } from "@sbCtx";
import { UserProvider } from "@sbCtx/UserContext";
import { BookmarkProvider } from "@context/BookmarkContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SupabaseProvider>
      <UserProvider>
        <BookmarkProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BookmarkProvider>
      </UserProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
