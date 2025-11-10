import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/index.js";
import MovieMain from "./pages/MovieMain.jsx";
import { lazy, Suspense } from "react";
import LoadingSkeleton from "./components/skeleton/LoadingSkeleton.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { SupabaseProvider } from "../supabase/index.js";
import AuthCallback from "./pages/AuthCallback.jsx";
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
