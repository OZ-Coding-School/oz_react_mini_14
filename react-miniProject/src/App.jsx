import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/layout";
import MovieMain from "./pages/MovieMain.jsx";
import { lazy, Suspense } from "react";
import LoadingSkeleton from "./Components/skeleton/LoadingSkeleton.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

const MovieDetail = lazy(() => import("./pages/MovieDetail.jsx"));

//라우팅 역할을 하는 App
export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MovieMain />} />
              <Route path="/detail/:movieId" element={<MovieDetail />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}
