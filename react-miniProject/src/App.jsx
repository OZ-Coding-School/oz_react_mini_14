import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/layout";
import MovieDetail from "./pages/MovieDetail.jsx";
import MovieMain from "./pages/MovieMain.jsx";

//라우팅 역할을 하는 App
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MovieMain />} />
          <Route path="/detail" element={<MovieDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
