import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { SupabaseProvider } from "../supabase/index.js";
import { Layout, LoadingSkeleton } from "./components";
import {
  MovieMain,
  LoginPage,
  SignUpPage,
  AuthCallback,
} from "./pages/index.js";

const MovieDetail = lazy(() => import("./pages/MovieDetail.jsx"));

//라우팅 역할을 하는 App
export default function App() {
  return (
    <SupabaseProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<MovieMain />} />
                <Route path="/detail/:movieId" element={<MovieDetail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </SupabaseProvider>
  );
}
